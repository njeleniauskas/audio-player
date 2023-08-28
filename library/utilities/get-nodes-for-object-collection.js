function getNodesForObjectCollection(container, string) {
	let result = {};
	let selector = `[${string}]`;

	let nodes = Array.from(container.querySelectorAll(selector));

	nodes.forEach((node) => {
		let key = node.getAttribute(string);

		result[key] = node;
	});

	return result;
}

export default getNodesForObjectCollection;