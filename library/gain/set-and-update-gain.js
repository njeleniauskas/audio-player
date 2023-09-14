import getSliderValue from '../utilities/get-slider-value.js';
import setSliderData from '../utilities/set-slider-data.js';

import updateGainNodes from './update-gain-nodes.js';

function setAndUpdateGain(clientX) {
	let rawValue = getSliderValue(clientX);

	setSliderData('gain', rawValue);
	updateGainNodes();
}

export default setAndUpdateGain;