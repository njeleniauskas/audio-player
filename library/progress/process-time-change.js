import db from '../../config/data.js';

import trackComplete from './track-complete.js';
import setupAudioBuffer from '../dsp/setup-audio-buffer.js';
import setupGain from '../dsp/setup-gain.js';
import processGainToggle from '../gain/process-gain-toggle.js';
import playBuffer from '../playstate/play-buffer.js';

async function processTimeChange(value) {
	let target = db.status.targetBuffer;

	if (value >= 0 && value < 1) {
		await processGainToggle('mute', 'system');

		db.dsp.source.stop(db.dsp.context.currentTime);
		setupAudioBuffer(target);
		setupGain();
		playBuffer();

		processGainToggle('unmute', 'system');
	} else {
		trackComplete();
	}

	db.status.stepping = false;
}

export default processTimeChange;