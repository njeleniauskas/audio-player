function getNodesforCollection(container, string) {
	let result;

	result = Array.from(container.querySelectorAll(string));

	return result;
}

export default getNodesforCollection;