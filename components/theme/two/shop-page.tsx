import { Loader11, Loader9 } from '@/components/dashboard';
import { Footer02 } from '@/components/web';
import Header02 from '@/components/web/header/02';
import { ShopSearchParams } from '@/types/web-shop-page';
import { Suspense } from 'react';
import ThemeTwoShopPageSuspense from './shop-page-suspense';

export default function ThemeTwoShopPage({
	searchParams,
}: {
	searchParams: ShopSearchParams;
}) {
	return (
		<>
			<Header02 />
			<Suspense
				fallback={
					<>
						<Loader11 />
						<Loader9 />
					</>
				}
			>
				<ThemeTwoShopPageSuspense searchParams={searchParams} />
			</Suspense>
			<Footer02 />
		</>
	);
}
