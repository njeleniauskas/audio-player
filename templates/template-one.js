import db from '../config/data.js';

function constructTemplateOne() {
	let fragment = document.createDocumentFragment();
	let player = document.createElement('div');
	let className = `${db.props.rootClassName}-player`;

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

	player.classList.add(className);

	if (db.props.showMetadata) {
		metadata = `<div class="${className}_metadata">
			<div class="${className}_title" ${status}="${db.map.title}"></div>
			<div class="${className}_artist" ${status}="${db.map.artist}"></div>
		</div>`;
	}

	controls = `<button class="${className}_controls" ${control}="${db.map.main}" aria-labelledby="ap-play">
		<div id="ap-play" class="sr-text" data-ap-label="main-label">Play Track</div>
		<svg width="12" height="16" viewBox="0 0 12 16">
			${db.symbols.play}
			${db.symbols.pause}
		</svg>
	</button>`;

	if (db.props.stepControls) {
		let tracks = db.data.tracks;
		let nextStatus = ``;

		if (tracks > 1) {
			nextStatus = `aria-disabled="false"`;
		}

		stepControls = `<div>
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

	if (db.props.progressOptions !== 'none') {
		timeCurrent = `<div class="player-time-current" ${status}="${db.map.timeCurrent}">-:--</div>`;
		timeDivider = `<span>/</span>`;
		timeTotal = `<div class="player-time-total" ${status}="${db.map.timeTotal}">-:--</div>`;

		if (db.props.progressOptions == 'slider') {
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
	}

	progress = `<div class="${className}_progress">
		${timeCurrent}
		<div id="ap-progress" class="sr-text">Current Progress</div>
		${progressBar}
		${timeDivider}
		${timeTotal}
	</div>`;

	if (db.props.gainOptions !== 'none') {
		volumeControl = `<button ${control}="${db.map.gain}" aria-labeledby="ap-mute">
			<div id="ap-mute" class="sr-text" data-ap-label="gain-label">Mute</div>
			${db.symbols.gain}
		</button>`;

		if (db.props.gainOptions === 'slider') {
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

	db.player = fragment;
}

export default constructTemplateOne;