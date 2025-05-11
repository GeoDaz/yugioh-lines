export interface Card {
	_id: string;
	monsterType: string[];
	popRank: number;
	name: string;
	konamiID?: string;
	type: string;
	level?: number;
	race?: string;
	attribute?: string;
	atk?: number;
	def?: number;
	description: string;
	__v: number;
	linkArrows: string[];
	handtrap: boolean;
	deckTypes: string[];
	obtain: {
		source: {
			_id: string;
			type: string;
			name: string;
		};
		amount: number;
		type: string;
	}[];
	rarity?: string;
	release?: string;
	ocgRelease?: string;
	tcgRelease?: string;
	tcgBanStatus?: string;
	gameId?: string;
	alternateArt: boolean;
	ocgBanStatus?: string;
	banStatus?: string;
	mostUsedDeckTypes: string[];
	required?: boolean;
}
