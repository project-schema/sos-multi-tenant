import { Loader11, Loader9 } from '@/components/dashboard';
import Footer04 from '@/components/web/footer/04';
import Header04 from '@/components/web/header/04';
import { ShopSearchParams } from '@/types/web-shop-page';
import { Suspense } from 'react';
import ThemeOneShopPageSuspense from './shop-page-suspense';

export default function ThemeFourShopPage({
	searchParams,
}: {
	searchParams: ShopSearchParams;
}) {
	return (
		<>
			<Header04 />

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
			<Footer04 />
		</>
	);
}
