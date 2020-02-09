import db from '../../config/data.js';
import setGain from './set-gain.js';
import updateGainNodes from './update-gain-nodes.js';
import processGainToggle from './process-gain-toggle.js';
import canProcessAudio from '../utilities/can-process-audio.js';

function toggleGain() {
	let direction = 'mute';

	if (db.data.gain.current === 0) {
		direction = 'unmute';
	}

	setGain(direction);
	updateGainNodes();

	if (canProcessAudio()) {
		processGainToggle(direction);
	}
}

export default toggleGain;