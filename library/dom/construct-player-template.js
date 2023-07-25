import db from '../../config/data.js';
import constructDefaultTemplate from '../../templates/template-default.js';

function constructPlayerTemplate(template) {
	if (template == null) {
		db.player = constructDefaultTemplate();
	} else {
		db.player = template.call();
	}
}

export default constructPlayerTemplate;