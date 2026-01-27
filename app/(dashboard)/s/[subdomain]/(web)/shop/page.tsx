import ThemeOneShopPage from '@/components/theme/one/shop-page';
import ThemeThreeShopPage from '@/components/theme/three/shop-page';
import ThemeTwoShopPage from '@/components/theme/two/shop-page';
import { env, getApiDataWithSubdomain } from '@/lib';
import { iVendorProduct } from '@/store/features/vendor/product/vendor-product-type';
import { iPagination } from '@/types';
import { notFound } from 'next/navigation';

export default async function ShopPage() {
	const products =
		await getApiDataWithSubdomain<iPagination<iVendorProduct> | null>(
			`/tenant-frontend/products`
		);

	if (!products) {
		return notFound();
	}

	switch (env.theme) {
		case 'one':
			return <ThemeOneShopPage data={products} />;
		case 'two':
			return <ThemeTwoShopPage data={products} />;
		case 'three':
			return <ThemeThreeShopPage data={products} />;
		default:
			return <ThemeOneShopPage data={products} />;
	}
}
