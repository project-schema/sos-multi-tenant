'use client';

import { Loader9 } from '@/components/dashboard';
import { AffiliateSidebar } from '@/components/dashboard/sidebar/affiliate-sidebar';
import { VendorSidebar } from '@/components/dashboard/sidebar/vendor-sidebar';
import { useSession } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
	const { data: session, status } = useSession();
	const router = useRouter();
	const pathname = usePathname();

	useEffect(() => {
		// Redirect to auth page if not authenticated (skip if already on auth page)
		if (status === 'unauthenticated' && !pathname.includes('/auth')) {
			router.push('/auth');
		}
	}, [status, pathname, router]);

	if (status === 'loading') {
		return <Loader9 />;
	}

	// If not authenticated and not on auth page, show loading while redirecting
	if (!session && !pathname.includes('/auth')) {
		return <Loader9 />;
	}

	if (session?.tenant_type === 'merchant') {
		return <VendorSidebar>{children}</VendorSidebar>;
	}

	if (session?.tenant_type === 'dropshipper') {
		return <AffiliateSidebar>{children}</AffiliateSidebar>;
	}

	return children;
}
