import db from '../../config/data.js';
import scaleGainValue from './scale-gain-value.js';
import isWithinBoundary from '../utilities/is-within-boundary.js';
import clampToNearestBoundary from '../utilities/clamp-to-nearest-boundary.js';

/* setValueAtTime is required to prevent zipper noise/audio pops.
 * Additionally, the lower bound cannot be 0, as exponentialRamptoValueAtTime considers 0 to be a 
 * negative number. Finally, dsp.gain may be NaN, so a function is needed to sanitize the value.
 */
function processGainStep() {
	let fromValue = scaleGainValue(db.dsp.gain.gain.value);
	let toValue = scaleGainValue(db.data.gain.current);
	let bounds = [0.00000001, 1];

	if (!isWithinBoundary(bounds, toValue)) {
		toValue = clampToNearestBoundary(bounds, toValue)
	}
	
	if (!isWithinBoundary(bounds, fromValue)) {
		fromValue = clampToNearestBoundary(bounds, fromValue)
	}
	
	db.dsp.gain.gain.setValueAtTime(fromValue, db.dsp.context.currentTime);
	db.dsp.gain.gain.exponentialRampToValueAtTime(toValue, db.dsp.context.currentTime + db.props.offset);
}

export default processGainStep;