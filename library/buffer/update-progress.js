import db from '../../config/data.js';
import updateSliderNode from '../utilities/update-slider-node.js';
import updateTimeNode from '../progress/update-time-node.js';

function updateProgress(context) {
	if (context === 'text') {
		if (db.status.buffer === 'pending') {
			db.nodes[db.map.timeCurrent].textContent = '0:00';
			db.nodes[db.map.timeTotal].textContent = '0:00';
		} else {
			updateTimeNode('elapsed');
			updateTimeNode('duration');
		}
	}

	if (context === 'slider') {
		updateSliderNode('progress', 0);
	}
}

export default updateProgress;