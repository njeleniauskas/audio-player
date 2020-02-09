import db from '../../config/data.js';
import updateTime from './update-time.js';
import updateSlider from '../utilities/update-slider.js';

function updateProgressNodes(unscaledValue) {
	if (db.props.progressOptions !== 'none') {
		if (db.props.progressOptions === 'slider') {
			updateSlider('progress', unscaledValue);
		}

		updateTime('elapsed');
	}
}

export default updateProgressNodes;