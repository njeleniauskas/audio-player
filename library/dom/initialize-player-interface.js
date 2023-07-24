import db from '../../config/data.js';
import deployFragment from './deploy-fragment.js';
import gatherNodes from './gather-nodes.js';
import assignEventListeners from './user-events.js';
import getNodesforCollection from '../utilities/get-nodes-for-collection.js';

/* This function returns a promise so that the first buffer process does not
 * occur until the interface fully exists on the DOM .
 */
function initializePlayerInterface() {
	const section = db.props.strings.section;
	const sectionString = `[${section}]`;

	deployFragment('interface');
	gatherNodes();
	db.sections = getNodesforCollection(db.container, sectionString);
	assignEventListeners();
	
	return new Promise((resolve) => {
		resolve('player invoked');
	});
}

export default initializePlayerInterface;