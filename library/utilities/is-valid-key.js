function isValidKey(scope, key) {
	const timeKeys = ['ArrowRight', 'ArrowLeft'];
	const gainKeys = ['ArrowRight', 'ArrowLeft', 'ArrowUp', 'ArrowDown'];
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