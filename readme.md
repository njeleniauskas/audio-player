# Audio Player
*Version 2.1 | Authored by Nik Jeleniauskas*

---
The following audio player is a flexible, buffer-based application that uses the Audio API, and is written in modern JavaScript.

<br>

## Basic Usage
This audio player only needs minimal HTML, CSS, and JavaScript to get up and running. However, it can also be configured in several ways to meet different design or behavioral needs (see [configuration details](#configuration-details)).


#### HTML
A container element needs to be added with a unique class so this node can be targeted correctly. You can add your own class name, but an example is as follows:

```html
<div class="audio-container"></div>
```


#### CSS
The player has two layers of CSS. The `core.css` file contains all of the required styles for the player to function at it's most basic level. Beyond this, a presentational layer is needed as well. You can either used the included `design.css` file, or author your own. 

```html
<link rel="stylesheet" href="core.css">
<link rel="stylesheet" href="design.css">
```

If you author your own CSS, you will need to make sure the styles match the player template being used by the player.


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
		container: 'audio-container',
		playlist: playlist,
	};
	
	let audioPlayer = new AudioPlayer(args);
</script>
```

<br>

## Configuration Details
There are several options to configure how the player behaves and is displayed. Beyond the container and playlist arguments, authors can add a specific configuration option, custom template, and enable or disable looping.

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
	showMetadata: false,
	progressOptions: 'slider',
	gainOptions: 'button'
};

const args = {
	configuration: config
};
```

Note, if no `configuration` argument is supplied, the player will default to the `full` configuration.


#### Player Template
*Some adjustment of the source code is needed at present for user-generated templates to work properly. This will be fixed in a later version.*


#### Looping a Playlist
By default, looping is set to `false`. However, if you wish continue playing after the last track is completed simply pass `loop: true` in the `args` object.

<br>

## Operating the Player
When operating the player, the following keys may be used for various controls:
- Play/Pause: `Spacebar`, `MediaPlayPause`[^2]
- Track Controls: `MediaKeyPrevious`, `MediaKeyNext`
- Progress: `ArrowLeft`, `ArrowRight`, `Home`, and `End`
- Gain Slider: `ArrowLeft` and `ArrowRight`, `ArrowUp` and `ArrowDown`, or `Home` and `End`
- Gain Toggle: `M`

[^2]: The `MediaPlayPause` key will not work until a user has intearacted with the DOM in some way.

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
- Add new loading symbol and animation.
- Add a large step to slider nudging.
- Add a loading state when a buffer is still decoding.
- Add user-authored player template functionality.
- Create more flexible metadata loading and display.
- Explore Media Session API support for broader control support.
- update readme to include 'build your own' details (data-attrs as hints to important nodes).