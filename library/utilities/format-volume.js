function formatVolume(rawVolume) {
	let result;
	let volumePercent = (100 * rawVolume).toFixed(0);

	result = `Volume ${volumePercent}%`;

	return result;
}

export default formatVolume;