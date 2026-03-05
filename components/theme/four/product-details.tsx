import { Loader8 } from '@/components/dashboard';
import Footer04 from '@/components/web/footer/04';
import Header04 from '@/components/web/header/04';
import { Suspense } from 'react';
import ThemeFourProductDetailsSuspensePage from './product-details-suspense';

export default async function ThemeFourProductDetailsPage({
	params,
}: {
	params: { slug: string };
}) {
	return (
		<>
			<Header04 />
			<Suspense fallback={<Loader8 />}>
				<ThemeFourProductDetailsSuspensePage params={params} />
			</Suspense>
			<Footer04 />
		</>
	);
}
