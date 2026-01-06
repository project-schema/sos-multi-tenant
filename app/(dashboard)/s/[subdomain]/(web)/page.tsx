import ThemeOneHomePage from '@/components/theme/one/home-page';
import ThemeThreeHomePage from '@/components/theme/three/home-page';
import ThemeTwoHomePage from '@/components/theme/two/home-page';
import { env } from '@/lib';

export default function MySite() {
	switch (env.theme) {
		case 'one':
			return <ThemeOneHomePage />;
		case 'two':
			return <ThemeTwoHomePage />;
		case 'three':
			return <ThemeThreeHomePage />;
		default:
			return <ThemeOneHomePage />;
	}
}
