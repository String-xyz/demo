import type { NFT } from "./nfts";

const ENV = import.meta.env.VITE_ENV;

const IPFS_GATEWAY = import.meta.env.VITE_IPFS_GATEWAY

const IPFS_HASH = import.meta.env.VITE_IPFS_HASH

const NFTS_PROD: NFT[] = [
	{
		"id": 1,
		"address": "0x41e11ff9f71f51800f67cb913ea6bc59d3f126aa",
		"chainID": 43113,
		"price": 0.08,
		"currency": "AVAX",
		"name": "String Test NFT [AVAX]",
		"description": "The String logo demo NFT. Get a different color variation each time.",
		"collection": "String Demo",
		"imageSrc": `${IPFS_GATEWAY}${IPFS_HASH}/STR_Logo_1.png`,
		"imageAlt": "String Logo"
	},
	{
		"id": 2,
		"address": "0x7535f48fc7a44531e9ef0593815140e6bdf9ef65",
		"chainID": 5,
		"price": 0.08,
		"currency": "ETH",
		"name": "String Test NFT [ETH]",
		"description": "The String logo demo NFT. Get a different color variation each time.",
		"collection": "String Demo",
		"imageSrc": `${IPFS_GATEWAY}${IPFS_HASH}/STR_Logo_1.png`,
		"imageAlt": "String Logo"
	},
	{
		"id": 3,
		"address": "0x41e60f5118785755b6337c94f301017c42baaa9c",
		"chainID": 80001,
		"price": 0.08,
		"currency": "MATIC",
		"name": "String Test NFT [POLYGON]",
		"description": "The String logo demo NFT. Get a different color variation each time.",
		"collection": "String Demo",
		"imageSrc": `${IPFS_GATEWAY}${IPFS_HASH}/STR_Logo_1.png`,
		"imageAlt": "String Logo"
	}
];

const NFTS_DEV: NFT[] = [
	{
		"id": 1,
		"address": "0x41e11ff9f71f51800f67cb913ea6bc59d3f126aa",
		"chainID": 43113,
		"price": 0.08,
		"currency": "AVAX",
		"name": "String Test NFT [AVAX]",
		"description": "The String logo demo NFT. Get a different color variation each time.",
		"collection": "String Demo",
		"imageSrc": `${IPFS_GATEWAY}${IPFS_HASH}/STR_Logo_1.png`,
		"imageAlt": "String Logo"
	},
	{
		"id": 2,
		"address": "0x7535f48fc7a44531e9ef0593815140e6bdf9ef65",
		"chainID": 5,
		"price": 0.08,
		"currency": "ETH",
		"name": "String Test NFT [ETH]",
		"description": "The String logo demo NFT. Get a different color variation each time.",
		"collection": "String Demo",
		"imageSrc": `${IPFS_GATEWAY}${IPFS_HASH}/STR_Logo_1.png`,
		"imageAlt": "String Logo"
	},
	{
		"id": 3,
		"address": "0x41e60f5118785755b6337c94f301017c42baaa9c",
		"chainID": 80001,
		"price": 0.08,
		"currency": "MATIC",
		"name": "String Test NFT [POLYGON]",
		"description": "The String logo demo NFT. Get a different color variation each time.",
		"collection": "String Demo",
		"imageSrc": `${IPFS_GATEWAY}${IPFS_HASH}/STR_Logo_1.png`,
		"imageAlt": "String Logo"
	}
];

const NFT_DATA = ENV == "dev" ? NFTS_DEV : NFTS_PROD;

export const getNFTs = (): NFT[] => {
	return NFT_DATA;
}