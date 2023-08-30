/* ============================================================================
 * Information Database Object
 * ============================================================================
 * This object should be used as the single endpoint between any modules
 * within the audio-player.
 *
 * props.strings are used to populate data-attribute names for UI elements.
 * This allows easy editing and targeting of them should they need adjustment.
 *
 */
const db = {
	config: {
		setup: 'full',
		options: {
			showMetadata: true,
			stepControls: true,
			progressOptions: 'both',
			gainOptions: 'both',
			loop: false
		},
		template: null,
		breakpoints: {
			"default": [
				'metadata',
				'main',
				'previous',
				'next',
				'progress',
				'gain'
			]
		}
	},


	//static props
	props: {
		classes: {
			root: 'audio-player',
			hasSlider: 'has-slider'
		},
		strings: {
			prefix: 'data-ap',
			status: 'data-ap-status',
			control: 'data-ap-control',
			label: 'data-ap-label',
			symbol: 'data-ap-symbol',
			section: 'data-ap-section',
			readyState: 'data-ap-ready-state',
			hidden: 'data-hidden'
		},
		offset: 0.05,
	},


	//data attribute string mapping
	map: {
		//status nodes
		title: 'title',
		subtitle: 'subtitle', //not currently in use
		artist: 'artist',
		timeCurrent: 'time-current',
		timeTotal: 'time-total',
		progressCurrent: 'progress-current',
		progressHandle: 'progress-handle',
		gainCurrent: 'gain-current',
		gainHandle: 'gain-handle',
		message: 'message',

		//control nodes
		main: 'main',
		previous: 'previous',
		next: 'next',
		progress: 'progress',
		gainSlider: 'gain-slider',
		gain: 'gain',

		//labels for controls
		mainLabel: 'main-label',
		gainLabel: 'gain-label',

		//symbol nodes
		mainLoader: 'loader-main',
		play: 'play',
		pause: 'pause',
		gainZero: 'gain-zero',
		gainOne: 'gain-one',
		gainTwo: 'gain-two',

		//section nodes (containers)
		sectionMeta: 'metadata',
		sectionMain: 'main',
		sectionPrev: 'previous',
		sectionNext: 'next',
		sectionProgress: 'progress',
		sectionGain: 'gain'
	},


	//document fragments and important ui nodes
	fragments: {
		message: undefined,
		player: undefined,
		symbols: {}
	},

	nodes: {
		container: null,
		message: undefined,
		player: undefined,

		section: undefined,
		ready: undefined,

		control: undefined,
		status: undefined,
		symbol: undefined,
		label: undefined,
	},


	//dynamic event handlers and status monitors
	handler: {
		dragEvent: null,
		stepEvent: null,
		setEvent: null
	},

	monitor: {
		fetch: null,
		time: null,
		gain: null
	},


	//digital signal processing endpoints
	dsp: {
		context: undefined,
		buffers: [],
		source: null,
		gain: undefined
	},


	//core and operational data
	playlist: null,
	files: [],
	data: {
		tracks: 0,
		buffer: {
			track: 0,
			length: 0,
			startTime: 0,
			elapsedTime: 0
		},
		metadata: {
			title: '',
			artist: ''
		},
		gain: {
			current: 1,
			last: 0,
			start: 1
		},
		pointer: {
			lastX: 0,
		}
	},


	//player/environment status data
	status: {
		initial: true,
		unlocked: false,
		interactable: false,
		targetBuffer: 0,
		targetSlider: null,
		dsp: 'idle',
		buffer: 'pending',
		changingTrack: false,
		stepping: false,
		observing: false,
		viewportWidth: window.innerWidth,
		activeControlAttribute: null,
		playerConfig: 'default'
	}
};

export default db;