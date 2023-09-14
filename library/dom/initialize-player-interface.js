import db from '../../config/data.js';

import getNodesForObjectCollection from '../utilities/get-nodes-for-object-collection.js';
import getNodesForCollection from '../utilities/get-nodes-for-collection.js';

import deployFragment from './deploy-fragment.js';
import assignEventListeners from './user-events.js';

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

	db.nodes.player = db.nodes.container.querySelector(rootClass);
	db.nodes.status = getNodesForObjectCollection(db.nodes.container, statusSelector);
	db.nodes.control = getNodesForObjectCollection(db.nodes.container, controlSelector);
	db.nodes.label = getNodesForObjectCollection(db.nodes.container, labelSelector);
	db.nodes.symbol = getNodesForObjectCollection(db.nodes.container, symbolSelector);
	db.nodes.section = getNodesForObjectCollection(db.nodes.container, sectionSelector);
	db.nodes.ready = getNodesForCollection(db.nodes.container, readySelector);

	assignEventListeners();
	
	return new Promise((resolve) => {
		resolve('player invoked');
	});
}

export default initializePlayerInterface;