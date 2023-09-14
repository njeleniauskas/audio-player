import db from '../../config/data.js';

import updateSliderNode from '../utilities/update-slider-node.js';
import updateSliderNodeValues from '../utilities/update-slider-node-values.js';
import isConfigured from '../utilities/is-configured.js';

import updateTimeNode from './update-time-node.js';

function updateProgressNodes(unscaledValue) {
	if (isConfigured('progressText', db.config.options.progressOptions)) {
		updateTimeNode('elapsed');
	}

	if (isConfigured('progressSlider', db.config.options.progressOptions)) {
		updateSliderNode('progress', unscaledValue);
		updateSliderNodeValues('time');
	}
}

export default updateProgressNodes;