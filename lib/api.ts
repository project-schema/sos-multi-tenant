'use server';

// lib/api.ts
import { headers } from 'next/headers';
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
	url: string
): Promise<T | null> {
	try {
		const h = await headers();
		const subdomain = h.get('x-tenant-subdomain');

		if (!subdomain) {
			throw new Error('Tenant subdomain not found');
		}

		const apiDomain = env.baseAPI.replace(/^https?:\/\//, '');
		const isLocalhost = env.baseAPI.includes('localhost');

		const apiUrl = !isLocalhost
			? `https://${subdomain}.${apiDomain}/api${url}`
			: `http://${subdomain}.localhost:8000/api${url}`;
		console.log({ apiUrl });

		const res = await fetch(apiUrl, {
			cache: 'no-store',
			headers: {
				'Content-Type': 'application/json',
			},
		});

		if (!res.ok) {
			throw {
				message: `API Error ${res.status}: ${res.statusText}`,
				status: res.status,
				url: apiUrl,
			};
		}

		return (await res.json()) as T;
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
