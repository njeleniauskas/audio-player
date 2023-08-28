import db from '../../config/data.js';
import constructDefaultTemplate from '../../templates/template-default.js';

function constructPlayerTemplate(configuration, template) {
	if (template == null) {
		db.player.template = constructDefaultTemplate(configuration);
	} else {
		db.player.template = template.call(configuration);
	}
}

export default constructPlayerTemplate;