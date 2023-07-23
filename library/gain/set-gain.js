import db from '../../config/data.js';

function setGain(direction) {
	const min = 0;
	let toValue = min;
	let fromValue = db.data.gain.current;

	if (direction === 'unmute') {
		toValue = db.data.gain.last;
		fromValue = min;

		if (fromValue === toValue) {
			toValue = db.data.gain.start;
		}
	}

	db.data.gain.current = toValue;
	db.data.gain.last = fromValue;
}

export default setGain;