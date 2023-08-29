import db from './data.js';
import getPlayerTemplateArgs from './get-player-template-args.js';
import setPlayerByPreset from './set-player-by-preset.js';

function configurePlayer(params) {
	const className = '.'.concat(params.container);
	let args = {};

	db.nodes.container = document.querySelector(className) || null;
	db.nodes.container.setAttribute('data-status', 'pending');
	db.playlist = params.playlist || null;
	db.data.tracks = params.playlist.length;
	db.config.template = null;
	db.config.options.loop = params.loop || false;


	if (params.template !== undefined) {
		args = getPlayerTemplateArgs();

		db.config.template = params.template.bind(this, args);
	}


	if (params.breakpoints !== undefined) {
		let keys = Object.keys(params.breakpoints);

		keys.forEach((key) => {
			db.config.breakpoints[key] = params.breakpoints[key];
		});
	}


	if (params.config === undefined) {
		db.config.setup = 'full';
	}


	if (typeof params.configuration === 'string' && params.configuration !== null) {
		setPlayerByPreset(params.configuration);
	} else {
		const options = db.config.options;
		const config = params.configuration;

		options.showMetadata = config.showMetadata || options.showMetadata;
		options.stepControls = config.stepControls || options.stepControls;
		options.progressOptions = config.progressOptions || options.progressOptions;
		options.gainOptions = config.gainOptions || options.gainOptions;
	}
}

export default configurePlayer;