import ThemeFourAccountPage from '@/components/theme/four/account-page';
import ThemeOneAccountPage from '@/components/theme/one/account-page';
import ThemeThreeAccountPage from '@/components/theme/three/account-page';
import ThemeTwoAccountPage from '@/components/theme/two/account-page';
import { getApiDataWithSubdomain } from '@/lib';
import { iTenantFrontend } from '@/types/tenant-frontend';
import { redirect } from 'next/navigation';

export default async function AccountPage() {
	const settings =
		await getApiDataWithSubdomain<iTenantFrontend>(`/tenant-frontend/cms`);

	if (!settings?.cms?.theme) {
		redirect('/auth?tab=login');
	}

	if (settings.has_website !== 'yes') {
		redirect('/auth?tab=login');
	}
	switch (settings?.cms?.theme) {
		case 'one':
			return <ThemeOneAccountPage />;
		case 'two':
			return <ThemeTwoAccountPage />;
		case 'three':
			return <ThemeThreeAccountPage />;
		case 'four':
			return <ThemeFourAccountPage />;
		default:
			return <ThemeOneAccountPage />;
	}
}

export const metadata = {
	title: 'Account',
};
