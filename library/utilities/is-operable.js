import db from '../../config/data.js';
import isValidControl from './is-valid-control.js';
import isValidKey from './is-valid-key.js';

//is the targeted functionality available to control
function isOperable(scope, event) {
	switch (scope) {
		case 'playstate': {
			if (!db.status.changingTrack &&
				!db.status.decoding) {
				return true;
			}

			return false;
		}

		case 'playkey': {
			if (event.key === ' ' && isValidControl() ||
				event.key === 'MediaPlayPause' && db.status.unlocked === true) {
				return true;
			}

			return false;
		}

		case 'step': {
			let disabled = event.target.closest('[data-ap-control]').getAttribute('aria-disabled');

			if (disabled === 'false' && db.dsp.context === undefined ||
				disabled === 'false' && db.dsp.context !== undefined && db.dsp.source !== null) {
				return true;
			}

			return false;
		}

		case 'media-track-previous': {
			if (event.key === 'MediaTrackPrevious') {
				return true;
			}

			return false;
		}

		case 'media-track-next': {
			if (event.key === 'MediaTrackNext') {
				return true;
			}

			return false;
		}

		case 'progress-slider': {
			if (event.target.closest('.slider--progress')) {
				return true;
			}

			return false;
		}

		case 'progress-nudge': {
			if (isValidKey('time', event.key) &&
				db.dsp.buffers[db.status.targetBuffer] !== undefined) {
				return true;
			}

			return false;
		}

		case 'gain-key': {
			if (event.key === 'm') {
				return true;
			}

			return false;
		}

		case 'gain-slider': {
			if (event.target.closest('.slider--gain')) {
				return true;
			}

			return false;
		}

		case 'gain-nudge': {
			if (isValidKey('gain', event.key)) {
				return true;
			}
		}
	}
}

export default isOperable;