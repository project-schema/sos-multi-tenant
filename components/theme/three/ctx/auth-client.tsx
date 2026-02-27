'use client';

import { Loader9 } from '@/components/dashboard';
import { Logo } from '@/components/web/header/_ctx/logo';
import { env } from '@/lib';
import MotionFadeIn from '@/store/features/auth/MotionFadeIn';
import { TenantAndUserLogin } from '@/store/features/auth/tenants-and-user-login';
import { TenantUserRegistration } from '@/store/features/auth/tenants-user-registration';
import { iTenantFrontend } from '@/types/tenant-frontend';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function AuthClient({
	settings,
}: {
	settings: iTenantFrontend | null;
}) {
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
		<main className="max-w-full bg-primary3/10 min-h-svh flex flex-col items-center justify-center">
			<section className="max-w-[1450px] px-5 mx-auto h-full">
				<MotionFadeIn>
					<div className="grid grid-cols-1 md:grid-cols-2 items-center justify-center bg-white rounded-xl">
						<div className="hidden md:block   h-full w-full">
							<Image
								src={env.placeholderImage}
								width={1000}
								height={1000}
								alt="Image"
								className="w-full h-full object-cover rounded-l-xl"
							/>
						</div>
						<div className="px-10 lg:px-20 py-10   w-full">
							<div className="mb-8">
								<Logo logo={settings?.cms?.logo ?? ''} className="mx-auto " />
							</div>
							<div>
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
						</div>
					</div>
				</MotionFadeIn>
			</section>
		</main>
	);
}
