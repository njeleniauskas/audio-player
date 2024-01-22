/**
 * Sort an array of numbers in a given direction.
 * @param {array} array - The array to sort.
 * @param {string} direction - The sort direction: ascending, descending.
 * @returns {array}
 */

function sortNumberArray(array, direction) {
	let result = [];

	if (direction !== 'ascending' && direction !== 'descending') {
		throw new Error('Direction must be "ascending" or "descending" to work.')
	}

	array.forEach((number) => {
		result.push(Number(number));
	});

	result.sort((a, b) => {
		if (direction === 'ascending') {
			return a - b;
		} else if (direction === 'descending') {
			return b - a;
		}
	});

	return result;
}

export default sortNumberArray;