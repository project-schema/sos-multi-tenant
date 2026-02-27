import { getApiDataWithSubdomain } from '@/lib';
import { iTenantFrontend } from '@/types/tenant-frontend';
import { notFound } from 'next/navigation';
import AuthClient from './ctx/auth-client';

export default async function ThemeThreeAuthPage() {
	const settings = await getApiDataWithSubdomain<iTenantFrontend>(
		'/tenant-frontend/cms',
	);
	if (!settings) {
		return notFound();
	}
	return (
		<>
			<AuthClient settings={settings} />
		</>
	);
}
