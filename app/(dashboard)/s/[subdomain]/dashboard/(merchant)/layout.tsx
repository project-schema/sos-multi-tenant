import { Loader9 } from '@/components/dashboard';
import { Suspense } from 'react';
import MerchantLayoutClient from './layout-client';

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<Suspense fallback={<Loader9 />}>
			<MerchantLayoutClient>{children}</MerchantLayoutClient>
		</Suspense>
	);
}
