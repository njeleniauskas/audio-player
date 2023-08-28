import db from '../../config/data.js';
import updateProgressNodes from './update-progress-nodes.js';
import processTimeChange from './process-time-change.js';
import getSliderValue from '../utilities/get-slider-value.js';
import setSliderData from '../utilities/set-slider-data.js';
import canProcessAudio from '../utilities/can-process-audio.js';
import valueInArray from '../utilities/value-in-array.js';

/* because of the nature of progress changes, this function ensures that any
 * document selection is cleared before a progress change occurs. This
 * prevents the weird bug where a mouseup event will not fire, while the
 * selection is in the 'drag' state.
 */
function observeTimeSlider(event) {
	let events = ['pointermove', 'pointerup'];
	let rawValue;
	window.getSelection().removeAllRanges();

	if (!db.status.observing) {
		db.status.observing = true;
		clearInterval(db.monitor.time);

		db.data.pointer.lastX = event.clientX;
		rawValue = getSliderValue(db.data.pointer.lastX);

		setSliderData('progress', rawValue);
		updateProgressNodes(rawValue);

		db.handler.dragEvent = seekTime.bind(this);
		db.handler.setEvent = commitTime;

		//not needed as they are implicitly handled
		db.nodes.control[db.map.progress].addEventListener(events[0], db.handler.dragEvent);
		window.addEventListener(events[1], db.handler.setEvent);
	}
}

function seekTime(event) {
	let rawValue;
	
	db.data.pointer.lastX = event.clientX;
	rawValue = getSliderValue(db.data.pointer.lastX);
	setSliderData('progress', rawValue);
	updateProgressNodes(rawValue);
}

function commitTime() {
	let rawValue = getSliderValue(db.data.pointer.lastX);
	let events = ['pointermove', 'pointerup'];

	setSliderData('progress', rawValue);
	updateProgressNodes(rawValue);

	if (canProcessAudio() && db.dsp.context.state === 'running') {
		processTimeChange(rawValue);
	}

	db.nodes.control[db.map.progress].removeEventListener(events[0], db.handler.dragEvent);
	window.removeEventListener(events[1], db.handler.setEvent);

	db.status.observing = false;
}

function nudgeTime(event) {
	let step = 5;
	let direction = 'forward';
	let elapsed = db.data.buffer.elapsedTime;
	let length = db.data.buffer.length;
	let rawValue;
	let state = db.dsp.context.state;
	
	if (valueInArray(['ArrowLeft', 'Home'], event.key)) {
		direction = 'back';
	}

	if (event.key === 'Home' || event.key === 'End') {
		step = db.data.buffer.length;
	}

	if (direction === 'forward') {
		rawValue = (elapsed + step) / length;

		if (rawValue >= 1) {
			rawValue = 1;
		}
	} else if (direction === 'back') {
		rawValue = (elapsed - step) / length;

		if (rawValue <= 0) {
			rawValue = 0;
		}
	}

	clearInterval(db.monitor.time);
	setSliderData('progress', rawValue);
	updateProgressNodes(rawValue);

	if (canProcessAudio() && state === 'running' && !db.status.stepping) {
		db.status.stepping = true;
		processTimeChange(rawValue);
	}
}

export {
	observeTimeSlider,
	commitTime,
	nudgeTime,
};