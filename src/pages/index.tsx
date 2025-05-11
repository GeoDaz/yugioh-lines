import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import Layout from '@/components/Layout';
import { GetStaticProps } from 'next';
import { StringObject } from '@/types/Ui';
import { randomizeDeck } from '@/business/deckRandomizer';
import { Card } from '@/types/Card';
import Deck from '@/components/Card/Deck';
import { isExtraDeck } from '@/business/card';

const defaultData = { cards: {}, extraCards: [], mainCards: [], names: {}, staples: [] };

interface Props {
	cards: Record<string, Card>;
	names: StringObject;
	mainCards: string[];
	extraCards: string[];
	staples: string[];
}
const PageLines: React.FC<Props> = ({ cards, names, mainCards, extraCards, staples }) => {
	const [deck, setDeck] = useState<Card[]>([]);
	const [extraDeck, setExtraDeck] = useState<Card[]>([]);

	const handleRandomize = () => {
		const { deck, extraDeck } = randomizeDeck(
			cards,
			mainCards,
			extraCards,
			names,
			staples
		);
		setDeck(deck);
		setExtraDeck(extraDeck);
	};

	return (
		<Layout
			noGoBack
			title="Deck Randomizer"
			metadescription="Get a randomized Yu-Gi-Oh deck with this tool."
		>
			<div>
				<Button size="lg" onClick={handleRandomize}>
					Randomize a deck
				</Button>
			</div>
			{deck.length > 0 && (
				<div className="mt-4">
					<Deck deck={deck} title="Main Deck" />
				</div>
			)}
			{extraDeck.length > 0 && (
				<div className="mt-4">
					<Deck deck={extraDeck} title="Extra Deck" bottom />
				</div>
			)}
		</Layout>
	);
};

export const getStaticProps: GetStaticProps = async () => {
	try {
		const cards: Record<string, Card> = require('../json/top1000.json');
		const mainCards: string[] = [];
		const extraCards: string[] = [];
		const names: StringObject = {};
		const staples: string[] = require('../json/staples.json');

		Object.values(cards).forEach(card => {
			names[card.name] = card._id;
			if (isExtraDeck(card)) {
				extraCards.push(card._id);
			} else {
				mainCards.push(card._id);
			}
		});

		return { props: { cards, names, mainCards, extraCards, staples } };
	} catch (e) {
		console.error(e);
		return { props: { defaultData } };
	}
};

export default PageLines;
