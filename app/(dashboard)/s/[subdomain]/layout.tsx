'use client';

import { Loader9 } from '@/components/dashboard';
import { AffiliateSidebar } from '@/components/dashboard/sidebar/affiliate-sidebar';
import { VendorSidebar } from '@/components/dashboard/sidebar/vendor-sidebar';
import { useSession } from 'next-auth/react';

export default function Layout({ children }: { children: React.ReactNode }) {
	const { data: session, status } = useSession();
	if (status === 'loading') {
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
