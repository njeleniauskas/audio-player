import db from '../../config/data.js';
import setAndUpdateGain from './set-and-update-gain.js';
import processGainStep from './process-gain-step.js';
import updateGainNodes from './update-gain-nodes.js';
import canProcessAudio from '../utilities/can-process-audio.js';
import setSliderData from '../utilities/set-slider-data.js';

function observeGainSlider(event) {
	let events = [];
	window.getSelection().removeAllRanges();
	setAndUpdateGain(event);

	if (canProcessAudio()) {
		processGainStep();
	}

	db.handler.dragEvent = seekGain.bind(this);
	db.handler.setEvent = commitGain.bind(this);

	if (event.type === 'mousedown') {
		events = ['mousemove', 'mouseup'];
	} else if (event.type === 'touchstart') {
		events = ['touchmove', 'touchend'];
	}

	db.nodes[db.map.fader].addEventListener(events[0], db.handler.dragEvent);
	window.addEventListener(events[1], db.handler.setEvent);
}

function seekGain(event) {
	setAndUpdateGain(event);

	if (canProcessAudio()) {
		processGainStep();
	}
}

function commitGain(event) {
	let events = [];
	setAndUpdateGain(event);

	if (canProcessAudio()) {
		processGainStep();
	}

	if (event.type === 'mouseup') {
		events = ['mousemove', 'mouseup'];
	} else if (event.type === 'touchend') {
		events = ['touchmove', 'touchend'];
	}

	db.nodes[db.map.fader].removeEventListener(events[0], db.handler.dragEvent);
	window.removeEventListener(events[1], db.handler.setEvent);
	db.status.isTouchEvent = false;
}


function nudgeGain(event) {
	let step = 0.05;
	let value;

	if (event.key === 'ArrowRight' || event.key === 'ArrowUp') {
		value = db.data.gain.current + step;
	} else if (event.key === 'ArrowLeft' || event.key === 'ArrowDown') {
		value = db.data.gain.current - step;
	}

	if (value >= 1) {
		value = 1;
	} else if (value <= 0) {
		value  = 0;
	}

	setSliderData('fader', value);
	updateGainNodes();

	if (canProcessAudio()) {
		processGainStep();
	}
}

export {
	observeGainSlider,
	nudgeGain,
};