import ThemeFourWishListPage from '@/components/theme/four/wish-list-page';
import ThemeOneWishListPage from '@/components/theme/one/wish-list-page';
import ThemeThreeWishListPage from '@/components/theme/three/wish-list-page';
import ThemeTwoWishListPage from '@/components/theme/two/wish-list-page';
import { getApiDataWithSubdomain } from '@/lib';
import { iTenantFrontend } from '@/types/tenant-frontend';
import { redirect } from 'next/navigation';

export default async function WishListPage() {
	const settings =
		await getApiDataWithSubdomain<iTenantFrontend>(`/tenant-frontend/cms`);
	if (!settings?.cms?.theme) {
		redirect('/auth?tab=login');
	}

	if (settings.has_website === 'no') {
		redirect('/auth?tab=login');
	}
	switch (settings?.cms?.theme) {
		case 'one':
			return <ThemeOneWishListPage />;
		case 'two':
			return <ThemeTwoWishListPage />;
		case 'three':
			return <ThemeThreeWishListPage />;
		case 'four':
			return <ThemeFourWishListPage />;
		default:
			return <ThemeOneWishListPage />;
	}
}

export const metadata = {
	title: 'Wish List',
};
