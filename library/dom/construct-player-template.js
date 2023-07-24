import constructDefaultTemplate from '../../templates/template-default.js';

function constructPlayerTemplate(template) {
	switch (template) {
		case 'default': {
			constructDefaultTemplate();
			break;
		}
		case 'user': {
			//include user template functionality call
			break;
		}
	}
}

export default constructPlayerTemplate;