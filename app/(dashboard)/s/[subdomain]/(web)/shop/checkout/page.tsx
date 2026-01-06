import ThemeOneCheckoutPage from '@/components/theme/one/checkout-page';
import ThemeThreeCheckoutPage from '@/components/theme/three/checkout-page';
import ThemeTwoCheckoutPage from '@/components/theme/two/checkout-page';
import { env } from '@/lib';
export default function CheckoutPage() {
	switch (env.theme) {
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
