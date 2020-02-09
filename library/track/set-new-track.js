import db from '../../config/data.js';

function setNewTrack(direction) {
	let target = db.status.targetBuffer + 1;

	if (direction === 'previous') {
		target = db.status.targetBuffer - 1;
	}

	if (target > 0 && target < db.data.tracks) {
		db.status.targetBuffer = target;
	} else {
		db.status.targetBuffer = 0;
	}
}

export default setNewTrack;