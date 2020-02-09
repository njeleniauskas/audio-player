import db from '../../config/data.js';
import scaleGainValue from './scale-gain-value.js';

/* setValueAtTime is required to prevent zipper noise/audio pops.
 * Additionally, the current gain value may return NaN if it is low enough, so
 * a normalization needs to capture this instance.
 */
function processGainStep() {
	let fromValue = scaleGainValue(db.dsp.gain.gain.value);
	let toValue = scaleGainValue(db.data.gain.current);

	if (db.data.gain.current === 0) {
		toValue = 0.00000001;
	}

	if (isNaN(fromValue)) {
		fromValue = 0;
	}

	db.dsp.gain.gain.setValueAtTime(fromValue, db.dsp.context.currentTime);
	db.dsp.gain.gain.exponentialRampToValueAtTime(
		toValue, db.dsp.context.currentTime + db.props.offset);

	if (db.data.gain.current === 0) {
		db.dsp.gain.gain.setValueAtTime(0, db.dsp.context.currentTime);
	}
}

export default processGainStep;