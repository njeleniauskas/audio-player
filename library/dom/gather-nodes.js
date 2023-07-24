import db from '../../config/data.js';

function gatherNodes() {
	const status = db.props.strings.status;
	const control = db.props.strings.control;
	const label = db.props.strings.label;
	const symbol = db.props.strings.symbol;
	const loader = db.props.strings.loader;
	const statusSelector = `[${status}]`;
	const controlSelector = `[${control}]`;
	const labelSelector = `[${label}]`;
	const symbolSelector = `[${symbol}]`;
	const loaderSelector = `[${loader}]`;

	let array = [];
	let statusNodes = Array.from(db.container.querySelectorAll(statusSelector));
	let controlNodes = Array.from(db.container.querySelectorAll(controlSelector));
	let labelNodes = Array.from(db.container.querySelectorAll(labelSelector));
	let symbolNodes = Array.from(db.container.querySelectorAll(symbolSelector));
	let loaderNodes = Array.from(db.container.querySelectorAll(loaderSelector));

	array = statusNodes.concat(controlNodes, labelNodes, symbolNodes, loaderNodes);

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
		} else {
			attribute = loader;
		}

		key = node.getAttribute(attribute);

		db.nodes[key] = node;
	});
}

export default gatherNodes;