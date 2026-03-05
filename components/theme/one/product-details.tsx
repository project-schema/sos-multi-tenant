import { Loader8 } from '@/components/dashboard';
import Footer01 from '@/components/web/footer/01';
import Header01 from '@/components/web/header/01';
import { Suspense } from 'react';
import ThemeOneProductDetailsSuspensePage from './product-details-suspense';

export default async function ThemeOneProductDetailsPage({
	params,
}: {
	params: { slug: string };
}) {
	return (
		<>
			<Header01 />
			<Suspense fallback={<Loader8 />}>
				<ThemeOneProductDetailsSuspensePage params={params} />
			</Suspense>
			<Footer01 />
		</>
	);
}
