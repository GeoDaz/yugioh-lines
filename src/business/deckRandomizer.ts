import { Deck } from '@/types/Deck';
import { Card } from '@/types/Card';
import { StringObject } from '@/types/Ui';
import { isExtraDeck } from './card';

export const randomizeDeck = (
	cards: Record<string, Card>,
	mainCards: string[],
	extraCards: string[],
	names: StringObject,
	staples: string[]
): Promise<Deck> => {
	const mainDeck: Deck['mainDeck'] = [];
	const extraDeck: Deck['extraDeck'] = [];

	const generateDeck = (deck: Card[], cardPool: string[], limit: number) => {
		let i = 0;
		do {
			i++;
			const rid = getRandomCard(cardPool);
			const card = cards[rid];
			addCard(card, deck);
		} while (deck.length < limit && i < limit * 3);
	};

	const getRandomCard = (array: string[]) =>
		array[Math.floor(Math.random() * array.length)];

	const addCard = (card: Card, deck: Card[]) => {
		if (!card || !card.name) return;
		if (!cardIsAddable(card, deck)) return;

		const cascadeCards = getCascadeCards(card);
		if (cascadeCards.length > 0) {
			deck.push({ ...card, required: true });
			cascadeCards.forEach(c => {
				if (isExtraDeck(c)) {
					addCard(c, extraDeck);
				} else {
					addCard(c, mainDeck);
				}
			});
		} else {
			deck.push(card);
		}
	};

	const cardIsAddable = (card: Card, array: Card[]) =>
		array.filter(c => c._id === card._id).length < 3;

	const getCascadeCards = (card: Card): Card[] => {
		if (!card.description) return [];
		const matches = card.description.match(/"([^"]+)"/g);
		if (!matches) return [];
		return matches
			.filter(match => match !== card.name)
			.map(match => ({ ...cards[names[match]], required: true }));
	};

	return new Promise(resolve => {
		generateDeck(mainDeck, staples, 9);
		generateDeck(extraDeck, extraCards, 15);
		generateDeck(mainDeck, mainCards, 40);

		mainDeck.sort((a, b) => a.name.localeCompare(b.name));
		extraDeck.sort((a, b) => a.name.localeCompare(b.name));

		resolve({ mainDeck, extraDeck });
	});
};
