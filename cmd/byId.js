const { writeJson } = require('./lib');

const allCards = require('../src/json/cards.json');
const cards = require('../src/json/top1000.json');
const staples = require('../src/json/staples.json');
const names = require('../src/json/names.json');

const byId = {};

Object.values(cards).forEach(card => {
	byId[card._id] = card;
});

staples.forEach(staple => {
	const id = names[staple];
	if (id && !byId[id]) {
		byId[id] = allCards[id];
	}
});

writeJson('./src/json/top1000.json', byId);
