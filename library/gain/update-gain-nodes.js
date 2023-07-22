import db from '../../config/data.js';
import updateSliderNode from '../utilities/update-slider-node.js';
import updateSliderNodeValues from '../utilities/update-slider-node-values.js';
import isConfigured from '../utilities/is-configured.js';

function updateGainNodes() {
	if (isConfigured('gainSlider', db.props.gainOptions)) {
		updateSliderNode('fader', db.data.gain.current);
		updateSliderNodeValues('gain');
	}

	if (isConfigured('gainControl', db.props.gainOptions)) {
		updateGainStatus();
		updateGainSymbol();
	}
}

function updateGainStatus() {
	let string = 'Unmute';

	if (db.data.gain.current > 0) {
		string = 'Mute';
	}
	
	db.nodes[db.map.gainLabel].textContent = string;
}

function updateGainSymbol() {
	const threshold = 0.6;
	let gain = db.data.gain.current;
	let hidden = 'data-hidden';

	if (gain > 0) {
		if (db.nodes[db.map.gainZero].getAttribute(hidden) === 'false') {
			db.nodes[db.map.gainZero].setAttribute(hidden, true);
		}

		if (db.nodes[db.map.gainOne].getAttribute(hidden) === 'true') {
			db.nodes[db.map.gainOne].setAttribute(hidden, false);
		}
	} else {
		db.nodes[db.map.gainZero].setAttribute(hidden, false);
		db.nodes[db.map.gainOne].setAttribute(hidden, true);
	}

	if (gain > threshold) {
		if (db.nodes[db.map.gainTwo].getAttribute(hidden) === 'true') {
			db.nodes[db.map.gainTwo].setAttribute(hidden, false);
		}
	} else {
		db.nodes[db.map.gainTwo].setAttribute(hidden, true);
	}
}

export default updateGainNodes;