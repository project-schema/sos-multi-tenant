import { BASE_URL } from '@/lib/env';
import { signOut } from 'next-auth/react';
import { toast } from 'sonner';

export const logout = async () => {
	try {
		const response: any = await signOut({
			redirect: false,
		});
		if (response) {
			toast.success('Logged out successfully');
		} else {
			toast.error('Error! Please Try Again');
		}
	} catch (error) {
		toast.error('Error! Please Try Again');
	}
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
