import db from '../../config/data.js';

function observePlayer() {
	const container = db.nodes.container;

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

		observer.observe(container);
	});
}

export default observePlayer;