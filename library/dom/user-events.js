import db from '../../config/data.js';
import isOperable from '../utilities/is-operable.js';
import changePlayState from '../playstate/events.js';
import changeTrack from '../track/events.js';
import {observeTimeSlider, commitTime, nudgeTime} from '../progress/events-slider-progress.js';
import toggleGain from '../gain/events-toggle.js';
import {observeGainSlider, commitGain, nudgeGain} from '../gain/events-slider-gain.js';

function assignEventListeners() {
	addPlayStateEvents();
	addStepControlEvents();
	addGlobalPointerEvents();
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

function addGlobalPointerEvents() {
	//capture pointer sequence interruptions
	window.addEventListener('pointercancel', (event) => {
		const id = event.pointerId;
		let node = db.nodes[db.map.progress];

		if (event.target.getAttribute('data-ap-control') === 'fader') {
			node = db.nodes[db.map.fader];
		}
		
		node.releasePointerCapture(id);

		if (event.target.getAttribute('data-ap-control') === 'progress') {
			commitTime(db.data.pointer.lastX);
		} else if (event.target.getAttribute('data-ap-control') === 'fader') {
			commitGain(db.data.pointer.lastX);
		}
	});
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