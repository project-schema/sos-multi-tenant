import ThemeOneCartPage from '@/components/theme/one/cart-page';
import ThemeThreeCartPage from '@/components/theme/three/cart-page';
import ThemeTwoCartPage from '@/components/theme/two/cart-page';
import { env, getApiDataWithSubdomain } from '@/lib';
import { iTenantFrontend } from '@/types/tenant-frontend';

export default async function CartPage() {
	const settings = await getApiDataWithSubdomain<iTenantFrontend>(
		`/tenant-frontend/cms`
	);
	switch (settings?.cms?.theme || env.theme) {
		case 'one':
			return <ThemeOneCartPage />;
		case 'two':
			return <ThemeTwoCartPage />;
		case 'three':
			return <ThemeThreeCartPage />;
		default:
			return <ThemeOneCartPage />;
	}
}
