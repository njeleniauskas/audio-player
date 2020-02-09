import db from '../../config/data.js';

function updateSlider(scope, unscaledValue) {
	let progress = db.nodes[db.map.progressCurrent];
	let handle = db.nodes[db.map.progressHandle];
	let anchor;

	if (scope === 'fader') {
		progress = db.nodes[db.map.faderCurrent];
		handle = db.nodes[db.map.faderHandle];
	}

	progress.style = `transform: scaleX(${(unscaledValue)})`;

	anchor = progress.getBoundingClientRect().width;
	handle.style = `transform: translateX(${(anchor)}px)`;
}

export default updateSlider;