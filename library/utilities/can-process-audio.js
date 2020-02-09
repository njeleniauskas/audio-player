import db from '../../config/data.js';

function canProcessAudio() {
	if (db.dsp.context !== undefined) {
		if (db.dsp.context.state !== 'closed') {
			return true;
		}
	}

	return false;
}

export default canProcessAudio;