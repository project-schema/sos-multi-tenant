import ThemeFourContactPage from '@/components/theme/four/contact-page';
import ThemeOneContactPage from '@/components/theme/one/contact-page';
import ThemeThreeContactPage from '@/components/theme/three/contact-page';
import ThemeTwoContactPage from '@/components/theme/two/contact-page';
import { getApiDataWithSubdomain } from '@/lib';
import { iTenantFrontend } from '@/types/tenant-frontend';
import { redirect } from 'next/navigation';

export default async function ContactPage() {
	const settings =
		await getApiDataWithSubdomain<iTenantFrontend>(`/tenant-frontend/cms`);
	if (!settings?.cms?.theme) {
		redirect('/auth?tab=login');
	}

	if (settings.has_website === 'no') {
		redirect('/auth?tab=login');
	}
	switch (settings?.cms?.theme) {
		case 'one':
			return <ThemeOneContactPage cms={settings?.cms} />;
		case 'two':
			return <ThemeTwoContactPage />;
		case 'three':
			return <ThemeThreeContactPage />;
		case 'four':
			return <ThemeFourContactPage cms={settings?.cms} />;
		default:
			return <ThemeOneContactPage cms={settings?.cms} />;
	}
}

export const metadata = {
	title: 'Contact',
};
