import { Loader11, Loader9 } from '@/components/dashboard';
import { Footer03, Header03 } from '@/components/web';
import { ShopSearchParams } from '@/types/web-shop-page';
import { Suspense } from 'react';
import ThemeThreeShopSuspensePage from './shop-page-suspense';

export default function ThemeThreeShopPage({
	searchParams,
}: {
	searchParams: ShopSearchParams;
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
				<ThemeThreeShopSuspensePage searchParams={searchParams} />
			</Suspense>
			<Footer03 />
		</>
	);
}
