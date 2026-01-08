'use client';

import { Loader9 } from '@/components/dashboard/loader';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

export const AccountProvider = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	const { data: session, status } = useSession();
	if (status === 'loading') {
		return <Loader9 />;
	}

	if (status === 'unauthenticated') {
		return redirect('/auth');
	}

	if (session?.user?.roleType === 'tenant_user') {
		return children;
	}
	return <>{children}</>;
};
