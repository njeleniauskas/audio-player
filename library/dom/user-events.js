import db from '../../config/data.js';
import isOperable from '../utilities/is-operable.js';
import changePlayState from '../playstate/events.js';
import changeTrack from '../track/events.js';
import {observeTimeSlider, nudgeTime} from '../progress/events-slider.js';
import toggleGain from '../gain/events-toggle.js';
import {observeGainSlider, nudgeGain} from '../gain/events-slider.js';

function assignEventListeners() {
	addPlayStateEvents();
	addStepControlEvents();
	addProgressEvents();
	addGainEvents();
}

function addPlayStateEvents() {
	db.nodes[db.map.main].addEventListener('click', () => {
		if (isOperable('playstate')) {
			changePlayState();
		}
	});

	window.addEventListener('keyup', (event) => {
		if (isOperable('playkey', event)) {
			changePlayState();
		}
	});
}

function addStepControlEvents() {
	if (db.props.stepControls) {
		db.nodes[db.map.previous].addEventListener('click', () => {
			if (isOperable('step')) {
				changeTrack('previous');
			}
		});

		db.nodes[db.map.next].addEventListener('click', () => {
			if (isOperable('step')) {
				changeTrack('next');
			}
		});

		window.addEventListener('keyup', (event) => {
			if (isOperable('media-track-next', event)) {
				changeTrack('next');
			} else if (isOperable('media-track-previous', event)) {
				changeTrack('previous');
			}
		});
	}
}

function addProgressEvents() {
	if (db.props.progressOptions === 'slider') {
		db.nodes[db.map.progress].addEventListener('touchstart', (event) => {
			db.status.isTouchEvent = true;
			if (isOperable('progress-touch', event)) {
				db.status.targetSlider = db.nodes[db.map.progress];
				observeTimeSlider(event);
			}
		}, {passive: true});

		db.nodes[db.map.progress].addEventListener('mousedown', (event) => {
			if (isOperable('progress-mouse')) {
				db.status.targetSlider = db.nodes[db.map.progress];
				observeTimeSlider(event);
			}
		});


		db.nodes[db.map.progress].addEventListener('keydown', (event) => {
			if (isOperable('progress-nudge', event)) {
				nudgeTime(event);
			}
		});
	}
}

function addGainEvents() {
	if (db.props.gainOptions !== 'none') {
		db.nodes[db.map.gain].addEventListener('click', () => {
			toggleGain();
		});

		window.addEventListener('keyup', (event) => {
			if (isOperable('gain-key', event)) {
				toggleGain();
			}
		});

		if (db.props.gainOptions === 'slider') {
			db.nodes[db.map.fader].addEventListener('touchstart', (event) => {
				db.status.isTouchEvent = true;
				if (isOperable('gain-touch', event)) {
					db.status.targetSlider = db.nodes[db.map.fader];
					observeGainSlider(event);
				}
			}, {passive: true});

			db.nodes[db.map.fader].addEventListener('mousedown', (event) => {
				if (isOperable('gain-mouse')) {
					db.status.targetSlider = db.nodes[db.map.fader];
					observeGainSlider(event);
				}
			});

			db.nodes[db.map.fader].addEventListener('keydown', (event) => {
				if (isOperable('gain-nudge', event)) {
					nudgeGain(event);
				}
			});
		}
	}
}

export default assignEventListeners;