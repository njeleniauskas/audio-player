import db from './data.js';
import isConfigured from '../library/utilities/is-configured.js';

//centralizes the args build process
function getPlayerTemplateArgs() {
	const args = {
		'options': db.config.options,
		'breakpoints': db.config.breakpoints,
		'classes': db.props.classes,
		'attributes': db.props.strings,
		'strings': db.map,
		'symbols': db.fragments.symbols,
		'totalTracks': db.data.tracks,
		'targetLayout': db.status.playerConfig,
		'functions': {
			'isConfigured': isConfigured
		}
	};

	return args;
}

export default getPlayerTemplateArgs;