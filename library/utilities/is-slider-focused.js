function isSliderFocused(node, attribute) {
	let hasAttribute = node.hasAttribute(attribute);
	let hasRole = node.hasAttribute('role');

	if (hasAttribute && hasRole) {
		return true;
	}

	return false;
}

export default isSliderFocused;