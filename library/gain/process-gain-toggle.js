import db from '../../config/data.js';
import scaleGainValue from './scale-gain-value.js';

/* This function serves two purposes. It both processes user-generated gain
 * changes, as well as changes from the play state. When the scope is the
 * latter, the setting of gain values is ignored in favor of a simple to-from
 * ramp. Additionally, in the 'mute' direction, a promise is also deployed to
 * ensure gain is at 0 before the context is suspended.
 */
function processGainToggle(direction, scope) {
	const interval = 10;
	const min = 0.00000001;
	let valueStart = db.data.gain.last;
	let valueEnd = min;

	if (direction === 'unmute') {
		valueStart = min;
		valueEnd = db.data.gain.current;
	}
	
	if (direction === 'mute' && scope === 'system') {
		valueStart = db.data.gain.current;
	}
	
	processGainChange(valueStart, valueEnd, min);

	if (direction === 'mute' && scope === 'system') {
		return new Promise((resolve) => {
			db.monitor.gain = setInterval(() => {
				if (db.dsp.gain.gain.value <= valueEnd + 0.000001) {
					db.dsp.gain.gain.value = 0;
					resolve('Gain value reached.');
				}
			}, interval);
		})
			.then(() => {
				clearInterval(db.monitor.gain);
			});
	}
}

//if start and end are the same (and 0) → use starting gain as the snap-back instead
//log changes to make sure this is the case
function processGainChange(start, end, min) {
	if (start === 0) {
		start = min;
	}

	if (end === 0) {
		end = min;
	}

	db.dsp.gain.gain.setValueAtTime(
		start, db.dsp.context.currentTime);
	db.dsp.gain.gain.exponentialRampToValueAtTime(
		end, db.dsp.context.currentTime + db.props.offset);
}

export default processGainToggle;