import db from '../../config/data.js';
import canProcessAudio from '../utilities/can-process-audio.js';
import setSliderData from '../utilities/set-slider-data.js';
import valueInArray from '../utilities/value-in-array.js';
import getSliderValue from '../utilities/get-slider-value.js';
import setAndUpdateGain from './set-and-update-gain.js';
import processGainStep from './process-gain-step.js';
import updateGainNodes from './update-gain-nodes.js';
import scaleGainValue from './scale-gain-value.js';

function observeGainSlider(event) {	
	let events =  ['pointermove', 'pointerup'];
	let startValue;

	window.getSelection().removeAllRanges();
	db.data.pointer.lastX = event.clientX;
	startValue = getSliderValue(db.data.pointer.lastX);

	
	setAndUpdateGain(db.data.pointer.lastX);
	
	if (startValue !== 0) {
		db.data.gain.start = startValue;
	}

	if (canProcessAudio()) {
		processGainStep();
	}

	db.handler.dragEvent = seekGain.bind(this);
	db.handler.setEvent = commitGain;

	db.nodes.control[db.map.gainSlider].addEventListener(events[0], db.handler.dragEvent);
	window.addEventListener(events[1], db.handler.setEvent);
}

function seekGain(event) {
	db.data.pointer.lastX = event.clientX;
	setAndUpdateGain(db.data.pointer.lastX);

	if (canProcessAudio()) {
		processGainStep();
	}
}

function commitGain() {
	let events = ['pointermove', 'pointerup'];
	setAndUpdateGain(db.data.pointer.lastX);

	if (canProcessAudio()) {
		processGainStep();
	}

	db.nodes.control[db.map.gainSlider].removeEventListener(events[0], db.handler.dragEvent);
	window.removeEventListener(events[1], db.handler.setEvent);
}

//nudge function should do this
function nudgeGain(event) {
	let step = 0.05;
	let direction = 'forward';
	let value;
	let startValue = Number(db.nodes.control[db.map.gainSlider].getAttribute('aria-valuenow'));

	if (valueInArray(['ArrowLeft', 'ArrowDown', 'Home'], event.key)) {
		direction = 'back';
	}

	if (event.key === 'Home' || event.key === 'End') {
		step = 1;
	}

	if (direction === 'forward') {
		value = db.data.gain.current + step;
	} else if (direction === 'back') {
		value = db.data.gain.current - step;
	}

	if (value >= 1) {
		value = 1;
	} else if (value <= 0) {
		value  = 0;
	}

	if (startValue !== 0) {
		db.data.gain.start = startValue;
	}

	setSliderData('gain', value);
	updateGainNodes();

	if (canProcessAudio()) {
		processGainStep();
	}
}

export {
	observeGainSlider,
	commitGain,
	nudgeGain,
};