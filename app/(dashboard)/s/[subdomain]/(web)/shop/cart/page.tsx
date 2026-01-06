import ThemeOneCartPage from '@/components/theme/one/cart-page';
import ThemeThreeCartPage from '@/components/theme/three/cart-page';
import ThemeTwoCartPage from '@/components/theme/two/cart-page';
import { env } from '@/lib';

export default function CartPage() {
	switch (env.theme) {
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
