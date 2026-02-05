import ThemeOneWishListPage from '@/components/theme/one/wish-list-page';
import ThemeThreeWishListPage from '@/components/theme/three/wish-list-page';
import ThemeTwoWishListPage from '@/components/theme/two/wish-list-page';
import { env, getApiDataWithSubdomain } from '@/lib';
import { iTenantFrontend } from '@/types/tenant-frontend';

export default async function WishListPage() {
	const settings = await getApiDataWithSubdomain<iTenantFrontend>(
		`/tenant-frontend/cms`
	);
	switch (settings?.cms?.theme || env.theme) {
		case 'one':
			return <ThemeOneWishListPage />;
		case 'two':
			return <ThemeTwoWishListPage />;
		case 'three':
			return <ThemeThreeWishListPage />;
		default:
			return <ThemeOneWishListPage />;
	}
}
