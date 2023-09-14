import db from '../../config/data.js';

import canProcessAudio from '../utilities/can-process-audio.js';

import setAudioData from './set-audio-data.js';
import updateInterface from './update-interface.js';
import assessBufferStatus from './assess-buffer-status.js';
import setupAudioBuffer from '../dsp/setup-audio-buffer.js';
import setupGain from '../dsp/setup-gain.js';

/* The processTargetBuffer function is the central function that assesses the
 * status of a buffer, and if it matches the correct tartet, sets up that
 * buffer to be processed. It is triggered on any change in track/buffer,
 * which includes the initialization of the player.
 */
async function processTargetBuffer() {
	try {
		const thisBuffer = db.status.targetBuffer;
		let index = db.status.targetBuffer;

		await assessBufferStatus(thisBuffer);

		if (db.dsp.buffers[index] !== undefined 
			&& thisBuffer === db.status.targetBuffer) {
			db.status.buffer = 'ready';
			setAudioData();
			updateInterface();

			if (canProcessAudio()) {
				setupAudioBuffer(index);
				setupGain();
			}
		}

		if (db.status.initial) {
			db.status.initial = false;
		}

		//pass the buffer index for external checks
		return new Promise((resolve) => {
			resolve(thisBuffer);
		});
	} catch (error) {
		console.error('Buffer Process: ', error);
	}
}

export default processTargetBuffer;