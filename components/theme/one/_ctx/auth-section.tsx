'use client';

import { Loader9 } from '@/components/dashboard';
import MotionFadeIn from '@/store/features/auth/MotionFadeIn';
import { TenantAndUserLogin } from '@/store/features/auth/tenants-and-user-login';
import { TenantUserRegistration } from '@/store/features/auth/tenants-user-registration';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function AuthSection() {
	const [mode, setMode] = useState<'login' | 'register'>('login');
	const searchParams = useSearchParams();
	const tab = searchParams.get('tab');
	const { data: session, status } = useSession();

	useEffect(() => {
		if (tab) {
			setMode(tab as 'login' | 'register');
		} else {
			setMode('login');
		}
	}, [tab]);

	if (status === 'loading') {
		return <Loader9 />;
	}

	return (
		<>
			<section className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14 2xl:py-24">
				<MotionFadeIn className="flex flex-col justify-center items-center">
					<div className="border rounded-xl p-6 md:p-8 max-w-xl w-full ">
						<div>
							<h2 className="text-2xl font-semibold mb-2">
								{mode === 'login' ? 'Welcome' : 'Account Register'}
							</h2>
							<p className="mb-6">
								Enter your details below to sign in into your account.
							</p>

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
											className="text-orange-500 font-semibold"
										>
											Register Now
										</Link>
									</p>
								) : (
									<p>
										Already Have an Account?{' '}
										<Link
											className="text-orange-500 font-semibold"
											href="/auth?tab=login"
										>
											Login
										</Link>
									</p>
								)}
							</div>
						</div>
					</div>
				</MotionFadeIn>
			</section>
		</>
	);
}
