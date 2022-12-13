import db from '../../config/data.js';
import updateSlider from '../utilities/update-slider.js';
import updateSliderValues from '../utilities/update-slider-values.js';

function updateGainNodes() {
	if (db.props.gainOptions !== 'null') {
		if (db.props.gainOptions === 'slider') {
			updateSlider('fader', db.data.gain.current);
		}

		updateGainStatus();
		updateSliderValues('gain');
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