import type { Contract } from 'ethers';

export interface NFT {
	id: number;
	address: string;
	chainId: number;
	price: number;
	currency: string;
	assetName: string;
	description: string;
	collection: string;
	imageSrc: string;
	imageAlt: string;
	contract?: Contract;
}

export interface CollectionData extends NFT {
	ownedID: number;
	ownedURL: string;
}
