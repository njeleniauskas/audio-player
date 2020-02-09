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
	let valueStart = scaleGainValue(db.data.gain.last);
	let valueEnd = 0.000000001;

	if (direction === 'unmute') {
		valueStart = 0.000000001;
		valueEnd = scaleGainValue(db.data.gain.current);
	}

	if (direction === 'mute' && scope === 'system') {
		valueStart = scaleGainValue(db.data.gain.current);
	}

	processGainChange(valueStart, valueEnd);

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

function processGainChange(start, end) {
	if (start === 0) {
		start = 0.000000001;
	}

	if (end === 0) {
		end = 0.000000001;
	}

	db.dsp.gain.gain.setValueAtTime(
		start, db.dsp.context.currentTime);
	db.dsp.gain.gain.exponentialRampToValueAtTime(
		end, db.dsp.context.currentTime + db.props.offset);
}

export default processGainToggle;