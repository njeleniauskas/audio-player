import db from './data.js';

function configurePlayer(args) {
	db.container = document.querySelector(args.container) || null;
	db.playlist = args.playlist || null;
	db.data.tracks = args.playlist.length;
	db.props.configuration = args.configuration || 'full';
	db.props.template = args.template || 'one';
	db.props.loop = args.loop || false;
	db.container.setAttribute('data-status', 'pending');

	switch (db.props.configuration) {
		case 'minimal': {
			db.props.showMetadata = false;
			db.props.stepControls = false;
			db.props.progressOptions = 'none';
			db.props.gainOptions = 'none';
			break;
		}

		case 'basic': {
			db.props.showMetadata = false;
			db.props.stepControls = false;
			db.props.progressOptions = 'basic';
			db.props.gainOptions = 'basic';
			break;
		}

		case 'full':
		default: {
			if (db.data.tracks > 1) {
				db.props.stepControls = true;
			}
			break;
		}
	}
}

export default configurePlayer;