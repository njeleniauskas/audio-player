import db from '../../config/data.js';

function updateStepControls() {
	let target = db.status.targetBuffer;
	let prevStatus = db.nodes[db.map.previous].getAttribute('aria-disabled');
	let nextStatus = db.nodes[db.map.next].getAttribute('aria-disabled');

	if (target === 0) {
		if (prevStatus === 'false') {
			db.nodes[db.map.previous].setAttribute('aria-disabled', 'true');
		}

		if (nextStatus === 'true') {
			db.nodes[db.map.next].setAttribute('aria-disabled', 'false');
		}
	} else if (target > 0 && target < db.data.tracks - 1) {
		if (prevStatus === 'true') {
			db.nodes[db.map.previous].setAttribute('aria-disabled', 'false');
		}

		if (nextStatus === 'true') {
			db.nodes[db.map.next].setAttribute('aria-disabled', 'false');
		}
	} else {
		if (nextStatus === 'false') {
			db.nodes[db.map.next].setAttribute('aria-disabled', 'true');
		}

		if (prevStatus === 'true') {
			db.nodes[db.map.previous].setAttribute('aria-disabled', 'false');
		}
	}
}

export default updateStepControls;