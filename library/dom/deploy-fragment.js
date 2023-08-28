import db from '../../config/data.js';

function deployFragment(fragment) {
	switch (fragment) {
		case 'interface':
		default: {
			db.container.appendChild(db.player.template);
			db.container.setAttribute('data-status', 'active');
			
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