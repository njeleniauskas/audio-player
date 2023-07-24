import db from '../../config/data.js';

function updateMetadata() {
	let title = db.map.title;
	let artist = db.map.artist;

	//explore more expressive text metadata options?
	db.nodes[title].textContent = db.data.metadata.title;
	db.nodes[artist].textContent = db.data.metadata.artist;
}

export default updateMetadata;