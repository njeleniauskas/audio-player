import updateGainNodes from './update-gain-nodes.js';
import getSliderValue from '../utilities/get-slider-value.js';
import setSliderData from '../utilities/set-slider-data.js';

function setAndUpdateGain(clientX) {
	let rawValue = getSliderValue(clientX);

	setSliderData('fader', rawValue);
	updateGainNodes();
}

export default setAndUpdateGain;