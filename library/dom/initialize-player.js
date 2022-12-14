import deployFragment from './deploy-fragment.js';
import gatherNodes from './gather-nodes.js';
import assignEventListeners from './user-events.js';
import awaitFileStatus from '../utilities/await-file-status.js';

/* This function returns a promise so that the first buffer process does not
 * occur until the interface fully exists on the DOM .
 */
async function initializePlayerInterface() {
	await awaitFileStatus();
	deployFragment('interface');
	gatherNodes();
	assignEventListeners();
	
	return new Promise((resolve) => {
		resolve('player invoked');
	});
}

export default initializePlayerInterface;