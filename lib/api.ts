// lib/api.ts

import { env } from './env';

export async function getApiData<T = any>(url: string): Promise<T | null> {
	try {
		const res = await fetch(env.baseAPI + '/api' + url, {
			cache: 'no-store',
			headers: {
				'Content-Type': 'application/json',
			},
		});

		if (!res.ok) {
			throw new Error(`API Error ${res.status}: ${res.statusText}`);
		}

		const data = await res.json();
		return data;
	} catch (error) {
		throw error;
	}
}
