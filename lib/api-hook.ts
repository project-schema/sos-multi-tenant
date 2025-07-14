import { BASE_URL } from '@/lib/env';
import { signOut } from 'next-auth/react';

export const logout = async () => {
	try {
		await signOut({
			redirect: false,
		});
	} catch (error) {}
};

export const post = async (api: string, data: any) => {
	const res = await fetch(BASE_URL + '/api' + api, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	});
	return await res.json();
};
