import db from './data.js';
import setPlayerByPreset from './set-player-by-preset.js';

function configurePlayer(args) {
	const className = '.'.concat(args.container);
	db.container = document.querySelector(className) || null;
	db.playlist = args.playlist || null;
	db.data.tracks = args.playlist.length;
	db.props.template.function = args.template || null;
	db.props.loop = args.loop || false;
	db.container.setAttribute('data-status', 'pending');

	if (args.breakpoints !== undefined) {
		let keys = Object.keys(args.breakpoints);

		keys.forEach((key) => {
			db.props.template.breakpoints[key] = args.breakpoints[key];
		});

		db.props.template.totalBreakpoints = Object.keys(db.props.template.breakpoints).length;
	}

	if (args.configuration === undefined) {
		args.configuration = 'full';
	}

	if (typeof args.configuration === 'string' && args.configuration !== null) {
		setPlayerByPreset(args.configuration);
	} else {
		const config = args.configuration;

		db.props.showMetadata = config.showMetadata || db.props.showMetadata;
		db.props.stepControls = config.stepControls || db.props.stepControls;
		db.props.progressOptions = config.progressOptions || db.props.progressOptions;
		db.props.gainOptions = config.gainOptions || db.props.gainOptions;
	}
}

export default configurePlayer;