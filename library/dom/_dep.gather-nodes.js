import db from '../../config/data.js';

function gatherNodes() {
	const status = db.props.strings.status;
	const control = db.props.strings.control;
	const label = db.props.strings.label;
	const symbol = db.props.strings.symbol;
	const section = db.props.strings.section;
	const ready = db.props.strings.readyState;
	const statusSelector = `[${status}]`;
	const controlSelector = `[${control}]`;
	const labelSelector = `[${label}]`;
	const symbolSelector = `[${symbol}]`;
	const sectionSelector = `[${section}]`;
	const readySelector = `[${ready}]`;

	let array = [];
	let statusNodes = Array.from(db.container.querySelectorAll(statusSelector));
	let controlNodes = Array.from(db.container.querySelectorAll(controlSelector));
	let labelNodes = Array.from(db.container.querySelectorAll(labelSelector));
	let symbolNodes = Array.from(db.container.querySelectorAll(symbolSelector));
	let sectionNodes = Array.from(db.container.querySelectorAll(sectionSelector));
	let readyStateNodes = Array.from(db.container.querySelectorAll(readySelector));

	array = statusNodes.concat(controlNodes, labelNodes, symbolNodes, sectionNodes, readyStateNodes);

	array.forEach((node) => {
		let attribute;
		let key;

		if (node.hasAttribute(status)) {
			attribute = status;
		} else if (node.hasAttribute(control)) {
			attribute = control;
		} else if (node.hasAttribute(label)) {
			attribute = label;
		} else if (node.hasAttribute(symbol)) {
			attribute = symbol;
		}  else if (node.hasAttribute(section)) {
			attribute = section;
		} else {
			attribute = ready;
		}

		key = node.getAttribute(attribute);

		
		
		//doesn't allow multiples
		if (db.nodes[key] !== undefined) {
			
		}
		db.nodes[key] = node;
	});
}

export default gatherNodes;