import db from '../../config/data.js';

function constructLiveRegion() {
	let fragment = document.createDocumentFragment();
	let element = document.createElement('div');
	let className = `${db.props.rootClassName}-message`;

	element.classList.add(className);
	element.setAttribute('data-ap-status', 'message');
	element.setAttribute('aria-live', 'assertive');
	element.classList.add('sr-text');
	element.textContent = 'Audio Player is Waiting to Load';
	fragment.appendChild(element);

	db.message = fragment;
}

export default constructLiveRegion;
