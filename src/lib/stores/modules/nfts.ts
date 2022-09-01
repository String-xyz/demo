import { ethers, type Contract } from "ethers";
import { writable, get as getStore, type Writable, type Readable } from "svelte/store";
import { currentAccount } from "$lib/stores";

const IPFS_GATEWAY = import.meta.env.VITE_IPFS_GATEWAY;
const contractABI = ['function getOwnedIDs(address owner) view returns (uint256[])', 'function tokenURI(uint256 tokenId) view returns (string)'];

interface ChainData {
	chainId: number;
	RPC_URL: string;
	explorer: string;
	provider?: ethers.providers.StaticJsonRpcProvider;
}

const networks: ChainData[] = [
	{
		chainId: 43113,
		RPC_URL: "https://api.avax-test.network/ext/bc/C/rpc",
		explorer: "https://testnet.snowtrace.io/tx/",
		provider: undefined
	},
	{
		chainId: 5,
		RPC_URL: "https://rpc.ankr.com/eth_goerli",
		explorer: "https://goerli.etherscan.io/tx/",
		provider: undefined
	},
	{
		chainId: 80001,
		RPC_URL: "https://matic-mumbai.chainstacklabs.com",
		explorer: "https://mumbai.polygonscan.com/tx/",
		provider: undefined
	}
]

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
	contract?: Contract;
}

export const nfts: NFT[] = [
	{
		id: 1,
		address: '0x41e11ff9f71f51800f67cb913ea6bc59d3f126aa',
		chainID: 43113,
		price: 0.08,
		txValue: (0.08 * 1e18).toString(),
		currency: 'AVAX',
		name: 'String Test NFT [AVAX]',
		description: 'The String logo demo NFT. Get a different color variation each time.',
		collection: 'String Demo',
		imageSrc: 'https://bafybeibtmy26mac47n5pp6srds76h74riqs76erw24p5yvdhmwu7pxlcx4.ipfs.nftstorage.link/STR_Logo_1.png',
		imageAlt: "String Logo"
	},
	{
		id: 2,
		address: '0x7535f48fc7a44531e9ef0593815140e6bdf9ef65',
		chainID: 5,
		price: 0.08,
		txValue: (0.08 * 1e18).toString(),
		currency: 'ETH',
		name: 'String Test NFT [ETH]',
		description: 'The String logo demo NFT. Get a different color variation each time.',
		collection: 'String Demo',
		imageSrc: 'https://bafybeibtmy26mac47n5pp6srds76h74riqs76erw24p5yvdhmwu7pxlcx4.ipfs.nftstorage.link/STR_Logo_1.png',
		imageAlt: "String Logo"
	},
	{
		id: 3,
		address: '0x41e60f5118785755b6337c94f301017c42baaa9c',
		chainID: 80001,
		price: 0.08,
		txValue: (0.08 * 1e18).toString(),
		currency: 'MATIC',
		name: 'String Test NFT [POLYGON]',
		description: 'The String logo demo NFT. Get a different color variation each time.',
		collection: 'String Demo',
		imageSrc: 'https://bafybeibtmy26mac47n5pp6srds76h74riqs76erw24p5yvdhmwu7pxlcx4.ipfs.nftstorage.link/STR_Logo_1.png',
		imageAlt: "String Logo",
	}
];

interface Collection {
	ownedID: number;
	ownedURL: string;
	nft: NFT;
}

export const collection: Writable<Collection[]> = writable();

export const getOwnedIDs = async () => {
	let _collection: Collection[] = [];

	let account = getStore(currentAccount)

	for (const nft of nfts) {
		let chainData = networks.find(data => data.chainId == nft.chainID);
		if (!chainData) return;

		if (!chainData.provider) {
			chainData.provider = new ethers.providers.StaticJsonRpcProvider(chainData.RPC_URL);
		}

		if (!nft.contract) {
			nft.contract = new ethers.Contract(nft.address, contractABI, chainData.provider);
		}

		let ids = (await nft.contract.getOwnedIDs(account)).map((id: any) => id.toNumber());

		for (const ownedID of ids) {
			let ownedURL = (await nft.contract.tokenURI(ownedID)).replace("ipfs://", IPFS_GATEWAY);
			_collection.push({ownedID, ownedURL, nft})
		}
	}
	collection.set(_collection);
}

export const getBlockExplorer = (chainId: number) => {
	return networks.find(data => data.chainId == chainId)?.explorer ?? networks[0].explorer;
};

export const byId = (id: number) => {
	return nfts.filter((item) => item.id === id).pop()!;
};
