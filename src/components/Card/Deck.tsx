import React from 'react';
import { Card as CardType } from '@/types/Card';
import Card from './Card';

const Deck = ({
	deck,
	title = 'Deck',
	bottom = false,
}: {
	deck: CardType[];
	title?: string;
	bottom?: boolean;
}) => {
	return (
		<div className="card">
			<div className="card-header">
				<h2 className="card-title">{title}</h2>
			</div>
			<div className="d-flex flex-wrap gap-3 card-body">
				{deck.map(card => (
					<Card key={card._id} card={card} bottom={bottom} />
				))}
			</div>
		</div>
	);
};

export default Deck;
