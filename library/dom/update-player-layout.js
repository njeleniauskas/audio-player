import db from "../../config/data.js";

async function updatePlayerLayout(breakpoint) {
	const newOrder = db.props.template.breakpoints[breakpoint];
	const player = db.player.node;
	
	newOrder.forEach((string) => {
		player.appendChild(db.nodes.section[string]);
	});

	return new Promise((resolve) => {
		resolve('Audio player layout updated');
	});
}

export default updatePlayerLayout;