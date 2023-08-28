import db from "../../config/data.js";

function updateUIReadyState(state) {
	const attribute = db.props.strings.readyState;
	const hidden = db.props.strings.hidden;

	//what about sections
	//change sections to ready state nodes, then 

	if (db.nodes.ready.length > 0 ) {
		db.nodes.ready.forEach((node) => {

			let isPending = node.getAttribute(attribute).includes('pending');

			//should I also include pending states to status nodes?
			if (state === 'pending') {
				if (!isPending) {
					node.setAttribute(hidden, true);
				} else {
					node.setAttribute(hidden, false);
				}
			} else {
				if (!isPending) {
					node.setAttribute(hidden, false);
				} else {
					node.setAttribute(hidden, true);
				}
			}
		});
	}


}

export default updateUIReadyState;