import db from '../../config/data.js';

/* Until iOS implements the standards-compliant version of the audio api, this
 * unlocking function is necessary; while not extensively tested, it is
 * assumed that by not doing so, when a user clicks to begin audio processing,
 * that more than one context, source, or other audio node may exist, which is
 * why progress, gain, and track functions would not work at all.
 *
 * The context used must be the actual context (db.data.context), otherwise
 * the registration of events is not accepted.
 */
function unlockWebkitAudioContext() {
	function unlock(e) {
		db.dsp.context.resume().then(clean);
	}

	function clean() {
		//2020.02.04: invoking a context at class invokation ignores the autoplay policy. uknown as to why. an immediate suspension is needed.
		db.dsp.context.suspend()
			.then(() => {
				events.forEach((event) => {
					document.body.removeEventListener(event, unlock);
				});
			});

		return new Promise((resolve) => {
			resolve('player unlocked');
		});
	}

	//2023.07.22: MediaPlayPlause key does not constitute a 'user gesture' for browsers
	const events = ['pointerdown', 'touchstart', 'mousedown', 'keydown', 'focus'];

	events.forEach((event) => {
		document.body.addEventListener(event, unlock, false);
	});
}

export default unlockWebkitAudioContext;