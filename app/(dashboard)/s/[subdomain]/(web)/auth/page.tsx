import ThemeOneAuthPage from '@/components/theme/one/auth-page';
import ThemeThreeAuthPage from '@/components/theme/three/auth-page';
import AuthClient from '@/components/theme/two/_ctx/auth-client';
import ThemeTwoAuthPage from '@/components/theme/two/auth-page';
import { getApiData, getApiDataWithSubdomain } from '@/lib';
import { iSubscriptionsType } from '@/types';
import { iTenantFrontend } from '@/types/tenant-frontend';

export default async function AuthPage() {
	const settings = await getApiDataWithSubdomain<iTenantFrontend>(
		`/tenant-frontend/cms`
	);
	const subscriptions = await getApiData<iSubscriptionsType>('/subscriptions');

	switch (settings?.cms?.theme) {
		case 'one':
			return <ThemeOneAuthPage />;
		case 'two':
			return <ThemeTwoAuthPage />;
		case 'three':
			return <ThemeThreeAuthPage />;
		default:
			return subscriptions ? (
				<AuthClient subscriptions={subscriptions} />
			) : null;
	}
}
