import db from '../../config/data.js';

function setAudioData() {
	let title = db.playlist[db.status.targetBuffer].title;
	let artist = db.playlist[db.status.targetBuffer].artist;
	let track = db.status.targetBuffer;
	let length = 0;
	let elapsed = 0;

	if (db.status.buffer === 'ready') {
		length = db.dsp.buffers[db.status.targetBuffer].duration;
		elapsed = 0;
	}

	db.data.metadata = {
		title: title,
		artist: artist,
	};

	db.data.buffer = {
		track: track,
		length: length,
		elapsedTime: elapsed,
	};
}

export default setAudioData;