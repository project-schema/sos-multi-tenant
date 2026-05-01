import { DbHeader, Loader9 } from '@/components/dashboard';
import { SessionProvider } from '@/provider';
import { lazy, Suspense } from 'react';
const PageClient = lazy(() => import('./page.client'));

const breadcrumbItems = [
	{ name: 'Dashboard', path: '/dashboard' },
	{ name: 'Cart' },
];

export default async function Page({
	params,
}: {
	params: Promise<{ tenant_id: string; id: string }>;
}) {
	const { tenant_id, id } = await params;
	return (
		<Suspense fallback={<Loader9 />}>
			<SessionProvider>
				<DbHeader breadcrumb={breadcrumbItems} />
				<PageClient cartId={id} />
			</SessionProvider>
		</Suspense>
	);
}

export const metadata = {
	title: 'Cart',
};
