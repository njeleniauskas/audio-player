import db from '../../config/data.js';

function setupAudioContext() {
	//2020.01: safari requires -webkit prefix
	const AudioContext = window.AudioContext || window.webkitAudioContext;
	db.dsp.context = new AudioContext();
}

export default setupAudioContext;