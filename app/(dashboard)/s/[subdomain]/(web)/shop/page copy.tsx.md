import ThemeOneShopPage from '@/components/theme/one/shop-page';
import ThemeThreeShopPage from '@/components/theme/three/shop-page';
import ThemeTwoShopPage from '@/components/theme/two/shop-page';
import { env, getApiDataWithSubdomain } from '@/lib';
import { iVendorProduct } from '@/store/features/vendor/product/vendor-product-type';

export default async function ShopPage({
	params,
}: {
	params: { subdomain: string };
}) {
	const { subdomain } = await params;
	console.log({ subdomain });
	try {
		const products = await getApiDataWithSubdomain<iVendorProduct[]>(
			`/tenant-frontend/products`,
			subdomain
		);
		console.log({ products });

		switch (env.theme) {
			case 'one':
				return <ThemeOneShopPage />;
			case 'two':
				return <ThemeTwoShopPage />;
			case 'three':
				return <ThemeThreeShopPage />;
			default:
				return <ThemeOneShopPage />;
		}
	} catch (error) {
		console.error('Error loading products:', error);
	}
}
