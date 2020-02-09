import db from '../../config/data.js';

function awaitWebkitUnlock() {
	return new Promise((resolve) => {
		const monitor = setInterval(() => {
			if (db.dsp.context !== undefined && db.dsp.context.state === 'suspended') {
				db.status.unlocked = true;
				resolve(monitor);
			}
		}, 100);
	})
		.then((monitor) => {
			clearInterval(monitor);
		});
}

export default awaitWebkitUnlock;