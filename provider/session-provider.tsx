'use client';

import { Loader9 } from '@/components/dashboard';
import { useVendorProfileInfoQuery } from '@/store/features/vendor/profile';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const SessionProvider = ({ children }: { children: React.ReactNode }) => {
	const { data: session, status } = useSession();
	const { data, isLoading, isError } = useVendorProfileInfoQuery(undefined, {
		skip:
			session?.tenant_type !== 'merchant' &&
			session?.tenant_type !== 'dropshipper',
	});
	const router = useRouter();

	useEffect(() => {
		if (status === 'unauthenticated') {
			router.replace('/auth');
		}

		if (
			status === 'authenticated' &&
			data &&
			!data.usersubscription &&
			(session?.tenant_type === 'dropshipper' ||
				session?.tenant_type === 'merchant')
		) {
			router.replace('/dashboard/membership');
		}

		if (session?.user.role_type === 'tenant_user') {
			router.replace('/account');
		}
	}, [status, session, data, router]);

	if (status === 'loading' || isLoading) {
		return <Loader9 />;
	}

	return <>{children}</>;
};

export default SessionProvider;
