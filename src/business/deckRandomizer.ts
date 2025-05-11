import { Deck } from '@/hooks/useDownloadYdk';
import { Card } from '@/types/Card';
import { StringObject } from '@/types/Ui';

export const randomizeDeck = (
	cards: Record<string, Card>,
	mainCards: string[],
	extraCards: string[],
	names: StringObject,
	staples: string[]
): Deck => {
	const mainDeck: Deck['mainDeck'] = [];
	const extraDeck: Deck['extraDeck'] = [];

	for (let i = 0; i < 9; i++) {
		let card = cards[names[getRandomCard(staples)]];
		if (!card) continue;
		if (cardIsAddable(card, mainDeck)) continue;
		mainDeck.push(card);
	}

	do {
		let card = cards[getRandomCard(extraCards)];
		if (!card) continue;
		if (cardIsAddable(card, extraDeck)) continue;
		extraDeck.push(card);
	} while (extraDeck.length < 15);

	do {
		let card = cards[getRandomCard(mainCards)];
		if (!card) continue;
		if (cardIsAddable(card, mainDeck)) continue;
		mainDeck.push(card);
	} while (mainDeck.length < 40);

	mainDeck.sort((a, b) => a.name.localeCompare(b.name));
	extraDeck.sort((a, b) => a.name.localeCompare(b.name));

	return { mainDeck, extraDeck };
};

const cardIsAddable = (card: Card, array: Card[]) =>
	array.filter(c => c._id === card._id).length >= 3;

const getRandomCard = (array: string[]) =>
	array[Math.floor(Math.random() * array.length)];
