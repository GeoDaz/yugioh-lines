const { writeJson } = require('./lib');

const cards = require('../src/json/top.json');
const values = Object.values(cards);

console.log('Before', values.length);

values.forEach(card => {
	if (card.alternateArt) {
		delete cards[card._id];
	}
});

console.log('After', Object.keys(cards).length);

writeJson('./src/json/top.json', cards);
