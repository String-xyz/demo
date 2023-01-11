import type { NFT } from "./nfts";

const ENV = import.meta.env.VITE_ENV;

const IPFS_GATEWAY = import.meta.env.VITE_IPFS_GATEWAY

const IPFS_HASH = import.meta.env.VITE_IPFS_HASH

const STR_NFT_1 = `${IPFS_GATEWAY}${IPFS_HASH}/Demo_Character_1.png`

const COMMON_PROPS = {
	"price": 0.08,
	"description": "The String demo NFT. Get a different character each time.",
	"collection": "String Demo",
	"imageSrc": STR_NFT_1,
	"imageAlt": "String NFT"
}

const NFTS_PROD: NFT[] = [
	{
		"id": 1,
		"address": "0xea1ffe2cf6630a20e1ba397e95358daf362c8781",
		"chainID": 43113,
		"currency": "AVAX",
		"name": "String Test NFT [AVAX]",
		...COMMON_PROPS
	},
	{
		"id": 2,
		"address": "0x8e545d0FFA293F328f5A9D1b09c58158105aD13B",
		"chainID": 5,
		"currency": "ETH",
		"name": "String Test NFT [ETH]",
		...COMMON_PROPS
	},
	{
		"id": 3,
		"address": "0xf0F6D94757235a3d6347B366AeE76A3C84D21392",
		"chainID": 80001,
		"currency": "MATIC",
		"name": "String Test NFT [POLYGON]",
		...COMMON_PROPS
	}
];

const NFTS_DEV: NFT[] = [
	{
		"id": 1,
		"address": "0xea1ffe2cf6630a20e1ba397e95358daf362c8781",
		"chainID": 43113,
		"currency": "AVAX",
		"name": "String Test NFT [AVAX]",
		...COMMON_PROPS
	},
	{
		"id": 2,
		"address": "0x8e545d0FFA293F328f5A9D1b09c58158105aD13B",
		"chainID": 5,
		"currency": "ETH",
		"name": "String Test NFT [ETH]",
		...COMMON_PROPS
	},
	{
		"id": 3,
		"address": "0xf0F6D94757235a3d6347B366AeE76A3C84D21392",
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