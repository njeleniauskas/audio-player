function formatTime(time, format) {
	let seconds;
	let minutes;
	let hours;
	let ss;
	let mm;
	let hh;
	let ssText;
	let mmText;
	let hhText;
	let concat = ' and ';
	let result;

	hours = Math.floor(time / 3600);
	minutes = Math.floor((time % 3600) / 60);
	seconds = Math.floor(time % 60);

	//short time format
	if (format === undefined || format === 'short') {
		hh = hours;
		mm = minutes;
		ss = seconds < 10 ? `0${seconds}` : seconds;
		
		result = `${mm}:${ss}`;
		
		if (hours > 0) {
			minutes < 10 ? `0${minutes}` : minutes;
			result = `${hh}:${mm}:${ss}`;
		}
	}

	//human-readable time format
	if (format === 'long') {
		hhText = hours === 1 ? 'Hour' : 'Hours';
		mmText = minutes === 1 ? 'Minute' : 'Minutes';
		ssText = seconds === 1 ? 'Second' : 'Seconds';

		if (minutes === 0 || seconds === 0) {
			concat = ' ';
		}

		hh = hours > 0 ? `${hours} ${hhText} ` : ``; 
		mm = minutes > 0 ? `${minutes} ${mmText}` : ``; 
		ss = seconds > 0 ? `${seconds} ${ssText}` : ``; 

		result = `${hh}${mm}${concat}${ss}`;
	}
	
	return result;
}

export default formatTime;