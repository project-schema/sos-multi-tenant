'use client';

import { Loader9 } from '@/components/dashboard';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const SessionProvider = ({ children }: { children: React.ReactNode }) => {
	const { data: session, status } = useSession();
	const router = useRouter();

	useEffect(() => {
		if (status === 'unauthenticated') {
			router.replace('/auth');
		}

		if (
			status === 'authenticated' &&
			!session?.user?.usersubscription &&
			(session?.tenant_type === 'dropshipper' ||
				session?.tenant_type === 'merchant')
		) {
			router.replace('/dashboard/membership');
		}
	}, [status, session, router]);

	if (status === 'loading') {
		return <Loader9 />;
	}

	return <>{children}</>;
};

export default SessionProvider;
