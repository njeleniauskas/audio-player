import db from '../../config/data.js';
import canProcessAudio from '../utilities/can-process-audio.js';
import awaitFileStatus from '../utilities/await-file-status.js';
import decodeAudioSource from '../dsp/decode-audio-source.js';

/* It is possible to decode an audio file, and trigger another decode before
 * that process has finished (via promise). As such, the original arrayBuffer
 * status needs to be checked before allowing decoding.
 */
async function assessBufferStatus(thisBuffer) {
	const message = db.nodes.status[db.map.message];
	let index = db.status.targetBuffer;
	let fileStatus = db.files[index].status;
	let bufferStatus = db.dsp.buffers[index];
	let target;

	if (bufferStatus === undefined) {
		message.textContent = 'Track pending.';

		if (fileStatus === 'fetching') {
			await awaitFileStatus();
		}

		target = db.status.targetBuffer;
		
		if (canProcessAudio() 
		&& target === thisBuffer
		&& db.files[thisBuffer].array.byteLength !== 0) {
			await decodeAudioSource(index);

			return `${db.playlist[thisBuffer].title} Ready`;
		}

		return 'Track needs to be decoded.';
	}
}

export default assessBufferStatus;