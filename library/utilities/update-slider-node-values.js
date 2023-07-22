import db from "../../config/data.js";
import formatTime from "./format-time.js";
import formatVolume from "./format-volume.js";

function updateSliderNodeValues(format) {
	let currentValue;
	let totalValue;
	let textString;
	let target = db.map.progress;

	if (format === 'gain') {
		target = db.map.fader;
		textString = formatVolume(db.data.gain.current);
	} else {
		currentValue = formatTime(db.data.buffer.elapsedTime, 'long');
		totalValue = formatTime(db.data.buffer.length, 'long');
		textString = `${currentValue} out of ${totalValue}`;
	}

	db.nodes[target].setAttribute('aria-valuemax', Math.floor(db.data.buffer.length));
	db.nodes[target].setAttribute('aria-valuenow', Math.floor(db.data.buffer.elapsedTime));
	db.nodes[target].setAttribute('aria-valuetext', textString);
}

export default updateSliderNodeValues;