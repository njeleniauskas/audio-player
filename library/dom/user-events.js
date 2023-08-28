import db from '../../config/data.js';
import changePlayState from '../playstate/events.js';
import getTargetPlayerConfiguration from './get-target-player-configuration.js';
import updatePlayerLayout from './update-player-layout.js';
import changeTrack from '../track/events.js';
import {observeTimeSlider, commitTime, nudgeTime} from '../progress/events-slider-progress.js';
import {observeGainSlider, commitGain, nudgeGain} from '../gain/events-slider-gain.js';
import toggleGain from '../gain/events-toggle-gain.js';
import isOperable from '../utilities/is-operable.js';
import isConfigured from '../utilities/is-configured.js';
import debounce from '../utilities/debounce.js';

function assignEventListeners() {
	addPlayStateEvents();

	if (db.props.template.totalBreakpoints > 1) {
		addPlayerReflowEvents();
	}

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

	if (isConfigured('gainKey', db.props.gainOptions)) {
		addGainEvents('key');
	}
}


function addPlayerReflowEvents() {
	window.addEventListener('resize', debounce(() => {
		db.status.viewportWidth = window.innerWidth;

		let startingConfig = db.status.playerConfig;
		let endingConfig = getTargetPlayerConfiguration(db.status.viewportWidth);

		if (startingConfig !== endingConfig) {
			updatePlayerLayout(endingConfig)
				.then(() => {
					db.status.playerConfig = endingConfig;
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
		
		if (isValidNode && targetAttribute === 'fader') {
			node = db.nodes.control[db.map.fader];
		}
		
		node.releasePointerCapture(id);

		if (isValidNode && targetAttribute === 'progress') {
			commitTime(db.data.pointer.lastX);
		} else if (isValidNode && targetAttribute === 'fader') {
			commitGain(db.data.pointer.lastX);
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
	const fader = db.nodes.control[db.map.fader];
	
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