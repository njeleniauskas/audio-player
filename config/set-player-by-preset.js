import db from './data.js';

function setPlayerByPreset(preset) {
	switch (preset) {
		case 'full': {
			db.props.showMetadata = true;
			db.props.progressOptions = 'both';
			db.props.gainOptions = 'both';

			if (db.data.tracks > 1) {
				db.props.stepControls = true;
			}
			break;
		}
		case 'basic': {
			db.props.showMetadata = false;
			db.props.stepControls = true;
			db.props.progressOptions = 'slider';
			db.props.gainOptions = 'button';
			break;
		}
		case 'minimal': {
			db.props.showMetadata = false;
			db.props.stepControls = false;
			db.props.progressOptions = 'none';
			db.props.gainOptions = 'none';
			break;
		}
	}
}

export default setPlayerByPreset;