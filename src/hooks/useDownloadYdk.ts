import { deckToYdk } from '@/business/deckToYdk';
import { createFile, download } from '@/functions/file';
import { Deck } from '@/types/Deck';
import { useState } from 'react';

const useDownloadYdk = (deck: Deck) => {
	const [name, setName] = useState<string | undefined>();

	const downloadYdk = () => {
		const file = createFile(deckToYdk(deck), 'text/plain');
		download(file, (name || 'random_deck') + '.ydk');
	};

	return { download: downloadYdk, name, setName };
};

export default useDownloadYdk;
