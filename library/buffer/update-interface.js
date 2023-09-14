import db from '../../config/data.js';

import updateSliderNode from '../utilities/update-slider-node.js';
import isConfigured from '../utilities/is-configured.js';

import updateMetadata from './update-metadata.js';
import updateProgress from './update-progress.js';
import updateStepControls from '../track/update-step-controls.js';

function updateInterface() {
	if (isConfigured('showMetadata', db.config.options.showMetadata)) {
		updateMetadata();
	}

	if (isConfigured('progressText', db.config.options.progressOptions)) {
		updateProgress('text');
	}
	
	if (isConfigured('progressSlider', db.config.options.progressOptions)) {
		updateProgress('slider');
	}

	if (isConfigured('stepControls', db.config.options.stepControls)) {
		updateStepControls();
	}

	if (isConfigured('gainSlider', db.config.options.gainOptions)) {
		updateSliderNode('gain', db.data.gain.current);
	}
}

export default updateInterface;