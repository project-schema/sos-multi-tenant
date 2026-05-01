import { Loader9 } from '@/components/dashboard';
import { lazy, Suspense } from 'react';
const PageClient = lazy(() => import('./page-client'));

export default function Page() {
	return (
		<Suspense fallback={<Loader9 />}>
			<PageClient />
		</Suspense>
	);
}

export const metadata = {
	title: 'Purchase Return view',
};
