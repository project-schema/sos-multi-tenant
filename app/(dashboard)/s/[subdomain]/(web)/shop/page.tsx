import ThemeTwoShopPage from '@/components/theme/two/shop-page';
import { getApiDataWithSubdomain } from '@/lib';
import { iTenantFrontend } from '@/types/tenant-frontend';
import { ShopSearchParams } from '@/types/web-shop-page';
import { redirect } from 'next/navigation';

export default async function ShopPage({
	searchParams,
}: {
	searchParams: ShopSearchParams;
}) {
	const settings =
		await getApiDataWithSubdomain<iTenantFrontend>(`/tenant-frontend/cms`);

	if (!settings?.cms?.theme) {
		redirect('/auth?tab=login');
	}
	switch (settings?.cms?.theme) {
		case 'one':
		// return <ThemeOneShopPage data={products} />;
		case 'two':
			return <ThemeTwoShopPage searchParams={searchParams} />;
		case 'three':
		// return <ThemeThreeShopPage data={products} />;
		default:
		// return <ThemeOneShopPage data={products} />;
	}
}
