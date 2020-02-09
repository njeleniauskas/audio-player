import db from '../../config/data.js';

function setDSPState() {
	if (db.status.dsp === 'idle') {
		db.status.dsp = 'running';
	} else {
		db.status.dsp = 'idle';
	}
}

export default setDSPState;