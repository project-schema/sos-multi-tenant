import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	/* config options here */
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: '**',
				port: '',
				pathname: '/**',
			},
			{
				protocol: 'https',
				hostname: 'i.ibb.co.com',
				port: '',
				pathname: '/**',
			},
			{
				protocol: 'http',
				hostname: '**',
				port: '',
				pathname: '/**',
			},

			{
				protocol: 'http',
				hostname: '127.0.0.1',
				port: '8000',
				pathname: '/**',
			},
			{
				protocol: 'http',
				hostname: 'localhost',
				port: '8000',
				pathname: '/**',
			},
		],
	},
};

export default nextConfig;
