function formatTime(time) {
	let result;
	let seconds;
	let ss;
	let mm;

	seconds = Math.floor(time % 60);
	ss = seconds < 10 ? `0${seconds}` : seconds;
	mm = Math.floor(time / 60);

	result = `${mm}:${ss}`;

	return result;
}

export default formatTime;