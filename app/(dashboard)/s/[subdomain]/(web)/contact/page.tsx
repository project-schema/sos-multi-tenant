import ThemeOneContactPage from '@/components/theme/one/contact-page';
import ThemeThreeContactPage from '@/components/theme/three/contact-page';
import ThemeTwoContactPage from '@/components/theme/two/contact-page';
import { env } from '@/lib';

export default function ContactPage() {
	switch (env.theme) {
		case 'one':
			return <ThemeOneContactPage />;
		case 'two':
			return <ThemeTwoContactPage />;
		case 'three':
			return <ThemeThreeContactPage />;
		default:
			return <ThemeOneContactPage />;
	}
}
