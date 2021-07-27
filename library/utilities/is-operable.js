import db from '../../config/data.js';
import isValidControl from './is-valid-control.js';
import isValidKey from './is-valid-key.js';

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
				event.key === 'MediaPlayPause' && isValidControl()) {
				return true;
			}

			return false;
		}

		case 'step': {
			if (db.dsp.context === undefined ||
				db.dsp.context !== undefined && db.dsp.source !== null) {
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

		case 'progress-touch': {
			if (event.target.closest('.slider--progress')) {
				return true;
			}

			return false;
		}

		case 'progress-mouse': {
			if (db.dsp.buffers[db.status.targetBuffer] !== undefined &&
				!db.status.isTouchEvent) {
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

		case 'gain-touch': {
			if (event.target.closest('.slider--gain')) {
				return true;
			}

			return false;
		}

		case 'gain-mouse': {
			if (!db.status.isTouchEvent) {
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