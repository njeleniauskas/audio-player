function isValidKey(scope, key) {
	const timeKeys = ['ArrowRight', 'ArrowLeft', 'Home', 'End'];
	const gainKeys = ['ArrowRight', 'ArrowLeft', 'ArrowUp', 'ArrowDown', 'Home', 'End'];
	let keys = timeKeys;

	if (scope === 'gain') {
		keys = gainKeys;
	}

	if (keys.some(index => index === key)) {
		return true;
	} else {
		return false;
	}
}

export default isValidKey;