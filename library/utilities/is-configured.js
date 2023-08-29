import valueInArray from "./value-in-array.js";

//is the application function configured
function isConfigured(incomingKey, incomingValue) {
	try {
		let key = incomingKey;
		let value = incomingValue;

		if (typeof value !== 'boolean') {
			value = value.toString();
		}

		if (typeof key !== 'string') {
			key = key.toString();
		}

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
	} catch (error) {
		console.error('Only strings or booleans can be passed to this function.');
	}
}

export default isConfigured;