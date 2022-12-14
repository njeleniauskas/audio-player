import db from '../../config/data.js';
import setNewTrack from './set-new-track.js';
import processTargetBuffer from '../buffer/process-target-buffer.js';
import canProcessAudio from '../utilities/can-process-audio.js';
import playBuffer from '../playstate/play-buffer.js';
import updateTrackMessage from '../utilities/update-track-message.js';

/* When changing tracks, a few things must occur. First, correctly processing
 * and gating the target buffer before audio operation is necessary. Second,
 * When a track is suspended but playing, that source must be closed so that
 * multiple sounds do not occur.
 */
async function changeTrack(direction) {
	db.status.changingTrack = true;
	clearInterval(db.monitor.time);

	setNewTrack(direction);

	if (db.dsp.context !== undefined) {
		if (db.dsp.context.state === 'running') {
			db.dsp.source.stop(db.dsp.context.currentTime);
		}
	}

	await processTargetBuffer()
		.then((bufferIndex) => {
			updateTrackMessage();

			if (canProcessAudio()) {
				let buffer = db.dsp.buffers[db.status.targetBuffer];
				let target = db.status.targetBuffer;
				let context = db.dsp.context.state;

				if (buffer !== undefined &&
					bufferIndex === target &&
					context !== 'suspended') {
					playBuffer();
				}
			}
		});

	db.status.changingTrack = false;
}

export default changeTrack;