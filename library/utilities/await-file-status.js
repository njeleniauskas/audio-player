import db from '../../config/data.js';

function awaitFileStatus() {
	return new Promise((resolve) => {
		const interval = 100;
		const index = db.status.targetBuffer;

		db.monitor.fetch = setInterval(() => {
			if (db.files[index].status !== 'fetching') {
				resolve('Target file is now available to decode.');
			}
		}, interval);
	})
		.then(() => {
			clearInterval(db.monitor.fetch);
		});
}

export default awaitFileStatus;