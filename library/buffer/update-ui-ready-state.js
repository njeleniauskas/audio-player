import db from "../../config/data.js";

function updateUIReadyState(state) {
	const attribute = db.props.strings.section;
	const hidden = db.props.strings.hidden;

	if (db.sections.length > 0 ) {
		db.sections.forEach((node) => {
			let isLoader = node.getAttribute(attribute).includes('loader');

			//should I also include pending states to status nodes?
			if (state === 'pending') {
				if (!isLoader) {
					node.setAttribute(hidden, true);
				} else {
					node.setAttribute(hidden, false);
				}
			} else {
				if (!isLoader) {
					node.setAttribute(hidden, false);
				} else {
					node.setAttribute(hidden, true);
				}
			}
		});
	}


}

export default updateUIReadyState;