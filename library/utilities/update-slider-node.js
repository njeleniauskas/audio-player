import db from '../../config/data.js';

function updateSliderNode(scope, unscaledValue) {
	let bar = db.nodes.status[db.map.progressCurrent];
	let handle = db.nodes.status[db.map.progressHandle];
	let anchor;

	if (scope === 'gain') {
		bar = db.nodes.status[db.map.gainCurrent];
		handle = db.nodes.status[db.map.gainHandle];
	}

	bar.style = `transform: scaleX(${(unscaledValue)})`;

	anchor = bar.getBoundingClientRect().width;
	handle.style = `transform: translateX(${(anchor)}px)`;
}

export default updateSliderNode;