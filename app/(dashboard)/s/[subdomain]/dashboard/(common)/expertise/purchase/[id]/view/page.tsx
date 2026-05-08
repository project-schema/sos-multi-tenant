import { Loader9 } from '@/components/dashboard';
import { lazy, Suspense } from 'react';
const PageClient = lazy(() => import('./page-client'));

export default async function Page({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	return (
		<Suspense fallback={<Loader9 />}>
			<PageClient params={params} />
		</Suspense>
	);
}

export const metadata = {
	title: 'Purchase View',
};
