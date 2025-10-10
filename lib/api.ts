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

		return null;
	}
}
