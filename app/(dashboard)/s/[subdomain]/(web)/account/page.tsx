import ThemeOneAccountPage from '@/components/theme/one/account-page';
import ThemeThreeAccountPage from '@/components/theme/three/account-page';
import ThemeTwoAccountPage from '@/components/theme/two/account-page';
import { env } from '@/lib';

export default function DashboardPage() {
	switch (env.theme) {
		case 'one':
			return <ThemeOneAccountPage />;
		case 'two':
			return <ThemeTwoAccountPage />;
		case 'three':
			return <ThemeThreeAccountPage />;
		default:
			return <ThemeOneAccountPage />;
	}
}
