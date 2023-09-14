import db from '../../config/data.js';

import isOperable from '../utilities/is-operable.js';
import isConfigured from '../utilities/is-configured.js';
import debounce from '../utilities/debounce.js';
import isSliderFocused from '../utilities/is-slider-focused.js';

import getTargetPlayerConfiguration from './get-target-player-configuration.js';
import updatePlayerLayout from './update-player-layout.js';
import {observeGainSlider, commitGain, nudgeGain} from '../gain/events-slider-gain.js';
import toggleGain from '../gain/events-toggle-gain.js';
import changePlayState from '../playstate/events.js';
import {observeTimeSlider, commitTime, nudgeTime} from '../progress/events-slider-progress.js';
import changeTrack from '../track/events.js';

function assignEventListeners() {
	addPlayStateEvents();

	//single-use checker
	if (Object.keys(db.config.breakpoints).length > 1) {
		addPlayerReflowEvents();
	}

	if (isConfigured('stepControls', db.config.options.stepControls)) {
		addStepControlEvents();
	}

	if (isConfigured('progressSlider', db.config.options.progressOptions) || 
		isConfigured('gainSlider', db.config.options.gainOptions)) {
		addGlobalPointerEvents();
		addSliderSrollEvent();
	}

	if (isConfigured('progressSlider', db.config.options.progressOptions)) {
		addProgressEvents();
	}

	if (isConfigured('gainSlider', db.config.options.gainOptions)) {
		addGainEvents('slider');
	}

	if (isConfigured('gainControl', db.config.options.gainOptions)) {
		addGainEvents('control');
	}

	if (isConfigured('gainKey', db.config.options.gainOptions)) {
		addGainEvents('key');
	}
}

function addPlayerReflowEvents() {
	window.addEventListener('resize', debounce(() => {
		let isActiveControl = document.activeElement.hasAttribute(db.props.strings.control);
		let startingConfig;
		let endingConfig;

		db.status.viewportWidth = window.innerWidth;

		if (isActiveControl) {
			db.status.activeControlAttribute = document.activeElement.getAttribute(db.props.strings.control);
		}

		startingConfig = db.status.playerConfig;
		endingConfig = getTargetPlayerConfiguration(db.status.viewportWidth);
		
		if (startingConfig !== endingConfig) {
			updatePlayerLayout(endingConfig)
			.then(() => {
				if (isActiveControl) {
					db.nodes.control[db.status.activeControlAttribute].focus();
				}
				
				db.status.playerConfig = endingConfig;
				db.status.activeControlAttribute = null;
				});
		}
	}, 200));
}


function addPlayStateEvents() {
	db.nodes.control[db.map.main].addEventListener('click', () => {
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
	db.nodes.control[db.map.previous].addEventListener('click', (event) => {
		if (isOperable('step', event)) {
			changeTrack('previous');
		}
	});

	db.nodes.control[db.map.next].addEventListener('click', (event) => {
		if (isOperable('step', event)) {
			changeTrack('next');
		}
	});

	window.addEventListener('keyup', (event) => {
		//future behavior: if track is X seconds played, stop and restart (do not change)
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
		let isValidNode = (event.target.nodeType === 1);
		let targetAttribute;
		let node = db.nodes.control[db.map.progress];

		if (isValidNode) {
			targetAttribute = event.target.getAttribute('data-ap-control');
		}
		
		if (isValidNode && targetAttribute === 'gain') {
			node = db.nodes.control[db.map.gainSlider];
		}
		
		node.releasePointerCapture(id);

		if (isValidNode && targetAttribute === 'progress') {
			commitTime(db.data.pointer.lastX);
		} else if (isValidNode && targetAttribute === 'gain') {
			commitGain(db.data.pointer.lastX);
		}
	});
}

function addSliderSrollEvent() {
	window.addEventListener('keydown', (event) => {
		if (isSliderFocused(document.activeElement, db.props.strings.control) &&
			event.key === ' ') {
			event.preventDefault();
		}
	});
}

function addProgressEvents() {
	const node = db.nodes.control[db.map.progress];
	
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
	const gain = db.nodes.control[db.map.gain];
	const gainSlider = db.nodes.control[db.map.gainSlider];
	
	if (context === 'slider') {
		gainSlider.addEventListener('pointerdown', (event) => {
			//force pointer capture to capture the slider element
			gainSlider.setPointerCapture(event.pointerId);
			
			if (isOperable('gain-slider', event)) {
				db.status.targetSlider = gainSlider;
				observeGainSlider(event);
			}
		});

		gainSlider.addEventListener('keydown', (event) => {
			if (isOperable('gain-nudge', event)) {
				nudgeGain(event);
			}
		});
	}

	if (context === 'control') {
		gain.addEventListener('click', () => {
			toggleGain();
		});
	}

	if (context === 'key') {
		window.addEventListener('keyup', (event) => {
			if (isOperable('gain-key', event)) {
				toggleGain();
			}
		});
	}
}

export default assignEventListeners;