import db from "../../config/data.js";

import formatTime from "./format-time.js";
import formatVolume from "./format-volume.js";

function updateSliderNodeValues(format) {
	let target;
	let currentValue;
	let maxValue;
	let currentTextValue;
	let totalTimeValue;
	let textString;

	if (format === 'gain') {
		target = db.map.gainSlider;
		currentValue = db.data.gain.current.toFixed(2);
		maxValue = 1;
		textString = formatVolume(db.data.gain.current);
	} else {
		target = db.map.progress;
		currentValue = Math.floor(db.data.buffer.elapsedTime).toFixed(0);
		maxValue = Math.floor(db.data.buffer.length);
		currentTextValue = formatTime(db.data.buffer.elapsedTime, 'long')
		totalTimeValue = formatTime(db.data.buffer.length, 'long');
		textString = `${currentTextValue} out of ${totalTimeValue}`;
	}

	db.nodes.control[target].setAttribute('aria-valuemax', maxValue);
	db.nodes.control[target].setAttribute('aria-valuenow', currentValue);
	db.nodes.control[target].setAttribute('aria-valuetext', textString);
}

export default updateSliderNodeValues;