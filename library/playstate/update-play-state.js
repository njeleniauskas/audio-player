import db from '../../config/data.js';

function updatePlayState() {
	if (db.status.dsp === 'running') {
		updateToPause();
	} else if (db.status.dsp === 'idle') {
		updateToPlay();
	}
}

function updateToPause() {
	let hidden = db.props.strings.hidden;

	db.nodes[db.map.play].setAttribute(hidden, true);
	db.nodes[db.map.main].setAttribute('aria-label', 'pause');

	if (db.nodes[db.map.pause].getAttribute(hidden) === 'true') {
		db.nodes[db.map.pause].setAttribute(hidden, false);
	}
}

function updateToPlay() {
	let hidden = db.props.strings.hidden;

	db.nodes[db.map.pause].setAttribute(hidden, true);
	db.nodes[db.map.main].setAttribute('aria-label', 'play');

	if (db.nodes[db.map.play].getAttribute(hidden) === 'true') {
		db.nodes[db.map.play].setAttribute(hidden, false);
	}
}

export default updatePlayState;