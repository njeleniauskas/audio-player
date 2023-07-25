import valueInArray from "./value-in-array.js";

//is the application function configured
function isConfigured(key, value) {
	const options = {
		'showMetadata': [true],
		'stepControls': [true],
		'progressText': ['text', 'both'],
		'progressSlider': ['slider', 'both'],
		'gainSlider': ['slider', 'both'],
		'gainControl': ['button', 'both'],
		'gainKey': ['slider', 'button', 'both']
	};
	const array = options[key];
	let result = valueInArray(array, value);

	return result;
}

export default isConfigured;