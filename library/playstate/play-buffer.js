import db from '../../config/data.js';
import monitorTime from '../progress/monitor-time.js';

function playBuffer() {
	clearInterval(db.monitor.time);
	monitorTime();

	if (db.dsp.context.state === 'suspended') {
		db.dsp.context.resume();
	}

	db.dsp.source.start(db.dsp.context.currentTime, db.data.buffer.elapsedTime + db.props.offset);

	db.data.buffer.startTime = db.dsp.context.currentTime;
}

export default playBuffer;