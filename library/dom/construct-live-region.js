import db from '../../config/data.js';

//player is already observed, and is loading assets at creation time
function constructLiveRegion() {
	let fragment = document.createDocumentFragment();
	let element = document.createElement('div');
	let className = `${db.props.classes.root}-message`;

	element.classList.add(className);
	element.setAttribute('data-ap-status', 'message');
	element.setAttribute('aria-live', 'assertive');
	element.classList.add('sr-text');
	element.textContent = 'Constructing Audio Player';
	fragment.appendChild(element);

	db.fragments.message = fragment;
}

export default constructLiveRegion;
