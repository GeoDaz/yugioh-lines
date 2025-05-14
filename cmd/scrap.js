const { wait, writeJson } = require('./lib');

async function fetchCards(page, limit = 100) {
	try {
		const res = await fetch(
			`https://www.masterduelmeta.com/api/v1/cards?cardSort=popRank&aggregate=search&page=${page}&limit=${limit}`
		);
		const data = await res.json();
		return data;
	} catch (err) {
		console.error(err);
		return [];
	}
}

async function run() {
	const dst = './src/json/cards.json';
	const limit = 1000;
	const cards = {};
	let page = 1;
	let currentLen = limit;
	do {
		const res = await fetchCards(page, limit);
		res.forEach(card => {
			if (!card.alternateArt) {
				cards[card._id] = card;
			}
		});
		currentLen = res.length;
		console.log(`Fetched page ${page}, ${currentLen} cards`);
		page++;
		await wait(1000);
	} while (currentLen === limit);

	writeJson(dst, cards);
}

run();
