/**
 * Delay running a function based on a given period of time.
 * @param {function} callback - The function to delay.
 * @param {number} delay - The delay window.
 */

function debounce(callback, delay) {
	let timer;

	return function(...args) {
		clearTimeout(timer);

		timer = setTimeout(() => {
			callback.apply(this, args);
		}, delay);
	}
}

export default debounce;