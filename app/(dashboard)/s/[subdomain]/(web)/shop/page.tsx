import ThemeOneShopPage from '@/components/theme/one/shop-page';
import ThemeThreeShopPage from '@/components/theme/three/shop-page';
import ThemeTwoShopPage from '@/components/theme/two/shop-page';
import { env, getApiDataWithSubdomain } from '@/lib';
import { iVendorProduct } from '@/store/features/vendor/product/vendor-product-type';
import { iPagination } from '@/types';
import { iTenantFrontend } from '@/types/tenant-frontend';
import { notFound } from 'next/navigation';

type ShopSearchParams = {
	category_id?: string;
	min_price?: string;
	max_price?: string;
	color_id?: string;
	size_id?: string;
};

export default async function ShopPage({
	searchParams,
}: {
	searchParams: ShopSearchParams;
}) {
	const params = new URLSearchParams();

	const { category_id, min_price, max_price, color_id, size_id } =
		await searchParams;

	if (category_id) params.set('category_id', category_id);
	if (min_price) params.set('min_price', min_price);
	if (max_price) params.set('max_price', max_price);
	if (color_id) params.set('color_id', color_id);
	if (size_id) params.set('size_id', size_id);

	const queryString = params.toString();
	const url = `/tenant-frontend/products${
		queryString ? `?${queryString}` : ''
	}`;

	const products =
		await getApiDataWithSubdomain<iPagination<iVendorProduct> | null>(url);

	if (!products) {
		return notFound();
	}

	const settings = await getApiDataWithSubdomain<iTenantFrontend>(
		`/tenant-frontend/cms`
	);
	switch (settings?.cms?.theme || env.theme) {
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
