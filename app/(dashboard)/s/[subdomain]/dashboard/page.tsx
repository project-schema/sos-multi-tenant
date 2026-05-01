import { Loader9 } from '@/components/dashboard';
import { Metadata } from 'next';
import { lazy, Suspense } from 'react';
const PageClient = lazy(() => import('./page-client'));

export default function Page({
	params,
}: {
	params: Promise<{ subdomain: string }>;
}) {
	return (
		<Suspense fallback={<Loader9 />}>
			<PageClient params={params} />
		</Suspense>
	);
}

export async function generateMetadata({
	params,
}: {
	params: Promise<{ subdomain: string }>;
}): Promise<Metadata> {
	const { subdomain } = await params;
	// const subdomainData = await getSubdomainData(subdomain);

	if (!subdomain) {
		return {
			title: subdomain,
		};
	}

	return {
		title: `Dashboard | ${subdomain}`,
		description: `Dashboard for ${subdomain}`,
	};
}
