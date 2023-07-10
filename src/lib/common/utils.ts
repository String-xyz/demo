export const abbrev = (addr: string) => {
	return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
};

export const capitalize = (text: string) => {
	if (!text) return text;
	return text.charAt(0).toUpperCase() + text.toLowerCase().slice(1);
}