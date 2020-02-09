import db from '../../config/data.js';
import scaleGainValue from '../gain/scale-gain-value.js';

function setupGain() {
	let gain = scaleGainValue(db.data.gain.current);

	db.dsp.gain = db.dsp.context.createGain();
	db.dsp.source.connect(db.dsp.gain);
	db.dsp.gain.connect(db.dsp.context.destination);
	db.dsp.gain.gain.setValueAtTime(gain, db.dsp.context.currentTime);
}

export default setupGain;