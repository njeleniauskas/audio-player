import db from '../../config/data.js';
import updateMetadata from './update-metadata.js';
import updateProgress from './update-progress.js';
import updateSlider from '../utilities/update-slider.js';
import updateStepControls from '../track/update-step-controls.js';

function updateInterface() {
	if (db.props.showMetadata) {
		updateMetadata();
	}

	if (db.props.progressOptions !== 'none') {
		updateProgress();
	}

	if (db.props.stepControls) {
		updateStepControls();
	}

	if (db.props.gainOptions === 'slider') {
		updateSlider('fader', db.data.gain.current);
	}
}

export default updateInterface;