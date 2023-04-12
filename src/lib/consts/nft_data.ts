import type { NFT } from '$lib/common/types';

const IPFS_GATEWAY = import.meta.env.VITE_IPFS_GATEWAY;

const IPFS_CID = import.meta.env.VITE_IPFS_CID;

const getIpfsLink = (file: string) => {
	// nftstorage gateway
	if (IPFS_GATEWAY.startsWith('ipfs.')) {
		return `https://${IPFS_CID}.${IPFS_GATEWAY}/${file}`;
	} else {
		return `${IPFS_GATEWAY}${IPFS_CID}/${file}`;
	}
};

const COMMON_PROPS = {
	price: 0.08,
	description: 'The String demo NFT. Get a different character each time.',
	collection: 'String Demo',
	imageSrc: getIpfsLink('Demo_Character_1.png'),
	imageAlt: 'String NFT'
};

const NFT_DATA: NFT[] = [
	{
		id: 1,
		address: '0xea1ffe2cf6630a20e1ba397e95358daf362c8781',
		chainID: 43113,
		currency: 'AVAX',
		name: 'String Test NFT [AVAX]',
		...COMMON_PROPS
	},
	{
		id: 2,
		address: '0x8e545d0FFA293F328f5A9D1b09c58158105aD13B',
		chainID: 5,
		currency: 'ETH',
		name: 'String Test NFT [ETH]',
		...COMMON_PROPS
	},
	{
		id: 3,
		address: '0xf0F6D94757235a3d6347B366AeE76A3C84D21392',
		chainID: 80001,
		currency: 'MATIC',
		name: 'String Test NFT [POLYGON]',
		...COMMON_PROPS
	}
];

export const getNFTs = (): NFT[] => {
	return NFT_DATA;
};
