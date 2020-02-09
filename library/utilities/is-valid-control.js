import db from '../../config/data.js';

function isValidControl() {
	const exists = (index) => index === string;
	let exclusions = ['main', 'previous', 'next', 'gain'];
	let focusElement = document.activeElement;
	let string;
	let result = true;

	if (focusElement.hasAttribute(db.props.strings.control)) {
		string = focusElement.getAttribute(db.props.strings.control);
		if (exclusions.some(exists)) {
			result = false;
		}
	}

	return result;
}

export default isValidControl;