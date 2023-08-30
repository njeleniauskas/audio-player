import db from './data.js';

function setPlayerByPreset(preset) {
	const options = db.config.options;
	
	switch (preset) {
		case 'full': {
			options.showMetadata = true;
			options.progressOptions = 'both';
			options.gainOptions = 'both';

			if (db.data.tracks > 1) {
				options.stepControls = true;
			}
			break;
		}
		case 'basic': {
			options.showMetadata = false;
			options.progressOptions = 'slider';
			options.gainOptions = 'button';

			if (db.data.tracks > 1) {
				options.stepControls = true;
			}
			break;
		}
		case 'minimal': {
			options.showMetadata = false;
			options.stepControls = false;
			options.progressOptions = 'none';
			options.gainOptions = 'none';
			break;
		}
	}
}

export default setPlayerByPreset;