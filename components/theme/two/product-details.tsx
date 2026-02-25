import { Loader8 } from '@/components/dashboard';
import Footer02 from '@/components/web/footer/02';
import Header02 from '@/components/web/header/02';
import { Suspense } from 'react';
import ThemeTwoProductDetailsSuspense from './product-details-suspense';

export default async function ThemeTwoProductDetailsPage({
	params,
}: {
	params: { slug: string };
}) {
	return (
		<>
			<Header02 />
			<Suspense fallback={<Loader8 />}>
				<ThemeTwoProductDetailsSuspense params={params} />
			</Suspense>
			<Footer02 />
		</>
	);
}
