import db from './config/data.js';
import configurePlayer from './config/configure-player.js';
import loadSymbols from './config/load-symbols.js';
import observePlayer from './library/dom/observe-player.js';
import constructLiveRegion from './library/dom/construct-live-region.js';
import deployFragment from './library/dom/deploy-fragment.js';
import constructPlayerTemplate from './library/dom/construct-player-template.js';
import fetchAudioData from './library/fetch.js';
import initializePlayerInterface from './library/dom/initialize-player-interface.js';
import unlockWebkitAudioContext from './library/dsp/unlock-webkit-audio.js';
import processTargetBuffer from './library/buffer/process-target-buffer.js';
import updateUIReadyState from './library/buffer/update-ui-ready-state.js';
import setupAudioContext from './library/dsp/setup-audio-context.js';
import awaitFileStatus from './library/utilities/await-file-status.js';

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

				//original: fetch → await → build
				constructPlayerTemplate(db.props.template);

				try {
					initializePlayerInterface();
					updateUIReadyState('pending');
	
					//start the main processing thread
					fetchAudioData();
					awaitFileStatus()
						.then(() => {
							unlockWebkitAudioContext();
							setupAudioContext();
							processTargetBuffer()
							.then(() => {
									updateUIReadyState('ready');
									db.nodes.status[db.map.message].textContent = 'Audio Player Ready';
								});
						});
				} catch (error) {
					console.error('Error initializing interface:', error);
				}
			});
	}
}

export default AudioPlayer;