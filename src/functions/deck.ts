import { Deck } from '@/types/Deck';

export const deckToYdk = (deck: Deck) =>
	`#main\n${deck.mainDeck
		.map(card => `${card.konamiID}`)
		.join('\n')}\n#extra\n${deck.extraDeck
		.map(card => `${card.konamiID}`)
		.join('\n')}`;
