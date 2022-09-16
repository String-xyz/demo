import { ethers, type Contract } from "ethers";
import { writable, get as getStore, type Writable } from "svelte/store";
import { currentAccount } from "$lib/stores";
import { getNFTs } from "./nftmetadata"

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
	currency: string;
	name: string;
	description: string;
	collection: string;
	imageSrc: string;
	imageAlt: string;
	contract?: Contract;
}

export const nfts: NFT[] = getNFTs();

interface Collection {
	ownedID: number;
	ownedURL: string;
	nft: NFT;
}

export const collection: Writable<Collection[]> = writable();

export const getOwnedIDs = async () => {
	let _collection: Collection[] = [];

	let account = getStore(currentAccount);

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
			_collection.push({ownedID, ownedURL, nft});
		}
	}
	collection.set(_collection);
}

export const getBlockExplorer = (chainId: number) => {
	return networks.find(data => data.chainId == chainId)?.explorer ?? networks[0].explorer;
};

export const byId = (id: number) => {
	return nfts?.filter((item) => item.id === id).pop()!;
};
