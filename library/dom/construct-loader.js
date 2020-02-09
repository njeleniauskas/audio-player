import db from '../../config/data.js';

function constructLoader() {
	let fragment = document.createDocumentFragment();
	let element = document.createElement('div');
	let className = `${db.props.rootClassName}-loader`;

	element.classList.add(className);
	element.setAttribute('data-status', 'loading');
	element.insertAdjacentHTML('beforeend', db.symbols.loader);
	fragment.appendChild(element);

	db.loader = fragment;
}

export default constructLoader;