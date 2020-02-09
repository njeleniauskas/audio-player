import db from '../../config/data.js';

function gatherNodes() {
	const status = db.props.strings.status;
	const control = db.props.strings.control;
	const symbol = db.props.strings.symbol;
	const statusSelector = `[${status}]`;
	const controlSelector = `[${control}]`;
	const symbolSelector = `[${symbol}]`;

	let array = [];
	let statusNodes = Array.from(document.querySelectorAll(statusSelector));
	let controlNodes = Array.from(document.querySelectorAll(controlSelector));
	let symbolNodes = Array.from(document.querySelectorAll(symbolSelector));

	array = statusNodes.concat(controlNodes, symbolNodes);

	array.forEach((node) => {
		let attribute;
		let key;

		if (node.hasAttribute(status)) {
			attribute = status;
		} else if (node.hasAttribute(control)) {
			attribute = control;
		} else {
			attribute = symbol;
		}

		key = node.getAttribute(attribute);

		db.nodes[key] = node;
	});
}

export default gatherNodes;