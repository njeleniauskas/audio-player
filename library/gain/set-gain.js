import db from '../../config/data.js';

function setGain(direction) {
	let toValue = 0;
	let fromValue = db.data.gain.current;

	if (direction === 'unmute') {
		toValue = db.data.gain.last;
		fromValue = 0;
	}

	db.data.gain.current = toValue;
	db.data.gain.last = fromValue;
}

export default setGain;