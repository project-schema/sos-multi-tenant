import ThemeOneProductDetailsPage from '@/components/theme/one/product-details';
import ThemeThreeProductDetailsPage from '@/components/theme/three/product-details';
import ThemeTwoProductDetailsPage from '@/components/theme/two/product-details';
import { env } from '@/lib';

export default function ProductDetailsPage() {
	switch (env.theme) {
		case 'one':
			return <ThemeOneProductDetailsPage />;
		case 'two':
			return <ThemeTwoProductDetailsPage />;
		case 'three':
			return <ThemeThreeProductDetailsPage />;
		default:
			return <ThemeOneProductDetailsPage />;
	}
}
