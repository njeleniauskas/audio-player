import db from '../../config/data.js';
import isOperable from '../utilities/is-operable.js';
import changePlayState from '../playstate/events.js';
import changeTrack from '../track/events.js';
import {observeTimeSlider, nudgeTime} from '../progress/events-slider-progress.js';
import toggleGain from '../gain/events-toggle.js';
import {observeGainSlider, nudgeGain} from '../gain/events-slider-gain.js';

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
		db.nodes[db.map.previous].addEventListener('click', (event) => {
			if (isOperable('step', event)) {
				changeTrack('previous');
			}
		});

		db.nodes[db.map.next].addEventListener('click', (event) => {
			if (isOperable('step', event)) {
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
	const node = db.nodes[db.map.progress];
	
	if (db.props.progressOptions === 'slider') {
		node.addEventListener('pointerdown', (event) => {
			//force pointer capture to capture the slider element
			node.setPointerCapture(event.pointerId);
			
			if (isOperable('progress-slider', event)) {
				db.status.targetSlider = node;
				observeTimeSlider(event);
			}
		});

		node.addEventListener('keydown', (event) => {
			if (isOperable('progress-nudge', event)) {
				nudgeTime(event);
			}
		});
	}
}

function addGainEvents() {
	const gain = db.nodes[db.map.gain];
	const fader = db.nodes[db.map.fader];
	
	if (db.props.gainOptions !== 'none') {
		gain.addEventListener('click', () => {
			toggleGain();
		});

		window.addEventListener('keyup', (event) => {
			if (isOperable('gain-key', event)) {
				toggleGain();
			}
		});

		if (db.props.gainOptions === 'slider') {
			fader.addEventListener('pointerdown', (event) => {
				//force pointer capture to capture the slider element
				fader.setPointerCapture(event.pointerId);
				
				if (isOperable('gain-slider', event)) {
					db.status.targetSlider = fader;
					observeGainSlider(event);
				}
			});

			fader.addEventListener('keydown', (event) => {
				if (isOperable('gain-nudge', event)) {
					nudgeGain(event);
				}
			});
		}
	}
}

export default assignEventListeners;