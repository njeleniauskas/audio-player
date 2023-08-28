import db from '../../config/data.js';

//function designed to max-width setup; closest larger breakpoint wins
function getTargetPlayerConfiguration(viewportWidth) {
	const keys = Object.keys(db.props.template.breakpoints);
	let breakpoints = [];
	let configuration;
	
	keys.forEach((key) => {
		const breakpoint = parseInt(key);

		if (!isNaN(breakpoint)) {
			if (viewportWidth < breakpoint) {
				breakpoints.push(breakpoint);
			}
		}
	});


	if (breakpoints.length !== 0) {
		configuration = breakpoints[0].toString();
	} else {
		configuration = 'default';
	}

	return configuration;
}

export default getTargetPlayerConfiguration;