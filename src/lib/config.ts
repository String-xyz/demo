const config = {
	ENV: import.meta.env.VITE_ENV,
	USE_LOCAL: import.meta.env.VITE_STRING_USE_LOCAL === 'true',
	IPFS_GATEWAY: import.meta.env.VITE_IPFS_GATEWAY,
	IPFS_CID: import.meta.env.VITE_IPFS_CID,
	LOCAL_API_KEY: import.meta.env.VITE_STRING_LOCAL_API_KEY,
	SBOX_API_KEY: import.meta.env.VITE_STRING_SBOX_API_KEY,
	PROD_API_KEY: import.meta.env.VITE_STRING_PROD_API_KEY,
} as const;

export default config;