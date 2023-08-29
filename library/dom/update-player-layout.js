import db from "../../config/data.js";

async function updatePlayerLayout(breakpoint) {
	const newOrder = db.config.breakpoints[breakpoint];
	const player = db.nodes.player;
	
	newOrder.forEach((string) => {
		player.appendChild(db.nodes.section[string]);
	});

	return new Promise((resolve) => {
		resolve('Audio player layout updated');
	});
}

export default updatePlayerLayout;