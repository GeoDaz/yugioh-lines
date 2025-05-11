const { writeJson } = require('./lib');

const cards = require('../src/json/cards.json');
const top = require('../src/json/top.json');
const staples = require('../src/json/staples.json');

const names = Object.fromEntries(Object.values(cards).map(card => [card.name, card._id]));

staples.forEach(staple => {
	const id = names[staple];
	if (id && !top[id]) {
		top[id] = cards[id];
	}
});

writeJson('./src/json/top.json', top);
