function sortNumberArray(array) {
	let result = [];

	array.forEach((number) => {
		result.push(Number(number));
	});

	result.sort((a, b) => {
		return a - b;
	});

	return result;
}

export default sortNumberArray;