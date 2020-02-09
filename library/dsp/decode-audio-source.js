import db from '../../config/data.js';

/* context.decodeAudioData is a destructive function. Once it has run on an
 * arrayBuffer file, that arrayBuffer is wiped.
 *
 * 2020.02.02 promise-based decode does not work in all variations of webkit.
 * As such, a callback method must be used instead.
 */
function decodeAudioSource(index) {
	return new Promise((resolve) => {
		const arrayBuffer = db.files[index].array;

		/* ios solution */
		db.dsp.context.decodeAudioData(arrayBuffer, (decodedBuffer) => {
			db.dsp.buffers[index] = decodedBuffer;
			resolve('buffer decoded');
		}, (error) => {
			console.error('There was a problem decoding the buffer:', error );
		});

		/*db.dsp.context.decodeAudioData(arrayBuffer)
			.then((decodedBuffer) => {
				db.dsp.buffers[index] = decodedBuffer;
				resolve('buffer decoded');
			})
			.catch((error) => {
				console.error('There was a problem decoding the buffer:', error );
			});*/
	});
}

export default decodeAudioSource;