module.exports = {
	reactStrictMode: true,
	async redirects() {
		const site = 'https://digimon-lines.com';
		return [
			{ source: '/build', destination: `${site}/build/yugioh`, permanent: true },
			{ source: '/build/:path*', destination: `${site}/build/yugioh`, permanent: true },
			{ source: '/', destination: `${site}/yugioh/randomizer`, permanent: true },
			{ source: '/:path*', destination: `${site}/yugioh/randomizer`, permanent: true },
		];
	},
	webpack: config => {
		config.resolve.fallback = { fs: false };
		return config;
	},
	images: {
		unoptimized: true,
	},
};
