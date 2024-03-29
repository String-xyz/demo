import config from '$lib/config';
import type { NFT } from '$lib/common/types';

const IPFS_GATEWAY = config.IPFS_GATEWAY;
const IPFS_CID = config.IPFS_CID;

const getIpfsLink = (file: string) => {
	// nftstorage gateway
	if (IPFS_GATEWAY.startsWith('ipfs.')) {
		return `https://${IPFS_CID}.${IPFS_GATEWAY}/${file}`;
	} else {
		return `${IPFS_GATEWAY}${IPFS_CID}/${file}`;
	}
};

const COMMON_PROPS = {
	price: "0.08",
	description: 'The String demo NFT. Get a different character each time.',
	collection: 'String Demo',
	imageSrc: getIpfsLink('Demo_Character_1.png'),
	imageAlt: 'String NFT'
};

const NFT_DATA: NFT[] = [
	{
		id: 1,
		address: '0xea1ffe2cf6630a20e1ba397e95358daf362c8781',
		chainId: 43113,
		currency: 'AVAX',
		assetName: 'String Test NFT [AVAX]',
		...COMMON_PROPS
	},
	{
		id: 2,
		address: '0x8e545d0FFA293F328f5A9D1b09c58158105aD13B',
		chainId: 5,
		currency: 'ETH',
		assetName: 'String Test NFT [ETH]',
		...COMMON_PROPS
	},
	{
		id: 3,
		address: '0xf0F6D94757235a3d6347B366AeE76A3C84D21392',
		chainId: 80001,
		currency: 'MATIC',
		assetName: 'String Test NFT [POLYGON]',
		...COMMON_PROPS
	},
	{
		id: 4,
		address: '0xFFa8cc8530982A64Ef0E3e97554A4581b4Cd6314',
		chainId: 421613,
		currency: 'ETH',
		assetName: 'String Test NFT (ARBITRUM)',
		...COMMON_PROPS,
		price: "0",
	},
];

export const getNFTs = (): NFT[] => {
	return NFT_DATA;
};
