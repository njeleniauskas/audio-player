import db from './data.js';
import symbols from './symbols.js';

function loadSymbols() {
	for (const key in symbols) {
		db.symbols[key] = symbols[key];
	}
}

export default loadSymbols;