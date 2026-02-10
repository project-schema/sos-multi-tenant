import ThemeOneCheckoutPage from '@/components/theme/one/checkout-page';
import ThemeThreeCheckoutPage from '@/components/theme/three/checkout-page';
import ThemeTwoCheckoutPage from '@/components/theme/two/checkout-page';
import { getApiDataWithSubdomain } from '@/lib';
import { iTenantFrontend } from '@/types/tenant-frontend';
import { redirect } from 'next/navigation';
export default async function CheckoutPage() {
	const settings = await getApiDataWithSubdomain<iTenantFrontend>(
		`/tenant-frontend/cms`
	);
	if (!settings?.cms?.theme) {
		redirect('/auth?tab=login');
	}
	switch (settings?.cms?.theme) {
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
