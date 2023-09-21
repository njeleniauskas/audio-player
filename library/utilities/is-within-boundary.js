import sortNumberArray from "./sort-number-array.js";

function isWithinBoundary(range, value) {
	let result = false;
	let boundaries = sortNumberArray('ascending', range);

	if (isNaN(value)) {
		return result;
	}

	if (value >= boundaries[0] && value <= boundaries[1]) {
		result = true;
	}

	return result;
}

export default isWithinBoundary;