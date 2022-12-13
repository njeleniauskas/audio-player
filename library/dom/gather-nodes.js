import db from '../../config/data.js';

function gatherNodes() {
	const status = db.props.strings.status;
	const control = db.props.strings.control;
	const label = db.props.strings.label;
	const symbol = db.props.strings.symbol;
	const statusSelector = `[${status}]`;
	const controlSelector = `[${control}]`;
	const labelSelector = `[${label}]`;
	const symbolSelector = `[${symbol}]`;

	let array = [];
	let statusNodes = Array.from(document.querySelectorAll(statusSelector));
	let controlNodes = Array.from(document.querySelectorAll(controlSelector));
	let labelNodes = Array.from(document.querySelectorAll(labelSelector));
	let symbolNodes = Array.from(document.querySelectorAll(symbolSelector));

	array = statusNodes.concat(controlNodes, labelNodes, symbolNodes);

	array.forEach((node) => {
		let attribute;
		let key;

		if (node.hasAttribute(status)) {
			attribute = status;
		} else if (node.hasAttribute(control)) {
			attribute = control;
		} else if (node.hasAttribute(label)) {
			attribute = label;
		} else {
			attribute = symbol;
		}

		key = node.getAttribute(attribute);

		db.nodes[key] = node;
	});
}

export default gatherNodes;