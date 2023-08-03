import db from '../config/data.js';
import isConfigured from '../library/utilities/is-configured.js';

function constructDefaultTemplate() {
	let fragment = document.createDocumentFragment();
	let player = document.createElement('div');
	let className = `${db.props.rootClassName}-player`;
	let isDisplayed = '';

	let metadata = '';
	let controls = '';
	let stepControls = '';
	let progress = '';
	let progressBar = '';
	let timeCurrent = '';
	let timeDivider = '';
	let timeTotal = '';
	let volume = '';
	let volumeSlider = '';
	let volumeControl = '';

	let status = db.props.strings.status;
	let control = db.props.strings.control;
	let section = db.props.strings.section;

	player.classList.add(className);

	if (isConfigured('showMetadata', db.props.showMetadata)) {
		metadata = `<div class="${className}_metadata">
			<div class="${className}_title" ${status}="${db.map.title}">-</div>
			<div class="${className}_artist" ${status}="${db.map.artist}">-</div>
		</div>`;
	}

	controls = `<button ${control}="${db.map.main}" aria-labelledby="ap-play">
		<div id="ap-play" class="sr-text" data-ap-label="main-label">Play Track</div>
		<div class="play-symbols">
			${db.symbols.loader}
			<div class="play-symbols_main" ${section}>
				${db.symbols.play}
				${db.symbols.pause}
			</div>
		</div>
	</button>`;

	if (isConfigured('stepControls', db.props.stepControls)) {
		let tracks = db.data.tracks;
		let nextStatus = ``;

		if (tracks > 1) {
			nextStatus = `aria-disabled="false"`;
		}

		stepControls = `<div class="${className}_step-controls">
			<button ${control}="${db.map.previous}" aria-disabled="true" aria-labelledby="ap-prev">
				<div id="ap-prev" class="sr-text">Previous Track</div>
				${db.symbols.prev}
				</button>
			<button ${control}="${db.map.next}" ${nextStatus} aria-labelledby="ap-next">
				<div id="ap-next" class="sr-text">Next Track</div>
				${db.symbols.next}
			</button>
		</div>`;
	}

	if (isConfigured('progressText', db.props.progressOptions)) {
		timeCurrent = `<div class="player-time-current" ${status}="${db.map.timeCurrent}">-:--</div>`;
		timeDivider = `<span>/</span>`;
		timeTotal = `<div class="player-time-total" ${status}="${db.map.timeTotal}">-:--</div>`;
	}
	
	if (isConfigured('progressSlider', db.props.progressOptions)) {
		isDisplayed = ` flex-fill`;
		timeDivider = ``;
		progressBar = `<div
			class="slider slider--progress" 
			tabindex="0" 
			${control}="${db.map.progress}" 
			role="slider"
			aria-valuemin="0"
			aria-valuemax="0"
			aria-valuenow="0"
			aria-valuetext="0 of 0 seconds played"
			aria-labelledby="ap-progress">
				<div class="slider_track">
					<div class="slider_progress" ${status}="${db.map.progressCurrent}" style="transform: scaleX(0)"></div>
					<div class="slider_handle" ${status}="${db.map.progressHandle}"></div>
				</div>
			</div>`;
	}

	progress = `<div class="${className}_progress${isDisplayed}">
		${timeCurrent}
		<div id="ap-progress" class="sr-text">Current Progress</div>
		${progressBar}
		${timeDivider}
		${timeTotal}
	</div>`;


	if (isConfigured('gainSlider', db.props.gainOptions)) {	
		volumeSlider = `<div 
			class="slider slider--gain" 
			tabindex="0" 
			${control}="${db.map.fader}" 
			role="slider"
			aria-valuemin="0"
			aria-valuemax="1"
			aria-valuenow="1"
			aria-valuetext="Volume 100%"
			aria-labelledby="ap-volume">
				<div class="slider_track">
					<div class="slider_progress" ${status}="${db.map.faderCurrent}" style="transform: scaleX(1)"></div>
					<div class="slider_handle" ${status}="${db.map.faderHandle}"></div>
				</div>
			</div>`;
	}
	
	if (isConfigured('gainControl', db.props.gainOptions)) {
		volumeControl = `<button ${control}="${db.map.gain}" aria-labeledby="ap-mute">
			<div id="ap-mute" class="sr-text" data-ap-label="gain-label">Mute</div>
			${db.symbols.gain}
		</button>`;
	}

	volume = `<div class="${className}_gain">
		<div id="ap-volume" class="sr-text">Current Volume</div>
		${volumeSlider}
		${volumeControl}
	</div>`;

	player.insertAdjacentHTML('beforeend', metadata);
	player.insertAdjacentHTML('beforeend', controls);
	player.insertAdjacentHTML('beforeend', stepControls);
	player.insertAdjacentHTML('beforeend', progress);
	player.insertAdjacentHTML('beforeend', volume);

	fragment.appendChild(player);

	return fragment;
}

export default constructDefaultTemplate;