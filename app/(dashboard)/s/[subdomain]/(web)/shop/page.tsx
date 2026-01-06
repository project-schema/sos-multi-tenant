'use client';
import ThemeOneShopPage from '@/components/theme/one/shop-page';
import ThemeThreeShopPage from '@/components/theme/three/shop-page';
import ThemeTwoShopPage from '@/components/theme/two/shop-page';
import { env } from '@/lib';
import { useTenantFrontendProductsQuery } from '@/store/features/frontend/product/api-slice';

export default function ShopPage() {
	const { data: products } = useTenantFrontendProductsQuery(undefined);

	switch (env.theme) {
		case 'one':
			return <ThemeOneShopPage data={products} />;
		case 'two':
			return <ThemeTwoShopPage data={products} />;
		case 'three':
			return <ThemeThreeShopPage />;
		default:
			return <ThemeOneShopPage />;
	}
}
