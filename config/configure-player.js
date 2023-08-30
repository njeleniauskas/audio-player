import db from './data.js';
import getPlayerTemplateArgs from './get-player-template-args.js';
import setPlayerByPreset from './set-player-by-preset.js';
import valueInArray from '../library/utilities/value-in-array.js';

function configurePlayer(params) {
	const className = '.'.concat(params.container);
	let args = {};

	db.nodes.container = 
		document.querySelector(className) !== undefined ? document.querySelector(className) : null;
	db.nodes.container.setAttribute('data-status', 'pending');
	db.playlist = params.playlist !== undefined ? params.playlist : null;
	db.data.tracks = params.playlist.length;
	db.config.template = null;
	db.config.options.loop = params.loop !== undefined ? params.loop : false;


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


	if (params.configuration !== undefined) {
		let isString = (typeof params.configuration === 'string');
		let isObject = (typeof params.configuration === 'object');
		let isValidString = valueInArray(['minimal', 'basic', 'full'], params.configuration);

		if (isString && isValidString) {
			setPlayerByPreset(params.configuration);
		}

		if (isObject) {
			let options = db.config.options;
			let config = params.configuration;

			options.showMetadata = 
				config.showMetadata !== undefined ? config.showMetadata : options.showMetadata;
			options.stepControls = 
				config.stepControls !== undefined ? config.stepControls : options.stepControls;
			options.progressOptions = 
				config.progressOptions !== undefined ? config.progressOptions : options.progressOptions;
			options.gainOptions = 
				config.gainOptions !== undefined ? config.gainOptions : options.gainOptions;
		}
	} else {
		setPlayerByPreset('full');
	}
}

export default configurePlayer;