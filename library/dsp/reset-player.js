import db from '../../config/data.js';
import processTargetBuffer from '../buffer/process-target-buffer.js';
import updatePlayState from '../playstate/update-play-state.js';

/* in order to ensure that the player state is correctly reset, the source
 * needs to be set to null, so that changing the play state does invoke a new
 * buffer source node.
 */
function resetPlayer() {
	db.dsp.source.stop(db.dsp.context.currentTime);
	db.dsp.source = null;
	db.dsp.context.close();
	db.status.dsp = 'idle';
	db.status.targetBuffer = 0;

	processTargetBuffer();
	updatePlayState();
}

export default resetPlayer;