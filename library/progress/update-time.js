import db from '../../config/data.js';
import formatTime from '../utilities/format-time.js';

//default output is elapsed time
function updateTime(type) {
	let key = db.map.timeCurrent;
	let dataEndpoint = db.data.buffer.elapsedTime;

	if (type === 'duration') {
		key = db.map.timeTotal;
		dataEndpoint = db.data.buffer.length;
	}

	db.nodes[key].textContent = formatTime(dataEndpoint);
}

export default updateTime;