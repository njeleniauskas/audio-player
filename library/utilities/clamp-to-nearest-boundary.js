import sortNumberArray from "./sort-number-array.js";

function clampToNearestBoundary(range, value) {
	let result = Number;
	let boundaries = sortNumberArray(range);

	if (value < boundaries[0]) {
		result = boundaries[0];
	}

	if (value > boundaries[1]) {
		result = boundaries[1];	
	}

	return result;
}

export default clampToNearestBoundary;