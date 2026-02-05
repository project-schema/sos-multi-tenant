import ThemeOneCheckoutPage from '@/components/theme/one/checkout-page';
import ThemeThreeCheckoutPage from '@/components/theme/three/checkout-page';
import ThemeTwoCheckoutPage from '@/components/theme/two/checkout-page';
import { env, getApiDataWithSubdomain } from '@/lib';
import { iTenantFrontend } from '@/types/tenant-frontend';
export default async function CheckoutPage() {
	const settings = await getApiDataWithSubdomain<iTenantFrontend>(
		`/tenant-frontend/cms`
	);
	switch (settings?.cms?.theme || env.theme) {
		case 'one':
			return <ThemeOneCheckoutPage />;
		case 'two':
			return <ThemeTwoCheckoutPage />;
		case 'three':
			return <ThemeThreeCheckoutPage />;
		default:
			return <ThemeOneCheckoutPage />;
	}
}
