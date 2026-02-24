import { getApiDataWithSubdomain } from '@/lib';
import { iTenantFrontend } from '@/types/tenant-frontend';
import { notFound } from 'next/navigation';
import AuthClient from './_ctx/auth-client';

export default async function ThemeTwoAuthPage() {
	const settings = await getApiDataWithSubdomain<iTenantFrontend>(
		'/tenant-frontend/cms',
	);

	if (!settings) {
		return notFound();
	}
	return (
		<>
			{/* <Header02 /> */}
			<AuthClient settings={settings} />
			{/* <Footer02 /> */}
		</>
	);
}
