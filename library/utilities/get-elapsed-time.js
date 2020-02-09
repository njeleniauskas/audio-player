import db from '../../config/data.js';

function getElapsedTime(baseElapsed) {
	let startTime = db.data.buffer.startTime;
	let currentTime = db.dsp.context.currentTime;
	let result;

	result = baseElapsed + (currentTime - startTime);

	return result;
}

export default getElapsedTime;