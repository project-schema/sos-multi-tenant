import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	/* config options here */
	images: {
		domains: [process.env.NEXT_PUBLIC_CONFIG as string],
	},
};

export default nextConfig;
