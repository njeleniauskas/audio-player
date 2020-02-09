import db from '../../config/data.js';
import updateProgressNodes from './update-progress-nodes.js';
import processTimeChange from './process-time-change.js';
import getSliderValue from '../utilities/get-slider-value.js';
import setSliderData from '../utilities/set-slider-data.js';
import canProcessAudio from '../utilities/can-process-audio.js';

/* because of the nature of progress changes, this function ensures that any
 * document selection is cleared before a progress change occurs. This
 * prevents the weird bug where a mouseup event will not fire, while the
 * selection is in the 'drag' state.
 */
function observeTimeSlider(event) {
	let events = [];
	window.getSelection().removeAllRanges();

	if (!db.status.observing) {
		db.status.observing = true;
		clearInterval(db.monitor.time);

		let rawValue = getSliderValue(event);

		setSliderData('progress', rawValue);
		updateProgressNodes(rawValue);

		db.handler.dragEvent = seekTime.bind(this);
		db.handler.setEvent = commitTime.bind(this);

		if (event.type === 'mousedown') {
			events = ['mousemove', 'mouseup'];
		} else if (event.type === 'touchstart') {
			events = ['touchmove', 'touchend'];
		}

		db.nodes[db.map.progress].addEventListener(events[0], db.handler.dragEvent);
		window.addEventListener(events[1], db.handler.setEvent);
	}
}

function seekTime(event) {
	let rawValue = getSliderValue(event);

	setSliderData('progress', rawValue);
	updateProgressNodes(rawValue);
}

function commitTime(event) {
	let events = [];
	let rawValue = getSliderValue(event);
	setSliderData('progress', rawValue);
	updateProgressNodes(rawValue);

	if (canProcessAudio() && db.dsp.context.state === 'running') {
		processTimeChange(rawValue);
	}

	if (event.type === 'mouseup') {
		events = ['mousemove', 'mouseup'];
	} else if (event.type === 'touchend') {
		events = ['touchmove', 'touchend'];
	}

	db.nodes[db.map.progress].removeEventListener(events[0], db.handler.dragEvent);
	window.removeEventListener(events[1], db.handler.setEvent);

	db.status.observing = false;
}

function nudgeTime(event) {
	let step = 5;
	let elapsed = db.data.buffer.elapsedTime;
	let length = db.data.buffer.length;
	let rawValue;
	let state = db.dsp.context.state;

	if (event.key === 'ArrowRight') {
		rawValue = (elapsed + step) / length;

		if (rawValue >= 1) {
			rawValue = 1;
		}
	} else if (event.key === 'ArrowLeft') {
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
	nudgeTime,
};