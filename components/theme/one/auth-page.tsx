import { Header01 } from '@/components/web';
import Footer01 from '@/components/web/footer/01';
import { getApiDataWithSubdomain } from '@/lib';
import { iTenantFrontend } from '@/types/tenant-frontend';
import { notFound } from 'next/navigation';
import AuthClient from '../two/_ctx/auth-client';

export default async function ThemeThreeAuthPage() {
	const settings = await getApiDataWithSubdomain<iTenantFrontend>(
		'/tenant-frontend/cms',
	);
	if (!settings) {
		return notFound();
	}

	return (
		<>
			<Header01 />
			<AuthClient settings={settings} />
			<Footer01 />
		</>
	);
}
