# Audio Player
A buffer-based audio application using the Web Audio API and JS Modules.

<br>

![GitHub tag (with filter)](https://img.shields.io/github/v/tag/njeleniauskas/audio-player?color=27B17E)
![Static Badge](https://img.shields.io/badge/Status-Stable-%2327B17E)
![Static Badge](https://img.shields.io/badge/Language-JavaScript-%232C67BF)
![Static Badge](https://img.shields.io/badge/License-MIT-%232C67BF)

<br>

## Basic Usage
This audio player only needs minimal HTML, CSS, and JavaScript to get up and running. However, it can also be configured in several ways to meet different design or behavioral needs (see [configuration details](#configuration-details)).

<br>

#### HTML
A container element needs to be added with a unique class so this node can be targeted correctly. You can add your own class name, but an example is as follows:

```html
<div class="audio-container"></div>
```

<br>

#### CSS
The player has two layers of CSS. The `ap-core.css` file contains all of the required styles for the player to function at it's most basic level. Beyond this, a presentational layer is needed as well. You can either used the included `ap-design.css` file, or author your own. 

```html
<link rel="stylesheet" href="ap-core.css">
<link rel="stylesheet" href="ap-design.css">
```

If you author your own CSS, you will need to make sure the styles match the template being used by the player.

<br>

#### JavaScript
To get the player up and running, a JavaScript module is needed and should include the class import, playlist, arguments for the player, and finally, calling the player:

```html
<script type="module">
	import AudioPlayer from './audio-player.js';

	const playlist = [
		{
			'title': 'Death with Dignity',
			'artist': 'Sufjan Stevens',
			'src': 'assets/audio/death-with-dignity.mp3'
		}
	];

	const args = {
		'container': 'audio-container',
		'playlist': playlist,
	};
	
	let audioPlayer = new AudioPlayer(args);
</script>
```

<br>

#### Operating the Player
When operating the player, the following keys may be used for various controls:
- Play/Pause: `Spacebar`, `MediaPlayPause`[^2]
- Track Controls: `MediaKeyPrevious`, `MediaKeyNext`
- Progress: `ArrowLeft`, `ArrowRight`, `Home`, and `End`
- Gain Slider: `ArrowLeft` and `ArrowRight`, `ArrowUp` and `ArrowDown`, or `Home` and `End`
- Gain Toggle: `M`

[^2]: The `MediaPlayPause` key will not work until a user has intearacted with the DOM in some way.

<br>

## Configuration Details
There are several options to configure how the player behaves and is displayed. Beyond the container and playlist arguments, authors can add a specific configuration option, a custom template and breakpoints, and enable or disable looping.

<br>

#### Configuration Options
There are two ways authors can set up the player configuration. Pick a pre-defined option or create their own custom configuration.

There are three pre-defined options (`minimal`, `basic`, `full`), that can be passed as a string in the `args` object:

```javascript
const args = {
	configuration: 'minimal'
};
```

If you wish to control exactly what UI controls are available, you may instead pass an object to the `configuration` property. The available options you may choose from are as follows:

- `showMetadata`: `[false, true]`
- `stepControls`: `[false, true]`[^1]
- `progresOptions`: `[none, text, slider, both]`
- `gainOptions`: `[none, button, slider, both]`

[^1]: Track step controls will only display if there are multiple tracks even when set to true.

An customized example is as follows:

```javascript
const config = {
	'showMetadata': false,
	'progressOptions': 'slider',
	'gainOptions': 'button'
};

const args = {
	'configuration': config
};
```

Note, if no `configuration` argument is supplied, the player will default to the `full` configuration.

<br>

#### Adding Breakpoints
If needed, custom breakpoints can be defined for this player. This allows the player to change its layout and reflow correctly, maintaining the logical `Tab` order needed.

To add a breakpoint, simply include the `breakpoint` argument with a key representing the breakpoint value, and the layout order of the player as an array of strings (default shown below):

```javascript
const args = {
	'breakpoints': {
		'768': [
			'metadata',
			'main',
			'previous',
			'next',
			'progress',
			'gain',
		],
	}
}
```

Note that each breakpoint behaves like the CSS rule `@media (max-width: {value})`, where the object key should be the width in pixels you want to define, and the array values are the sections of the player that can be re-ordered. If no breakpoint is supplied only the default layout will be used.

<br>

#### Looping a Playlist
By default, looping is set to `false`. However, if you wish continue playing after the last track is completed simply pass `loop: true` in the `args` object.

<br>

## Building a Player Template
If desired, a custom template can be passed to the player as an argument. To work properly, the `template` argument should be passed a function that returns a document fragment. An example of a template skeleton being passed to the player is as follows:

```javascript
const playerTemplate = function() {
	const documentFragment = document.createDocumentFragment();
	let player = document.createElement('div');

	documentFragment.appendChild(player);

	return documentFragment;
}
```
```javascript
const args = {
	'template': playerTemplate
}
```

<br>

To help building a custom template, authors can include a parameter in the function statement. This gives a user access to all of the classes, attributes, strings, and functions the default player template uses.

```javascript
const playerTemplate = function(params) {
	let fragment = document.createDocumentFragment();
	let player = document.createElement('div');

	//adding the root class to an element:
	player.classList.add(params.classes.root);
}
```

<br>

There are 9 types of available parameters. Below are the available options users can choose from:

```javascript
//player configuration options (to check available functionality)
params.options.showMetadata
params.options.stepControls
params.options.progressOptions
params.options.gainOptions
params.options.loop //not helpful
```
```javascript
//breakpoints to build the right layout
params.breakpoints
```
```javascript
//classes to help automate naming
params.classes.root
params.classes.hasSlider //useful until CSS :has() is better supported
```
```javascript
//strings representing data attributes
params.attributes.prefix
params.attributes.status
params.attributes.control
params.attributes.label
params.attributes.symbol
params.attributes.section
params.attributes.readyState
params.attributes.hidden
```
```javascript
//strings representing data attribute values
params.strings.title
params.strings.subtitle
params.strings.artist
params.strings.timeCurrent
params.strings.timeTotal
params.strings.progressCurrent
params.strings.progressHandle
params.strings.gainCurrent
params.strings.gainHandle
params.strings.message
params.strings.main
params.strings.previous
params.strings.next
params.strings.progress
params.strings.gainSlider
params.strings.gain
params.strings.mainLabel
params.strings.gainLabel
params.strings.mainLoader
params.strings.play
params.strings.pause
params.strings.gainZero
params.strings.gainOne
params.strings.gainTwo
params.strings.sectionMeta
params.strings.sectionMain
params.strings.sectionPrev
params.strings.sectionNext
params.strings.sectionProgress
params.strings.sectionGain
```
```javascript
//available SVG symbols for use
params.symbols.loader
params.symbols.play
params.symbols.pause
params.symbols.previous
params.symbols.next
params.symbols.gain
```
```javascript
//the total number of tracks; helper to disable step controls with aria-disabled
params.totalTracks
```
```javascript
//the target layout (breakpoint key) the template should build
params.targetLayout
```

<br>

Using the `isConfigured()` function requires a little knowledge. The function takes 2 arguments and will return a boolean (`true/false`). To use correctly, the **first** argument is the functionality being considered, and the **second**, the option being tested.

```javascript
//An example, testing if the gain button is available
if (params.functions.isConfigured('gainControl', params.options.gainOptions)) {
	//build the appropriate html template literal
}
```

The list of functions that can be tested are (1st argument): `showMetadata`, `stepControls`, `progressText`, `progressSlider`, `gainSlider`, and `gainControl`.

<br>

*Note For more details, see the default template for how these parameters are used in `/templates/template-default.js`.*



<br>

## Engineering Notes
**Module Process**
Throughout the modules, data processing is broken into 3 stages, setting data, updating the UI, and processing the data as audio changes. The functions written follow this taxonomy so that the scope of the function is clear. Owing to this, some functions will look like they are coming from a state, but are instead going to the defined state.



**AudioBufferSourceNode**
An `AudioBufferSourceNode` can only be started/stopped once. Therefore, any start or restart of a buffer needs to initiate a new source node to operate correctly. Essentially, they need to be treated like temporary instances, rather than a dedicated audio buffer (akin to other music programming environments).



**Gain Changes**
When setting gain changes it is sometimes necessary to explicitly set an intitial value with `SetValueAtTime` before using `exponentialRampToValueAtTime` to the new value to avoid errant audio clicks.

In addition to this, changing gain at present rapidly induces zipper noise. This may be an API-level problem, but should be eventually investigated.



**Drag Operations**
It is necessary to clear any document selections when any drag operation is underway. If there is a selection and you attempt a drag operation on a slider, it will drag the current selection, and ignore user events (specifically mouseup).



**Accessiblity**
The accessibility support of this player robust, and should work for all devices and users.



**Loading States**
Loading states for the player are necessary in two places. If a user has a slow connection, the initial load of the JavaScript Module may take more than a few seconds. In addition, all users may experience a delay between a track being downloaded, and decoded and ready to play.



**Webkit/iOS/Safari**
The current implementation of this player is slightly suboptimal as the iOS implementation of the Audio API does not adhere to the W3C standard. As such, there are some very buggy behaviors that exist that needed to be fixed, such as unlocking audio processing at the start of the player.

In addition, it only supports iOS13 macOS 10.15 due to pointer events and `touch-action` css.

<br>

## Roadmap
Here are a few items that are on my radar to explore or fix in the future:
- add JSDoc to functions.
- Add a large step to slider nudging.
- Add reset track to playhead 0 on Home key if more than 3s in.
- Create more flexible metadata loading and display.
- Explore Media Session API support for broader control support.
- update readme to include 'build your own' details (data-attrs as hints to important nodes).