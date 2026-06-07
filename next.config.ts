import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	/* config options here */
	headers: async () => [
		{
			source: '/sw.js',
			headers: [
				{
					key: 'Cache-Control',
					value: 'public, max-age=0, must-revalidate',
				},
				{
					key: 'Service-Worker-Allowed',
					value: '/',
				},
			],
		},
	],
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
	output: 'standalone',
};

export default nextConfig;
