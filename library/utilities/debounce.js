/*
	Debounce, v1.0
	========================================
	A function that when wrapped around another function will gate the response of that function based on a delay time.
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