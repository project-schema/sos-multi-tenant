import { Loader11, Loader9 } from '@/components/dashboard';
import { Footer03, Header03 } from '@/components/web';
import { Suspense } from 'react';
import ThemeThreeProductDetailsSuspensePage from './product-details-suspense';

export default async function ThemeThreeProductDetailsPage({
	params,
}: {
	params: { slug: string };
}) {
	return (
		<>
			<Header03 />
			<Suspense
				fallback={
					<>
						<Loader11 />
						<Loader9 />
					</>
				}
			>
				<ThemeThreeProductDetailsSuspensePage params={params} />
			</Suspense>
			<Footer03 />
		</>
	);
}
