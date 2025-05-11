const { writeJson } = require('./lib');

const cards = require('../src/json/cards.json');
const names = {};

console.log('Input', cards.length, cards[0]);

cards.forEach(card => {
	names[card._id] = card.name;
});

console.log('Output', Object.keys(names).length, Object.keys(names)[0]);

writeJson('./src/json/names.json', names);
