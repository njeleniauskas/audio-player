import db from '../../config/data.js';
import updateTimeNode from './update-time-node.js';
import updateSliderNode from '../utilities/update-slider-node.js';
import updateSliderNodeValues from '../utilities/update-slider-node-values.js';
import isConfigured from '../utilities/is-configured.js';

function updateProgressNodes(unscaledValue) {
	if (isConfigured('progressText', db.props.progressOptions)) {
		updateTimeNode('elapsed');
	}

	if (isConfigured('progressSlider', db.props.progressOptions)) {
		updateSliderNode('progress', unscaledValue);
		updateSliderNodeValues('time');
	}
}

export default updateProgressNodes;