import db from '../../config/data.js';

function updateSliderNode(scope, unscaledValue) {
	let bar = db.nodes[db.map.progressCurrent];
	let handle = db.nodes[db.map.progressHandle];
	let anchor;

	if (scope === 'fader') {
		bar = db.nodes[db.map.faderCurrent];
		handle = db.nodes[db.map.faderHandle];
	}

	bar.style = `transform: scaleX(${(unscaledValue)})`;

	anchor = bar.getBoundingClientRect().width;
	handle.style = `transform: translateX(${(anchor)}px)`;
}

export default updateSliderNode;