import db from '../config/data.js';

async function fetchAudioData() {
	let playlist = db.playlist;
	let tracks = db.data.tracks;

	createDataEntries(db.files);
	db.files[0].array = await getFile(playlist[0].src, db.files, 0);

	if (tracks > 1) {
		for (let i = 1; i < tracks; i += 1) {
			db.files[i].array = getFile(playlist[i].src, db.files, i);
		}
	}
}

function createDataEntries(data) {
	for (let i = 0, len = db.data.tracks; i < len; i ++) {
		data[i] = {};
		data[i].array = undefined;
		data[i].status = '';
	}
}

function getFile(src, data, index) {
	return new Promise((resolve) => {
		data[index].status = 'fetching';

		fetch(src)
			.then((response) => {
				if (response.ok) {
					return response.arrayBuffer();
				} else {
					throw new Error(response.status);
				}
			})
			.then((array) => {
				data[index].status = 'complete';
				resolve(data[index].array = array);
			})
			.catch((error) => {
				console.error('Retrieving the file cause an error:', error);
			});
	});
}

export default fetchAudioData;