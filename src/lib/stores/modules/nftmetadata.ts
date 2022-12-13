import type { NFT } from "./nfts";

const ENV = import.meta.env.VITE_ENV;

const IPFS_GATEWAY = import.meta.env.VITE_IPFS_GATEWAY

const IPFS_HASH = import.meta.env.VITE_IPFS_HASH

const STR_LOGO_1 = `${IPFS_GATEWAY}${IPFS_HASH}/STR_Logo_1.png`

const COMMON_PROPS = {
	"price": 0.08,
	"description": "The String logo demo NFT. Get a different color variation each time.",
	"collection": "String Demo",
	"imageSrc": STR_LOGO_1,
	"imageAlt": "String Logo"
}

const NFTS_PROD: NFT[] = [
	{
		"id": 1,
		"address": "0x16a58B741fB1f645a9b7206C46dfA37478Feb5dC",
		"chainID": 43113,
		"currency": "AVAX",
		"name": "String Test NFT [AVAX]",
		...COMMON_PROPS
	},
	{
		"id": 2,
		"address": "0xAEc6940273327E560aaE2F53F9e6344ee0b5C72D",
		"chainID": 5,
		"currency": "ETH",
		"name": "String Test NFT [ETH]",
		...COMMON_PROPS
	},
	{
		"id": 3,
		"address": "0xd37E73f197EC78FD08833AEeaD6EddF105a3FB33",
		"chainID": 80001,
		"currency": "MATIC",
		"name": "String Test NFT [POLYGON]",
		...COMMON_PROPS
	}
];

const NFTS_DEV: NFT[] = [
	{
		"id": 1,
		"address": "0x41e11fF9F71f51800F67cb913eA6Bc59d3F126Aa",
		"chainID": 43113,
		"currency": "AVAX",
		"name": "String Test NFT [AVAX]",
		...COMMON_PROPS
	},
	{
		"id": 2,
		"address": "0x7535f48fC7A44531e9Ef0593815140E6bdF9EF65",
		"chainID": 5,
		"currency": "ETH",
		"name": "String Test NFT [ETH]",
		...COMMON_PROPS
	},
	{
		"id": 3,
		"address": "0x41E60F5118785755b6337c94F301017c42BaAA9C",
		"chainID": 80001,
		"currency": "MATIC",
		"name": "String Test NFT [POLYGON]",
		...COMMON_PROPS
	}
];

const NFT_DATA = ENV == "dev" ? NFTS_DEV : NFTS_PROD;

export const getNFTs = (): NFT[] => {
	return NFT_DATA;
}