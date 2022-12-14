import db from '../../config/data.js';
import setDSPState from './set-dsp-state.js';
import updatePlayState from './update-play-state.js';
import playBuffer from './play-buffer.js';
import pauseBuffer from './pause-buffer.js';
import awaitWebkitUnlock from '../utilities/await-webkit-unlock.js';
import canProcessAudio from '../utilities/can-process-audio.js';
import setupAudioContext from '../dsp/setup-audio-context.js';
import processTargetBuffer from '../buffer/process-target-buffer.js';
import setupAudioBuffer from '../dsp/setup-audio-buffer.js';
import setupGain from '../dsp/setup-gain.js';
import processGainToggle from '../gain/process-gain-toggle.js';
import updateTrackMessage from '../utilities/update-track-message.js';

/* Due to browser autoplay policies, a user must interact with the page before
 * an audio context can be invoked. Therefore, on a first run, this function
 * needs to capture that instantiation.
 */
async function changePlayState() {
	//deployed for webkit unlock needs
	if (!db.status.unlocked) {
		await awaitWebkitUnlock();
	}

	if (!canProcessAudio()) {
		setupAudioContext();
	}

	if (db.dsp.buffers[db.status.targetBuffer] === undefined) {
		await processTargetBuffer();
		updateTrackMessage(); //IDK ABOUT THISONE
	}

	setDSPState();
	updatePlayState();

	if (db.dsp.context.state === 'suspended' || db.dsp.source === null) {
		setupAudioBuffer(db.status.targetBuffer);
		setupGain();
	}

	if (db.status.dsp === 'running') {
		playBuffer();
		processGainToggle('unmute', 'system');
	} else if (db.status.dsp === 'idle') {
		await processGainToggle('mute', 'system');
		pauseBuffer();
	}
}

export default changePlayState;