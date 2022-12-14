import db from './config/data.js';
import configurePlayer from './config/configure-player.js';
import loadSymbols from './config/load-symbols.js';
import observePlayer from './library/dom/observe-player.js';
import constructLoader from './library/dom/construct-loader.js';
import constructLiveRegion from './library/dom/construct-live-region.js';
import deployFragment from './library/dom/deploy-fragment.js';
import constructPlayerTemplate from './library/dom/construct-player-template.js';
import fetchAudioData from './library/fetch.js';
import initializePlayerInterface from './library/dom/initialize-player.js';
import unlockWebkitAudioContext from './library/dsp/unlock-webkit-audio.js';
import processTargetBuffer from './library/buffer/process-target-buffer.js';

class AudioPlayer {
	constructor(args) {
		this.init(args);
	}

	init(args) {
		configurePlayer(args);
		loadSymbols();
		observePlayer()
			.then(() => {
				constructLiveRegion();
				deployFragment('message');
				constructLoader();
				deployFragment('loader');
				constructPlayerTemplate(db.props.template);
				fetchAudioData();
				initializePlayerInterface()
					.then(() => {
						unlockWebkitAudioContext();
						processTargetBuffer()
							.then(() => {
								db.nodes[db.map.message].textContent = 'Audio Player Ready';
							});
					});
			});
	}
}

export default AudioPlayer;