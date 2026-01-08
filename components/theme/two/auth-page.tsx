'use client';

import Footer01 from '@/components/web/footer/01';
import Header02 from '@/components/web/header/02';
import { TenantAndUserLogin } from '@/store/features/auth/tenants-and-user-login';
import { TenantUserRegistration } from '@/store/features/auth/tenants-user-registration';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function ThemeTwoAuthPage() {
	const [mode, setMode] = useState<'login' | 'register'>('login');
	const searchParams = useSearchParams();
	const tab = searchParams.get('tab');

	useEffect(() => {
		if (tab) {
			setMode(tab as 'login' | 'register');
		} else {
			setMode('login');
		}
	}, [tab]);

	return (
		<>
			<Header02 />
			<section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
				<h1 className="text-3xl font-bold mb-6 capitalize">{mode}</h1>
				<div className="border rounded-xl p-6 md:p-8 bg-white">
					<h2 className="text-2xl font-semibold mb-6">
						{mode === 'login' ? 'Welcome' : 'Account Register'}
					</h2>

					{mode === 'login' ? (
						<TenantAndUserLogin />
					) : (
						<TenantUserRegistration />
					)}

					<div className="mt-6 text-sm text-gray-600">
						{mode === 'login' ? (
							<p>
								Don't have an account?{' '}
								<Link
									href="/auth?tab=register"
									className="text-black font-semibold"
								>
									Register Now
								</Link>
							</p>
						) : (
							<p>
								Already Have an Account?{' '}
								<Link
									className="text-black font-semibold"
									href="/auth?tab=login"
								>
									Login
								</Link>
							</p>
						)}
					</div>
				</div>
			</section>
			<Footer01 />
		</>
	);
}
