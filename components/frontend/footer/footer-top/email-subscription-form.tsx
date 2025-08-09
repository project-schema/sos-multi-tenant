'use client';

import { useFrontendEmailSubscribeMutation } from '@/store/features/frontend';
import { useState } from 'react';
import { toast } from 'sonner';
import style from './footerTop.style.module.css';

export default function EmailSubscriptionForm() {
	const [email, setEmail] = useState('');
	const [store, { isLoading }] = useFrontendEmailSubscribeMutation();

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		// Basic email validation
		if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
			toast.error('Please enter a valid email address');
			return;
		}

		try {
			const res = await store({ email }).unwrap();

			if (res.data === 'success') {
				toast.success(res.message || 'You have subscribed successfully!');
				setEmail(''); // Clear input after success
			} else {
				toast.error(res.message || 'Subscription failed');
			}
		} catch (err: any) {
			toast.error(err?.message || 'Something went wrong');
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<div className={style.inputWrap}>
				<input
					className={style.email}
					type="email"
					placeholder="Enter your email"
					name="email"
					id="email_"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					disabled={isLoading}
				/>
				<button
					className={style.subBtn}
					type="submit"
					disabled={isLoading || !email}
				>
					{isLoading ? 'Subscribing...' : 'Subscribe'}
				</button>
			</div>
		</form>
	);
}
