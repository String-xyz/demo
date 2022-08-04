import { get } from '$lib/services/api';

export interface NFT {
	id: number;
	address: string;
	price: number;
	currency?: string;
	name: string;
	description: string;
	imageSrc: string;
	imageAlt: string;
}

export const nfts: NFT[] = [
	{
		id: 1,
		address: '0x861af9ed4fee884e5c49e9ce444359fe3631418b',
		price: 0.08,
		name: 'String Test NFT',
		description: 'String Test NFT',
		imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
		imageAlt: "Front of men's Basic Tee in black."
	}
];

export const byId = (id: number) => {
	return nfts.filter((item) => item.id === id).pop();
};
