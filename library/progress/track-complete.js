import db from '../../config/data.js';

import resetPlayer from '../dsp/reset-player.js';
import changeTrack from '../track/events.js';

function trackComplete() {
	if (db.status.targetBuffer === db.data.tracks - 1) {
		if (db.config.options.loop) {
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