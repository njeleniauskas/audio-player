import db from '../../config/data.js';

function setupAudioBuffer(index) {
	db.dsp.source = db.dsp.context.createBufferSource();
	db.dsp.source.buffer = db.dsp.buffers[index];
}

export default setupAudioBuffer;