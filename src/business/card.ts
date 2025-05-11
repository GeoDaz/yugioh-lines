import { Card } from '@/types/Card';

export const isExtraDeck = (card: Card) =>
	card.type === 'Monster' &&
	(card.monsterType.includes('Link') ||
		card.monsterType.includes('Synchro') ||
		card.monsterType.includes('Fusion') ||
		card.monsterType.includes('Xyz'));
