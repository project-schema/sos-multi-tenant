import ThemeOneAccountPage from '@/components/theme/one/account-page';
import ThemeThreeAccountPage from '@/components/theme/three/account-page';
import ThemeTwoAccountPage from '@/components/theme/two/account-page';
import { env, getApiDataWithSubdomain } from '@/lib';
import { iTenantFrontend } from '@/types/tenant-frontend';

export default async function AccountPage() {
	const settings = await getApiDataWithSubdomain<iTenantFrontend>(
		`/tenant-frontend/cms`
	);
	switch (settings?.cms?.theme || env.theme) {
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
