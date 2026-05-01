import { DbHeader, Loader9 } from '@/components/dashboard';
import { SessionProvider } from '@/provider';
import { lazy, Suspense } from 'react';
const PageClient = lazy(() => import('./page.client'));

const breadcrumbItems = [
	{ name: 'Dashboard', path: '/dashboard' },
	{ name: 'Cart' },
];

export default function Page() {
	return (
		<Suspense fallback={<Loader9 />}>
			<SessionProvider>
				<DbHeader breadcrumb={breadcrumbItems} />
				<PageClient />
			</SessionProvider>
		</Suspense>
	);
}

export const metadata = {
	title: 'Cart',
};
