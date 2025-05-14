import { Limitations } from '@/consts/limitations';
import { attributesByReg } from '@/consts/limitations';
import { Regulations } from '@/consts/limitations';
import { Card } from '@/types/Card';
import { mappedArchetype } from '../consts/archetypes';
import { strIncludeArrayValue } from '.';

export const isExtraDeck = (card: Card) =>
	card.type === 'Monster' &&
	(card.monsterType.includes('Link') ||
		card.monsterType.includes('Synchro') ||
		card.monsterType.includes('Fusion') ||
		card.monsterType.includes('Xyz'));

const matchArchetype = (card: Card, key: 'name' | 'description' = 'name') =>
	strIncludeArrayValue(card[key], mappedArchetype) ||
	strIncludeArrayValue(card[key], card.deckTypes);

export const getCardArchetype = (card: Card) => {
	// follow deck type order
	let deckType = matchArchetype(card, 'name');
	if (deckType) return deckType;
	deckType = matchArchetype(card, 'description');
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
