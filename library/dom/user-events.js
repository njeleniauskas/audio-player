import db from '../../config/data.js';
import isOperable from '../utilities/is-operable.js';
import isConfigured from '../utilities/is-configured.js';
import changePlayState from '../playstate/events.js';
import changeTrack from '../track/events.js';
import {observeTimeSlider, commitTime, nudgeTime} from '../progress/events-slider-progress.js';
import toggleGain from '../gain/events-toggle-gain.js';
import {observeGainSlider, commitGain, nudgeGain} from '../gain/events-slider-gain.js';

function assignEventListeners() {
	addPlayStateEvents();

	if (isConfigured('stepControls', db.props.stepControls)) {
		addStepControlEvents();
	}

	if (isConfigured('progressSlider', db.props.progressOptions) || 
		isConfigured('gainSlider', db.props.gainOptions)) {
		addGlobalPointerEvents();
	}

	if (isConfigured('progressSlider', db.props.progressOptions)) {
		addProgressEvents();
	}

	if (isConfigured('gainSlider', db.props.gainOptions)) {
		addGainEvents('slider');
	}

	if (isConfigured('gainControl', db.props.gainOptions)) {
		addGainEvents('control');
	}
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

function addGainEvents(context) {
	const gain = db.nodes[db.map.gain];
	const fader = db.nodes[db.map.fader];
	
	if (context === 'slider') {
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

	if (context === 'control') {
		gain.addEventListener('click', () => {
			toggleGain();
		});

		window.addEventListener('keyup', (event) => {
			if (isOperable('gain-key', event)) {
				toggleGain();
			}
		});
	}
}

export default assignEventListeners;