import db from './data.js';

//theres no seed data here
const dataSymbol = db.props.strings.symbol;
const symbols = {
	loader: `<svg viewBox="0 0 40 40" ${dataSymbol}="${db.map.mainLoader}" fill="none">
		<circle cx="20" cy="20" r="18" stroke="currentColor" stroke-width="2"/>
	</svg>`,
	play: `<svg width="12" height="16" viewBox="0 0 12 16" ${dataSymbol}="${db.map.play}" data-hidden="false">
		<polygon fill="currentColor" points="12,8 6,11.5 0,15 0,8 0,1 6,4.5"/>
	</svg>`,
	pause: `<svg width="12" height="16" viewBox="0 0 12 16" ${dataSymbol}="${db.map.pause}" data-hidden="true">
		<rect y="1" fill="currentColor" width="4" height="14"/>
		<rect x="8" y="1" fill="currentColor" width="4" height="14"/>
	</svg>`,
	previous: `<svg width="12" height="16" viewBox="0 0 12 16">
		<polygon fill="currentColor" points="3.341,8 7.671,5.5 12,3 12,8 12,13 7.671,10.5"/>
		<rect y="3" fill="currentColor" width="2" height="10"/>
	</svg>`,
	next: `<svg width="12" height="16" viewBox="0 0 12 16">
		<polygon fill="currentColor" points="8.659,8 4.329,10.5 0,13 0,8 0,3 4.329,5.5"/>
		<rect x="10" y="3" fill="currentColor" width="2" height="10"/>
	</svg>`,
	gain: `<svg width="18" height="16" viewBox="0 0 18 16" >
		<polygon fill="currentColor" points="2.25,5 6.803,2 6.803,14 2.25,11 0,11 0,5"/>
		<path fill="currentColor" d="M10.479,3.765L9,4.706c1.275,2.003,1.275,4.586,0,6.589l1.479,0.94C12.118,9.661,12.118,6.34,10.479,3.765z" ${dataSymbol}="${db.map.gainOne}" data-hidden="false"/>
		<path fill="currentColor" d="M13.48,1.883L12,2.823c2.003,3.147,2.003,7.207,0,10.354l1.48,0.94C15.847,10.399,15.848,5.602,13.48,1.883z" ${dataSymbol}="${db.map.gainTwo}" data-hidden="false"/>
		<polygon fill="currentColor" points="17.484,5.172 16.07,3.758 13.242,6.586 10.414,3.758 9,5.172 11.828,8 9,10.828 10.414,12.242 13.242,9.414 16.07,12.242 17.484,10.828 14.656,8" ${dataSymbol}="${db.map.gainZero}" data-hidden="true"/>
	</svg>`,
};

export default symbols;