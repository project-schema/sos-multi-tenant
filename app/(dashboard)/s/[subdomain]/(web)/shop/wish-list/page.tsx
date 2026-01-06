import ThemeOneWishListPage from '@/components/theme/one/wish-list-page';
import ThemeThreeWishListPage from '@/components/theme/three/wish-list-page';
import ThemeTwoWishListPage from '@/components/theme/two/wish-list-page';
import { env } from '@/lib';

export default function WishListPage() {
	switch (env.theme) {
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
