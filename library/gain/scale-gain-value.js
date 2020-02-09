/* This function initially takes the gain value passsed [0-1] and converts it to decibels; and then performs a reverse conversion to correctly place the values again between 0 and 1 */
function scaleGainValue(sliderValue) {
	let decibels = Math.log10(sliderValue) * 20;
	let gain = Math.pow(10, decibels / 20);

	return gain;
}

export default scaleGainValue;