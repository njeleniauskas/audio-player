import db from '../../config/data.js';

function observePlayer() {
	return new Promise((resolve) => {
		let observer;
		let options = {
			rootMargin: '0px',
			threshold: 0.6,
		};
		
		observer = new IntersectionObserver((array) => {
			array.forEach((item) => {
				if (item.intersectionRatio > options.threshold) {
					observer.disconnect();

					resolve('Player was observed.');
				}
			});
		}, options);

		observer.observe(db.container);
	});
}

export default observePlayer;