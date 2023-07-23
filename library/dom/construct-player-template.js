import constructTemplateOne from '../../templates/template-one.js';

function constructPlayerTemplate(template) {
	switch (template) {
		case 'default': {
			constructTemplateOne();
			break;
		}
		case 'user': {
			//include user template functionality call
			break;
		}
	}
}

export default constructPlayerTemplate;