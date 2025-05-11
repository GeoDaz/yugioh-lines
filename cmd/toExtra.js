const { writeJson } = require('./lib');

const cards = Object.values(require('../src/json/cards.json'));

const isExtraDeck = card =>
	card.type === 'Monster' &&
	(card.monsterType.includes('Link') ||
		card.monsterType.includes('Synchro') ||
		card.monsterType.includes('Fusion') ||
		card.monsterType.includes('Xyz'));

const mainCards = [];
const extraCards = [];

console.log('Input', cards.length, cards[0]);

cards.forEach(card => {
	if (isExtraDeck(card)) {
		extraCards.push(card._id);
	} else {
		mainCards.push(card._id);
	}
});

console.log('Output', Object.keys(extraCards).length, Object.keys(extraCards)[0]);

writeJson('./src/json/extraCards.json', extraCards);
writeJson('./src/json/mainCards.json', mainCards);
