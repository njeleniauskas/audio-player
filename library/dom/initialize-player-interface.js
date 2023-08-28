import db from '../../config/data.js';
import deployFragment from './deploy-fragment.js';
//import gatherNodes from './gather-nodes.js';
import assignEventListeners from './user-events.js';
import getNodesForObjectCollection from '../utilities/get-nodes-for-object-collection.js';
import getNodesForCollection from '../utilities/get-nodes-for-collection.js';

/* This function returns a promise so that the first buffer process does not
 * occur until the interface fully exists on the DOM .
 */
function initializePlayerInterface() {
	const rootClass = `.${db.props.classes.root}`;
	const statusSelector = db.props.strings.status;
	const controlSelector = db.props.strings.control;
	const labelSelector = db.props.strings.label;
	const symbolSelector = db.props.strings.symbol;
	const sectionSelector = db.props.strings.section;
	const readySelector = `[${db.props.strings.readyState}]`;

	deployFragment('interface');

	db.nodes.status = getNodesForObjectCollection(db.container, statusSelector);
	db.nodes.control = getNodesForObjectCollection(db.container, controlSelector);
	db.nodes.label = getNodesForObjectCollection(db.container, labelSelector);
	db.nodes.symbol = getNodesForObjectCollection(db.container, symbolSelector);
	db.nodes.section = getNodesForObjectCollection(db.container, sectionSelector);
	db.nodes.ready = getNodesForCollection(db.container, readySelector);
	db.player.node = db.container.querySelector(rootClass);

	assignEventListeners();
	
	return new Promise((resolve) => {
		resolve('player invoked');
	});
}

export default initializePlayerInterface;