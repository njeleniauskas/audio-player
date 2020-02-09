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
	function unlock() {
		db.dsp.context.resume().then(clean);
	}

	function clean() {
		db.dsp.context.suspend()
			.then(() => {
				events.forEach((event) => {
					DOM.removeEventListener(event, unlock);
				});
			});
	}

	//2020.02.04: invoking a context at the class invokation ignores the autoplay policy. uknown as to why. an immediate suspension is needed.
	const AudioContext = window.AudioContext || window.webkitAudioContext;
	db.dsp.context = new AudioContext();
	db.dsp.context.suspend();

	if (db.dsp.context.state !== 'suspended')  {
		return;
	}

	const DOM = document.body;
	const events = ['touchstart','touchend', 'mousedown','keydown'];

	events.forEach((event) => {
		DOM.addEventListener(event, unlock, false);
	});
}

export default unlockWebkitAudioContext;