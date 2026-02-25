import { Loader11, Loader9 } from '@/components/dashboard';
import Footer01 from '@/components/web/footer/01';
import Header01 from '@/components/web/header/01';
import { ShopSearchParams } from '@/types/web-shop-page';
import { Suspense } from 'react';
import ThemeOneShopPageSuspense from './shop-page-suspense';

export default function ThemeOneShopPage({
	searchParams,
}: {
	searchParams: ShopSearchParams;
}) {
	return (
		<>
			<Header01 />

			<Suspense
				fallback={
					<>
						<Loader11 />
						<Loader9 />
					</>
				}
			>
				<ThemeOneShopPageSuspense searchParams={searchParams} />
			</Suspense>
			<Footer01 />
		</>
	);
}
