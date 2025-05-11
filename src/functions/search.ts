import { StringObject } from '@/types/Ui';
import { stringToKey } from '.';
import Search from '@/types/Search';

export const getSearchPriority = (search: string, name: string): number | null => {
	name = stringToKey(name);
	search = stringToKey(search);
	let index =
		search.length > 3 ? name.indexOf(search) : name.startsWith(search) ? 0 : -1; // digimon string contains search string
	if (index === -1) return null;
	let priority: number = index * -1;
	priority -= Math.abs(name.length - search.length);
	return priority;
};