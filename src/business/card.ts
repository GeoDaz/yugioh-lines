import { Limitations } from '@/constants/limitations';
import { attributesByReg } from '@/constants/limitations';
import { Regulations } from '@/constants/limitations';
import { Card } from '@/types/Card';

export const isExtraDeck = (card: Card) =>
	card.type === 'Monster' &&
	(card.monsterType.includes('Link') ||
		card.monsterType.includes('Synchro') ||
		card.monsterType.includes('Fusion') ||
		card.monsterType.includes('Xyz'));

export const getCardArchetype = (card: Card) => {
	let deckType = card.deckTypes.find(archetype => card.name.includes(archetype));
	if (deckType) return deckType;
	deckType = card.deckTypes.find(archetype => card.description.includes(archetype));
	if (deckType) return deckType;
	return null;
};

export const getLimitationValue = (
	card: Card,
	regulation: Regulations
): Limitations | null => {
	const banStatus = card[attributesByReg[regulation].banStatus];
	if (!banStatus) return null;
	return Limitations[banStatus];
};

export const getRegulationRelease = (card: Card, regulation: Regulations) => {
	return card[attributesByReg[regulation].release];
};
