import db from '../../config/data.js';
import updateTime from './update-time.js';
import updateSlider from '../utilities/update-slider.js';
import updateSliderValues from '../utilities/update-slider-values.js';
import formatTime from '../utilities/format-time.js';

function updateProgressNodes(unscaledValue) {
	const values = {
		'current': Math.floor(db.data.buffer.elapsedTime),
		'total': Math.floor(db.data.buffer.length)
	}

	if (db.props.progressOptions !== 'none') {
		if (db.props.progressOptions === 'slider') {
			updateSlider('progress', unscaledValue);
		}

		updateSliderValues('time');
		updateTime('elapsed');
	}
}

export default updateProgressNodes;