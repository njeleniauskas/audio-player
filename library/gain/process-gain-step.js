import db from '../../config/data.js';

import isWithinBoundary from '../utilities/is-within-boundary.js';
import clampToNearestBoundary from '../utilities/clamp-to-nearest-boundary.js';

import scaleGainValue from './scale-gain-value.js';

/* Notes: setValueAtTime is required to prevent zipper noise/audio pops. The lower bound cannot 
 * be 0, as exponentialRamptoValueAtTime considers 0 to be a negative number. dsp.gain may be 
 * NaN, so a gate is needed to only apply changes 
 * sanitize the value.
 */
function processGainStep() {
	const bounds = [0.00000001, 1];
	let fromValue;
	let toValue;

	if (db.dsp.gain !== undefined) {
		fromValue = scaleGainValue(db.dsp.gain.gain.value);
		toValue = db.data.gain.current;

		if (!isWithinBoundary(bounds, toValue)) {
			toValue = clampToNearestBoundary(bounds, toValue)
		}
		
		if (!isWithinBoundary(bounds, fromValue)) {
			fromValue = clampToNearestBoundary(bounds, fromValue)
		}
	
		db.dsp.gain.gain.setValueAtTime(fromValue, db.dsp.context.currentTime);
		db.dsp.gain.gain.exponentialRampToValueAtTime(toValue, db.dsp.context.currentTime + db.props.offset);
	}
}

export default processGainStep;