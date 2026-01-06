// lib/api.ts

import { env } from './env';

interface ApiError {
	message: string;
	status?: number;
	url: string;
	stack?: any;
}

export async function getApiData<T = any>(url: string): Promise<T | null> {
	try {
		const res = await fetch(env.baseAPI + '/api' + url, {
			cache: 'no-store',
			headers: {
				'Content-Type': 'application/json',
			},
		});

		if (!res.ok) {
			const error: ApiError = {
				message: `API Error ${res.status}: ${res.statusText}`,
				status: res.status,
				url,
			};
			throw error;
		}

		const data = await res.json();
		return data;
	} catch (error: any) {
		const structuredError: ApiError = {
			message: error?.message || 'Unexpected API Error',
			status: error?.status || undefined,
			url,
			stack: error?.stack,
		};

		console.error('API Error:', structuredError);

		return null;
	}
}

export async function getApiDataWithSubdomain<T = any>(
	url: string,
	subdomain: string
): Promise<T | null> {
	try {
		const base = new URL(env.baseAPI); // http://127.0.0.1:8000

		// Replace host with subdomain.localhost
		base.hostname = `${subdomain}.localhost`;

		console.log(`${base.origin}/api${url}`);

		const res = await fetch(
			`http://borax.localhost:8000/api/tenant-frontend/products`,
			{
				cache: 'no-store',
				headers: {
					'Content-Type': 'application/json',
					Host: `${subdomain}.localhost:8000`,
					'X-Tenant-Subdomain': subdomain,
				},
			}
		);

		if (!res.ok) {
			throw {
				message: `API Error ${res.status}: ${res.statusText}`,
				status: res.status,
				url,
			};
		}

		return await res.json();
	} catch (error: any) {
		console.error('API Error:', {
			message: error?.message || 'Unexpected API Error',
			status: error?.status,
			url,
			stack: error?.stack,
		});
		return null;
	}
}
