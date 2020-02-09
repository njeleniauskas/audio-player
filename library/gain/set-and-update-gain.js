import updateGainNodes from './update-gain-nodes.js';
import getSliderValue from '../utilities/get-slider-value.js';
import setSliderData from '../utilities/set-slider-data.js';

function setAndUpdateGain(event) {
	let rawValue = getSliderValue(event);

	setSliderData('fader', rawValue);
	updateGainNodes();
}

export default setAndUpdateGain;