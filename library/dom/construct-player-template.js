import db from '../../config/data.js';

import getPlayerTemplateArgs from '../../config/get-player-template-args.js';
import constructDefaultTemplate from '../../templates/template-default.js';

function constructPlayerTemplate(template) {
	const args = getPlayerTemplateArgs();

	if (template == null) {
		db.fragments.player = constructDefaultTemplate(args);
	} else {
		db.fragments.player = template.call(args);
	}
}

export default constructPlayerTemplate;