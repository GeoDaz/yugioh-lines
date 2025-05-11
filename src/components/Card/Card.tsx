import React from 'react';
import { Card as CardType } from '@/types/Card';
import Image from 'next/image';
import CardPopup from './CardPopup';

// width 260, height 379
const Card = ({
	card,
	width = 88,
	height = 128,
	bottom = false,
}: {
	card: CardType;
	width?: number;
	height?: number;
	bottom?: boolean;
}) => {
	return (
		<CardPopup card={card} placement={bottom ? 'top' : 'bottom'}>
			{(onMouseEnter, onMouseLeave) => (
				<a
					onMouseEnter={onMouseEnter}
					onMouseLeave={onMouseLeave}
					href={encodeURIComponent(
						`https://www.masterduelmeta.com/cards/${card.name}`
					)}
					target="_blank"
					rel="noopener noreferrer nofollow"
					title={card.name}
				>
					<Image
						src={`https://s3.duellinksmeta.com/cards/${card._id}_w260.webp`}
						alt={card.name}
						width={width}
						height={height}
					/>
				</a>
			)}
		</CardPopup>
	);
};

export default Card;
