import db from '../../config/data.js';
import updateMetadata from './update-metadata.js';
import updateProgress from './update-progress.js';
import updateSliderNode from '../utilities/update-slider-node.js';
import isConfigured from '../utilities/is-configured.js';
import updateStepControls from '../track/update-step-controls.js';

function updateInterface() {
	if (isConfigured('showMetadata', db.props.showMetadata)) {
		updateMetadata();
	}

	if (isConfigured('progressText', db.props.progressOptions)) {
		updateProgress('text');
	}
	
	if (isConfigured('progressSlider', db.props.progressOptions)) {
		updateProgress('slider');
	}

	if (isConfigured('stepControls', db.props.stepControls)) {
		updateStepControls();
	}

	if (isConfigured('gainSlider', db.props.gainOptions)) {
		updateSliderNode('fader', db.data.gain.current);
	}
}

export default updateInterface;