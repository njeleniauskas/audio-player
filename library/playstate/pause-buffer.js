import db from '../../config/data.js';

function pauseBuffer() {
	clearInterval(db.monitor.time);
	db.dsp.source.stop(db.dsp.context.currentTime);
	db.dsp.context.suspend();
}

export default pauseBuffer;