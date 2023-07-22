import db from '../../config/data.js';

function updateMetadata() {
	let title = db.map.title;
	let artist = db.map.artist;

	//do I need to add a SUBTITLE node for movement-related stuff?
	//do I need to configure metadata type? like, title/artist, piece/mvt/composer/artist?
	db.nodes[title].textContent = db.data.metadata.title;
	db.nodes[artist].textContent = db.data.metadata.artist;
}

export default updateMetadata;