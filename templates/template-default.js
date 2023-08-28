import db from '../config/data.js';
import isConfigured from '../library/utilities/is-configured.js';

function constructDefaultTemplate(configuration) {
	let fragment = document.createDocumentFragment();
	let player = document.createElement('div');
	let classRoot = db.props.classes.root;
	let classHasSlider = db.props.classes.hasSlider;
	let breakpoints = db.props.template.breakpoints;

	let section = {
		'metadata': '',
		'main': '',
		'previous': '',
		'next': '',
		'progress': '',
		'gain': ''
	};
	let sectionOrder = [];
	let loader = '';
	let progressBarClass = '';
	let progressBar = '';
	let timeCurrent = '';
	let timeDivider = '';
	let timeTotal = '';
	let gainSlider = '';
	let gainControl = '';


	let statusAttr = db.props.strings.status;
	let controlAttr = db.props.strings.control;
	let sectionAttr = db.props.strings.section;
	let readyAttr = db.props.strings.readyState;


	player.classList.add(classRoot);


	if (isConfigured('showMetadata', db.props.showMetadata)) {
		section.metadata = `<div class="${classRoot}_metadata" ${sectionAttr}="${db.map.sectionMeta}">
			<div class="${classRoot}_title" ${statusAttr}="${db.map.title}">-</div>
			<div class="${classRoot}_artist" ${statusAttr}="${db.map.artist}">-</div>
		</div>`;
	}


	loader = `<div ${readyAttr}="pending">
		${db.symbols.loader}
	</div>`;

	section.main = `<button ${controlAttr}="${db.map.main}" ${sectionAttr}="${db.map.sectionMain}" aria-labelledby="ap-play">
		<div id="ap-play" class="sr-text" data-ap-label="main-label">Play Track</div>
		<div class="play-symbols">
			${loader}
			<div class="play-symbols_main" ${readyAttr}="ready">
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

		section.previous = `
			<button ${controlAttr}="${db.map.previous}" ${sectionAttr}="${db.map.sectionPrev}" aria-disabled="true" aria-labelledby="ap-previous">
				<div id="ap-previous" class="sr-text">previousious Track</div>
				${db.symbols.previous}
			</button>
		`;
		section.next = `
			<button ${controlAttr}="${db.map.next}" ${sectionAttr}="${db.map.sectionNext}" ${nextStatus} aria-labelledby="ap-next">
				<div id="ap-next" class="sr-text">Next Track</div>
				${db.symbols.next}
			</button>`;
	}


	if (isConfigured('progressSlider', db.props.progressOptions)) {
		progressBarClass = ` ${classHasSlider}`;
	}

	if (isConfigured('progressText', db.props.progressOptions)) {
		timeCurrent = `<div class="player-time-current" ${statusAttr}="${db.map.timeCurrent}">-:--</div>`;
		timeDivider = `<span>/</span>`;
		timeTotal = `<div class="player-time-total" ${statusAttr}="${db.map.timeTotal}">-:--</div>`;
	}
	
	if (isConfigured('progressSlider', db.props.progressOptions)) {
		timeDivider = ``;
		progressBar = `<div
			class="slider slider--progress" 
			tabindex="0" 
			${controlAttr}="${db.map.progress}" 
			role="slider"
			aria-valuemin="0"
			aria-valuemax="0"
			aria-valuenow="0"
			aria-valuetext="0 of 0 seconds played"
			aria-labelledby="ap-progress">
				<div class="slider_track">
					<div class="slider_progress" ${statusAttr}="${db.map.progressCurrent}" style="transform: scaleX(0)"></div>
					<div class="slider_handle" ${statusAttr}="${db.map.progressHandle}"></div>
				</div>
			</div>`;
	}

	//JS needed until :has() parent selection is better supported in CSS
	if (db.props.progressOptions !== 'none') {
		section.progress = `<div class="${classRoot}_progress${progressBarClass}" ${sectionAttr}="${db.map.sectionProgress}">
			${timeCurrent}
			<div id="ap-progress" class="sr-text">Current Progress</div>
			${progressBar}
			${timeDivider}
			${timeTotal}
		</div>`;
	}


	if (isConfigured('gainSlider', db.props.gainOptions)) {	
		gainSlider = `<div 
			class="slider slider--gain" 
			tabindex="0" 
			${controlAttr}="${db.map.fader}" 
			role="slider"
			aria-valuemin="0"
			aria-valuemax="1"
			aria-valuenow="1"
			aria-valuetext="gain 100%"
			aria-labelledby="ap-gain">
				<div class="slider_track">
					<div class="slider_progress" ${statusAttr}="${db.map.faderCurrent}" style="transform: scaleX(1)"></div>
					<div class="slider_handle" ${statusAttr}="${db.map.faderHandle}"></div>
				</div>
			</div>`;
	}
	

	if (isConfigured('gainControl', db.props.gainOptions)) {
		gainControl = `<button ${controlAttr}="${db.map.gain}" aria-labeledby="ap-mute">
			<div id="ap-mute" class="sr-text" data-ap-label="gain-label">Mute</div>
			${db.symbols.gain}
		</button>`;
	}


	section.gain = `<div class="${classRoot}_gain" ${sectionAttr}="${db.map.sectionGain}">
		<div id="ap-gain" class="sr-text">Current gain</div>
		${gainControl}
		${gainSlider}
	</div>`;


	breakpoints[configuration].forEach((slice) => {
		sectionOrder.push(section[slice]);
	});


	player.insertAdjacentHTML('beforeend', sectionOrder[0]);
	player.insertAdjacentHTML('beforeend', sectionOrder[1]);
	player.insertAdjacentHTML('beforeend', sectionOrder[2]);
	player.insertAdjacentHTML('beforeend', sectionOrder[3]);
	player.insertAdjacentHTML('beforeend', sectionOrder[4]);
	player.insertAdjacentHTML('beforeend', sectionOrder[5]);
	fragment.appendChild(player);

	return fragment;
}

export default constructDefaultTemplate;