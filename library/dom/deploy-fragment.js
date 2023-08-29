import db from '../../config/data.js';

function deployFragment(fragment) {
	const container = db.nodes.container;

	switch (fragment) {
		case 'interface':
		default: {
			container.appendChild(db.fragments.player);
			container.setAttribute('data-status', 'active');
			
			db.status.interactable = true; 
			
			break;
		}
		
		case 'message': {
			container.appendChild(db.fragments.message);
			
			break;
		}
	}
}

export default deployFragment;