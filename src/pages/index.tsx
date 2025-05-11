import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import Layout from '@/components/Layout';
import { GetStaticProps } from 'next';
import { StringObject } from '@/types/Ui';
import { randomizeDeck } from '@/business/deckRandomizer';
import Deck from '@/components/Card/Deck';
import Icon from '@/components/Icon';
import { Card as CardType } from '@/types/Card';
import { Deck as DeckType } from '@/types/Deck';
import { isExtraDeck } from '@/business/card';
import useDownloadYdk from '@/hooks/useDownloadYdk';

const defaultProps: Props = {
	cards: {},
	extraCards: [],
	mainCards: [],
	names: {},
	staples: [],
};
const defaultDeck: DeckType = { mainDeck: [], extraDeck: [] };

interface Props {
	cards: Record<string, CardType>;
	names: StringObject;
	mainCards: string[];
	extraCards: string[];
	staples: string[];
}
const PageLines: React.FC<Props> = ({ cards, names, mainCards, extraCards, staples }) => {
	const [deck, setDeck] = useState<DeckType>(defaultDeck);
	const { download } = useDownloadYdk(deck);
	const [loading, setLoading] = useState(false);

	const handleRandomize = async () => {
		setLoading(true);
		randomizeDeck(cards, mainCards, extraCards, names, staples).then(deck => {
			setDeck(deck);
			setLoading(false);
		});
	};

	const { mainDeck, extraDeck } = deck;
	return (
		<Layout
			noGoBack
			title="Deck Randomizer"
			metadescription="Get a randomized Yu-Gi-Oh deck with this tool."
		>
			<div className="d-flex gap-3">
				<Button
					size="lg"
					onClick={handleRandomize}
					variant={mainDeck.length > 0 ? 'outline-primary' : 'primary'}
				>
					<Icon
						name="arrow-counterclockwise me-2"
						className={loading ? 'spinning' : undefined}
					/>{' '}
					Randomize a deck
				</Button>
				{mainDeck.length > 0 && (
					<Button size="lg" onClick={download}>
						<Icon name="download me-2" /> Export
					</Button>
				)}
			</div>
			{/* TODO add a void deck section with a plus button */}
			{mainDeck.length > 0 && (
				<div className="mt-4">
					<Deck
						deck={mainDeck}
						title="Main Deck"
						/* handleAddCard={handleAddCard} */
					/>
				</div>
			)}
			{extraDeck.length > 0 && (
				<div className="mt-4">
					<Deck
						deck={extraDeck}
						title="Extra Deck"
						bottom
						max={15}
						/* handleAddCard={handleAddCard} */
					/>
				</div>
			)}
		</Layout>
	);
};

export const getStaticProps: GetStaticProps = async () => {
	try {
		const cards: Record<string, CardType> = require('../json/top.json');
		const mainCards: string[] = [];
		const extraCards: string[] = [];
		const names: StringObject = {};

		Object.values(cards).forEach(card => {
			names[card.name] = card._id;
			if (isExtraDeck(card)) {
				extraCards.push(card._id);
			} else {
				mainCards.push(card._id);
			}
		});

		const staples: string[] = require('../json/staples.json').map(
			(name: string) => names[name]
		);

		return { props: { cards, names, mainCards, extraCards, staples } };
	} catch (e) {
		console.error(e);
		return { props: { defaultProps } };
	}
};

export default PageLines;
