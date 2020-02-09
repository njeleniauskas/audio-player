import db from '../../config/data.js';

function updateStepControls() {
	let target = db.status.targetBuffer;

	if (target === 0) {
		if (!db.nodes[db.map.previous].disabled) {
			db.nodes[db.map.previous].disabled = true;
		}

		if (db.nodes[db.map.next].disabled) {
			db.nodes[db.map.next].disabled = false;
		}
	} else if (target > 0 && target < db.data.tracks - 1) {
		if (db.nodes[db.map.previous].disabled) {
			db.nodes[db.map.previous].disabled = false;
		}

		if (db.nodes[db.map.next].disabled) {
			db.nodes[db.map.next].disabled = false;
		}
	} else {
		if (!db.nodes[db.map.next].disabled) {
			db.nodes[db.map.next].disabled = true;
		}

		if (db.nodes[db.map.previous].disabled) {
			db.nodes[db.map.previous].disabled = false;
		}
	}
}

export default updateStepControls;