import db from '../../config/data.js';

function getSliderValue(event) {
	const mouseEvents = ['mousedown', 'mousemove', 'mouseup'];
	const touchEvents = ['touchstart', 'touchmove', 'touchend'];
	let coordinate;
	let currentValue;
	let sliderRect = db.status.targetSlider.getBoundingClientRect();
	let minBoundary = Math.floor(sliderRect.left);
	let maxBoundary = Math.floor(sliderRect.right);
	let minValue = 0;
	let maxValue = maxBoundary - minBoundary;
	let value;

	if (mouseEvents.some(item => item === event.type)) {
		coordinate = event.clientX;
	} else if (touchEvents.some(item => item === event.type)) {
		coordinate = event.pageX;
	}

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