import { Footer03, Header03 } from '@/components/web';
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
			<Header03 />
			<AuthClient settings={settings} />
			<Footer03 />
		</>
	);
}
