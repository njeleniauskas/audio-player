/**
 * Test whether an item exists within an array (exact match).
 * @param {array} array - The array to check.
 * @param {*} itemChecked - The item being checked (boolean, string, number, etc).
 * @returns {boolean}
 */

function itemInArray(array, itemChecked) {
	return array.some((item) => itemChecked === item);
}

export default itemInArray;