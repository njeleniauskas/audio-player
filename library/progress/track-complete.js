import db from '../../config/data.js';
import changeTrack from '../track/events.js';
import resetPlayer from '../dsp/reset-player.js';

function trackComplete() {
	if (db.status.targetBuffer === db.data.tracks - 1) {
		if (db.props.loop) {
			changeTrack('next');
		} else {
			resetPlayer();
		}
	} else {
		changeTrack('next');
	}

	clearInterval(db.monitor.time);
}

export default trackComplete;