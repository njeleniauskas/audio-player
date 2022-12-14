import db from '../../config/data.js';

function deployFragment(fragment) {
	switch (fragment) {
		case 'loader': {
			db.container.appendChild(db.loader);

			break;
		}

		case 'interface':
		default: {
			let className = `.${db.props.rootClassName}-loader`;
			let loader = document.querySelector(className);

			db.container.appendChild(db.player);
			db.container.setAttribute('data-status', 'active');
			loader.setAttribute('data-status', 'complete');
			
			db.status.interactable = true;
			
			break;
		}
		
		case 'message': {
			db.container.appendChild(db.message);
			
			break;
		}
	}
}

export default deployFragment;