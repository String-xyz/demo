import { get as getStore } from "svelte/store";
import { signerAddress } from "svelte-ethers-store";
import { ethers, type BigNumber } from "ethers";

import type { CollectionData, NFT } from "$lib/common/types";
import { getNFTs } from "$lib/consts";

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

const getIpfsLink = (tokenURI: string) => {
	// nftstorage gateway
	if (IPFS_GATEWAY.startsWith("ipfs.")) {
		tokenURI = tokenURI.replace("ipfs://", '');
		// CID / file name
		const parts = tokenURI.split("/");

		return `https://${parts[0]}.${IPFS_GATEWAY}/${parts[1]}`;
	} else {
		return tokenURI.replace("ipfs://", IPFS_GATEWAY);
	}
}

export const nfts: NFT[] = getNFTs();

export const getCollection = async (): Promise<CollectionData[]> => {
	const _collection: CollectionData[] = [];

	const account = getStore(signerAddress);

	for (const nft of nfts) {
		const chainData = networks.find(data => data.chainId == nft.chainID);
		if (!chainData) return _collection;

		if (!chainData.provider) {
			chainData.provider = new ethers.providers.StaticJsonRpcProvider(chainData.RPC_URL);
		}

		if (!nft.contract) {
			nft.contract = new ethers.Contract(nft.address, contractABI, chainData.provider);
		}

		const ids = (await nft.contract.getOwnedIDs(account)).map((id: BigNumber) => id.toString());

		for (const ownedID of ids) {
			const tokenURI = await nft.contract.tokenURI(ownedID);
			const ownedURL = getIpfsLink(tokenURI);

			_collection.push({ ownedID, ownedURL, ...nft });
		}
	}
	
	return _collection;
}

export const getNFTById = (id: number) => {
	return nfts.filter((item) => item.id === id).pop();
};