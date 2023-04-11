import type { Contract } from "ethers";

export interface NFT {
	id: number;
	address: string;
	chainID: number;
	price: number;
	currency: string;
	name: string;
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