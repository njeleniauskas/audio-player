/*
	The default template is set up exactly the same way a custom template needs to. So the internal objects and function calls are exact (if you plan on building your own template).

	For reference, the following params are available for use. Note that access to data in the db object has been restricted to a smaller dataset (necessary scope only).

	params = {
		options: db.config.options,
		breakpoints: db.config.breakpoints,
		classes: db.props.classes,
		attributes: db.props.strings,
		strings: db.map,
		symbols: db.fragments.symbols,
		totalTracks: db.data.tracks,
		targetLayout: db.status.playerConfig,
		functions: {
			isConfigured: isConfigured
		}
	};

	In order to comply with the breakpoint functionality, the document fragment must append each player section in the correct order for the initial breakpoint to be rendered correctly.
*/
function constructDefaultTemplate(params) {
	let fragment = document.createDocumentFragment();
	let player = document.createElement('div');
	let classRoot = params.classes.root;
	let classHasSlider = params.classes.hasSlider;
	let breakpoints = params.breakpoints;

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


	let statusAttr = params.attributes.status;
	let controlAttr = params.attributes.control;
	let sectionAttr = params.attributes.section;
	let readyAttr = params.attributes.readyState;


	player.classList.add(classRoot);


	if (params.functions.isConfigured('showMetadata', params.options.showMetadata)) {
		section.metadata = `<div class="${classRoot}_metadata" ${sectionAttr}="${params.strings.sectionMeta}">
			<div class="${classRoot}_title" ${statusAttr}="${params.strings.title}">-</div>
			<div class="${classRoot}_artist" ${statusAttr}="${params.strings.artist}">-</div>
		</div>`;
	}


	loader = `<div ${readyAttr}="pending">
		${params.symbols.loader}
	</div>`;

	section.main = `<button ${controlAttr}="${params.strings.main}" ${sectionAttr}="${params.strings.sectionMain}" aria-labelledby="ap-play">
		<div id="ap-play" class="sr-text" data-ap-label="main-label">Play Track</div>
		<div class="play-symbols">
			${loader}
			<div class="play-symbols_main" ${readyAttr}="ready">
				${params.symbols.play}
				${params.symbols.pause}
			</div>
		</div>
	</button>`;


	//stepControls only are valid if configured && tracks > 1
	if (params.functions.isConfigured('stepControls', params.options.stepControls)) {
		let nextStatus = `aria-disabled="false"`;

		section.previous = `
			<button ${controlAttr}="${params.strings.previous}" ${sectionAttr}="${params.strings.sectionPrev}" aria-disabled="true" aria-labelledby="ap-previous">
				<div id="ap-previous" class="sr-text">previousious Track</div>
				${params.symbols.previous}
			</button>`;
		section.next = `
			<button ${controlAttr}="${params.strings.next}" ${sectionAttr}="${params.strings.sectionNext}" ${nextStatus} aria-labelledby="ap-next">
				<div id="ap-next" class="sr-text">Next Track</div>
				${params.symbols.next}
			</button>`;
	}


	if (params.functions.isConfigured('progressSlider', params.options.progressOptions)) {
		progressBarClass = ` ${classHasSlider}`;
	}

	if (params.functions.isConfigured('progressText', params.options.progressOptions)) {
		timeCurrent = `<div class="player-time-current" ${statusAttr}="${params.strings.timeCurrent}">-:--</div>`;
		timeDivider = `<span>/</span>`;
		timeTotal = `<div class="player-time-total" ${statusAttr}="${params.strings.timeTotal}">-:--</div>`;
	}
	
	if (params.functions.isConfigured('progressSlider', params.options.progressOptions)) {
		timeDivider = ``;
		progressBar = `<div
			class="slider slider--progress" 
			tabindex="0" 
			${controlAttr}="${params.strings.progress}" 
			role="slider"
			aria-valuemin="0"
			aria-valuemax="0"
			aria-valuenow="0"
			aria-valuetext="0 of 0 seconds played"
			aria-labelledby="ap-progress">
				<div class="slider_track">
					<div class="slider_progress" ${statusAttr}="${params.strings.progressCurrent}" style="transform: scaleX(0)"></div>
					<div class="slider_handle" ${statusAttr}="${params.strings.progressHandle}"></div>
				</div>
			</div>`;
	}

	//JS needed until :has() parent selection is better supported in CSS
	if (params.options.progressOptions !== 'none') {
		section.progress = `<div class="${classRoot}_progress${progressBarClass}" ${sectionAttr}="${params.strings.sectionProgress}">
			${timeCurrent}
			<div id="ap-progress" class="sr-text">Current Progress</div>
			${progressBar}
			${timeDivider}
			${timeTotal}
		</div>`;
	}


	if (params.functions.isConfigured('gainSlider', params.options.gainOptions)) {	
		gainSlider = `<div 
			class="slider slider--gain" 
			tabindex="0" 
			${controlAttr}="${params.strings.gainSlider}" 
			role="slider"
			aria-valuemin="0"
			aria-valuemax="1"
			aria-valuenow="1"
			aria-valuetext="Volume 100%"
			aria-labelledby="ap-gain">
				<div class="slider_track">
					<div class="slider_progress" ${statusAttr}="${params.strings.gainCurrent}" style="transform: scaleX(1)"></div>
					<div class="slider_handle" ${statusAttr}="${params.strings.gainHandle}"></div>
				</div>
			</div>`;
	}
	

	if (params.functions.isConfigured('gainControl', params.options.gainOptions)) {
		gainControl = `<button ${controlAttr}="${params.strings.gain}" aria-labeledby="ap-mute">
			<div id="ap-mute" class="sr-text" data-ap-label="gain-label">Mute</div>
			${params.symbols.gain}
		</button>`;
	}


	section.gain = `<div class="${classRoot}_gain" ${sectionAttr}="${params.strings.sectionGain}">
		<div id="ap-gain" class="sr-text">Current Volume</div>
		${gainControl}
		${gainSlider}
	</div>`;


	breakpoints[params.targetLayout].forEach((slice) => {
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