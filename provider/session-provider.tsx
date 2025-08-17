'use client';

import { Loader9 } from '@/components/dashboard';
import { useSession } from 'next-auth/react';
import { notFound, redirect } from 'next/navigation';

const SessionProvider = ({ children }: { children: React.ReactNode }) => {
	const { data: session, status } = useSession();
	if (status === 'loading') {
		return <Loader9 />;
	}

	if (status === 'unauthenticated') {
		return redirect('/auth');
	}

	if (session) {
		return children;
	} else {
		return notFound();
	}
};

export default SessionProvider;
