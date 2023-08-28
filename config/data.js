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
	container: null,
	playlist: null,
	files: [],

	props: {
		configuration: 'full',
		loader: 'default',
		template: {
			function: null,
			breakpoints: {
				"default": [
					'metadata',
					'main',
					'previous',
					'next',
					'progress',
					'gain'
				]
			},
			totalBreakpoints: 1
		},
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

		//player config props (smart defaults)
		showMetadata: false,
		stepControls: false,
		progressOptions: 'slider',
		gainOptions: 'none',
		loop: false
	},

	map: {
		//status nodes
		title: 'title',
		subtitle: 'subtitle',
		artist: 'artist',
		timeCurrent: 'time-current',
		timeTotal: 'time-total',
		progressCurrent: 'progress-current',
		progressHandle: 'progress-handle',
		faderCurrent: 'gain-current',
		faderHandle: 'gain-handle',
		message: 'message',

		//control nodes
		main: 'main',
		previous: 'previous',
		next: 'next',
		progress: 'progress',
		fader: 'fader',
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

	//interface objects
	player: {
		template: undefined,
		node: undefined
	},
	message: undefined,
	nodes: {},
	symbols: {},

	//dynamic event handlers
	handler: {
		dragEvent: null,
		stepEvent: null,
		setEvent: null
	},

	//status monitors
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

	//operational data
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
		playerConfig: 'default'
	}
};

export default db;