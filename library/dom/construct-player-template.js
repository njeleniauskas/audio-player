import constructTemplateOne from '../../templates/template-one.js';

function constructPlayerTemplate(template) {
	switch (template) {
		case 'one': {
			constructTemplateOne();
			break;
		}
	}
}

export default constructPlayerTemplate;