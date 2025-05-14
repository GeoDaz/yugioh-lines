import { Legend, StringObject } from '@/types/Ui';

export const colors: StringObject = {
	default: '#888',
	summon: '#c7ab6f',
	spell: '#149789',
	trap: '#ab247b',
	effect: '#b6764f',
	fusion: '#833a90',
	ritual: '#7d9dcb',
	synchro: '#fff',
	xyz: '#000',
	link: '#136093',
	max: '#d86724',
};

export const legend: Legend[] = [
	{
		key: 'default',
		color: colors.default,
		text: 'Normal summon, set a spell / a trap',
	},
	{ key: 'summon', color: colors.summon, text: 'Special summon' },
	{ key: 'effect', color: colors.effect, text: 'Monster effect' },
	{
		key: 'spell',
		color: colors.spell,
		text: 'Spell effect',
	},
	{ key: 'trap', color: colors.trap, text: 'Trap effect' },
	{ key: 'fusion', color: colors.fusion, text: 'Fusion monsters' },
	{ key: 'ritual', color: colors.ritual, text: 'Ritual summon' },
	{ key: 'synchro', color: colors.synchro, text: 'Synchro summon' },
	{ key: 'xyz', color: colors.xyz, text: 'Xyz summon' },
	{ key: 'link', color: colors.link, text: 'Link summon' },
	{ key: 'max', color: colors.max, text: 'Maximum summon' },
];
export default colors;
