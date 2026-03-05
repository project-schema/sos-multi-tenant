import ThemeFourShopPage from '@/components/theme/four/shop-page';
import ThemeOneShopPage from '@/components/theme/one/shop-page';
import ThemeThreeShopPage from '@/components/theme/three/shop-page';
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
			return <ThemeOneShopPage searchParams={searchParams} />;
		case 'two':
			return <ThemeTwoShopPage searchParams={searchParams} />;
		case 'three':
			return <ThemeThreeShopPage searchParams={searchParams} />;
		case 'four':
			return <ThemeFourShopPage searchParams={searchParams} />;
		default:
			return <ThemeOneShopPage searchParams={searchParams} />;
	}
}

export const metadata = {
	title: 'Shop',
};
