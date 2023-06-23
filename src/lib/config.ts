// Vite will error if any env var is missing
const config = {
	ENV: import.meta.env.VITE_ENV,
	IS_SANDBOX: import.meta.env.VITE_ENV === "dev",
	IPFS_GATEWAY: import.meta.env.VITE_IPFS_GATEWAY,
	IPFS_CID: import.meta.env.VITE_IPFS_CID,
	SBOX_API_KEY: import.meta.env.VITE_STRING_SBOX_API_KEY,
	PROD_API_KEY: import.meta.env.VITE_STRING_PROD_API_KEY,
} as const;

export default config;