import db from '../../config/data.js';
import updateSlider from '../utilities/update-slider.js';
import updateTime from '../progress/update-time.js';

function updateProgress() {
	if (db.status.buffer === 'pending') {
		db.nodes[db.map.timeCurrent].textContent = '0:00';
		db.nodes[db.map.timeTotal].textContent = '0:00';
	} else {
		updateTime('elapsed');
		updateTime('duration');
	}

	if (db.props.progressOptions === 'slider') {
		updateSlider('progress', 0);
	}
}

export default updateProgress;