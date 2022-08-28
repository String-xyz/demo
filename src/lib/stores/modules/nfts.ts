export interface NFT {
	id: number;
	address: string;
	chainID: number;
	price: number;
	txValue: string;
	currency: string;
	name: string;
	description: string;
	collection: string;
	imageSrc: string;
	imageAlt: string;
}

export const nfts: NFT[] = [
	{
		id: 1,
		address: '0x7afd34147eF72d0339bf39B6C061E66A4fE6ba1D',
		chainID: 43113,
		price: 0.08,
		txValue: (0.08 * 1e18).toString(),
		currency: 'AVAX',
		name: 'String Test NFT [Fuji]',
		description: 'The String logo demo NFT. Get a different color variation each time.',
		collection: 'String Demo',
		imageSrc: 'https://bafybeibtmy26mac47n5pp6srds76h74riqs76erw24p5yvdhmwu7pxlcx4.ipfs.nftstorage.link/STR_Logo_1.png',
		imageAlt: "String Logo"
	},
	{
		id: 2,
		address: '0xFFa8cc8530982A64Ef0E3e97554A4581b4Cd6314',
		chainID: 5,
		price: 0.08,
		txValue: (0.08 * 1e18).toString(),
		currency: 'ETH',
		name: 'String Test NFT [Goerli]',
		description: 'The String logo demo NFT. Get a different color variation each time.',
		collection: 'String Demo',
		imageSrc: 'https://bafybeibtmy26mac47n5pp6srds76h74riqs76erw24p5yvdhmwu7pxlcx4.ipfs.nftstorage.link/STR_Logo_1.png',
		imageAlt: "String Logo"
	},
	{
		id: 3,
		address: '0xFFa8cc8530982A64Ef0E3e97554A4581b4Cd6314',
		chainID: 80001,
		price: 0.08,
		txValue: (0.08 * 1e18).toString(),
		currency: 'MATIC',
		name: 'String Test NFT [Mumbai]',
		description: 'The String logo demo NFT. Get a different color variation each time.',
		collection: 'String Demo',
		imageSrc: 'https://bafybeibtmy26mac47n5pp6srds76h74riqs76erw24p5yvdhmwu7pxlcx4.ipfs.nftstorage.link/STR_Logo_1.png',
		imageAlt: "String Logo"
	}
];

export const getBlockExplorer = (chainID: number) => {
	switch (chainID) {
		case 43113:
			return "https://testnet.snowtrace.io/tx/";
		case 5:
			return "https://goerli.etherscan.io/tx/";
		case 80001:
			return "https://mumbai.polygonscan.com/tx/";
		default:
			return "https://testnet.snowtrace.io/tx/";
	}
};

export const byId = (id: number) => {
	return nfts.filter((item) => item.id === id).pop()!;
};
