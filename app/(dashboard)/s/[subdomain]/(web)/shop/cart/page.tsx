import ThemeOneCartPage from '@/components/theme/one/cart-page';
import ThemeThreeCartPage from '@/components/theme/three/cart-page';
import ThemeTwoCartPage from '@/components/theme/two/cart-page';
import { getApiDataWithSubdomain } from '@/lib';
import { iTenantFrontend } from '@/types/tenant-frontend';
import { redirect } from 'next/navigation';

export default async function CartPage() {
	const settings = await getApiDataWithSubdomain<iTenantFrontend>(
		`/tenant-frontend/cms`
	);
	if (!settings?.cms?.theme) {
		redirect('/auth?tab=login');
	}
	switch (settings?.cms?.theme) {
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
