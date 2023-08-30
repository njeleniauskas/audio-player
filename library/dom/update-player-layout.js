import db from "../../config/data.js";
import valueInArray from "../utilities/value-in-array.js";

async function updatePlayerLayout(breakpoint) {
	const player = db.nodes.player;
	const order = db.config.breakpoints[breakpoint];
	const DOMNodes = Object.keys(db.nodes.section);
	const orderValidOnly = order.filter(section => DOMNodes.includes(section));

	orderValidOnly.forEach((string) => {
		player.appendChild(db.nodes.section[string]);
	});

	return new Promise((resolve) => {
		resolve('Audio player layout updated');
	});
}

export default updatePlayerLayout;