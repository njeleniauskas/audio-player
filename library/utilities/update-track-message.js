import db from '../../config/data.js';

function updateTrackMessage() {
	const node = db.nodes.status[db.map.message];
	let messagePrefix = 'Playing ';
	let messageSuffix = '';

	if (db.status.dsp !== 'running') {
		messagePrefix = '';
		messageSuffix = ' Ready';
	}

	node.textContent = `${messagePrefix}${db.data.metadata.title}${messageSuffix}`;
}

export default updateTrackMessage;