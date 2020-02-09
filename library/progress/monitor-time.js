import db from '../../config/data.js';
import updateProgressNodes from './update-progress-nodes.js';
import trackComplete from './track-complete.js';
import getElapsedTime from '../utilities/get-elapsed-time.js';

function monitorTime() {
	const interval = 100;
	let buffer = db.data.buffer;
	let baseElapsedTime = db.data.buffer.elapsedTime;
	let rawValue;

	db.monitor.time = setInterval(() => {
		if (buffer.elapsedTime < buffer.length) {
			buffer.elapsedTime = getElapsedTime(baseElapsedTime);
			rawValue = buffer.elapsedTime / buffer.length;
			updateProgressNodes(rawValue);
		} else {
			trackComplete();
		}
	}, interval);
}

export default monitorTime;