import db from '../../config/data.js';

function getSliderValue(clientX) {
	let coordinate = 0;
	let currentValue;
	let sliderRect = db.status.targetSlider.getBoundingClientRect();
	let minBoundary = Math.floor(sliderRect.left);
	let maxBoundary = Math.floor(sliderRect.right);
	let minValue = 0;
	let maxValue = maxBoundary - minBoundary;
	let value;

	//the new change to event tracking
	coordinate = clientX;
	currentValue = coordinate - minBoundary;

	if (currentValue <= minValue) {
		value = 0;
	} else if (currentValue > maxValue) {
		value = 1;
	} else {
		value = (currentValue / maxValue).toFixed(6);
	}

	return parseFloat(value);
}

export default getSliderValue;