import ThemeOneAuthPage from '@/components/theme/one/auth-page';
import ThemeThreeAuthPage from '@/components/theme/three/auth-page';
import ThemeTwoAuthPage from '@/components/theme/two/auth-page';
import { env, getApiDataWithSubdomain } from '@/lib';
import { iTenantFrontend } from '@/types/tenant-frontend';

export default async function AuthPage() {
	const settings = await getApiDataWithSubdomain<iTenantFrontend>(
		`/tenant-frontend/cms`
	);
	switch (settings?.cms?.theme || env.theme) {
		case 'one':
			return <ThemeOneAuthPage />;
		case 'two':
			return <ThemeTwoAuthPage />;
		case 'three':
			return <ThemeThreeAuthPage />;
		default:
			return <ThemeOneAuthPage />;
	}
}
