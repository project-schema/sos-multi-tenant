import { getApiData } from '@/lib';
import { FrontendPageVisit } from '@/store/features/frontend';
import { notFound } from 'next/navigation';

interface TenantCheckResponse {
	success: boolean;
	message: string;
}

async function checkTenantExists(subdomain: string): Promise<boolean> {
	const response = await getApiData<TenantCheckResponse>(
		`/have/tenant/${subdomain}`
	);

	// If no response (404 or other error) or success is false, tenant doesn't exist
	return response?.success === true;
}

export default async function MySiteLayout({
	children,
	params,
}: {
	children: React.ReactNode;
	params: Promise<{ subdomain: string }>;
}) {
	const { subdomain } = await params;

	// Check if tenant exists
	const tenantExists = await checkTenantExists(subdomain);

	if (!tenantExists) {
		notFound();
	}

	return (
		<>
			<FrontendPageVisit />
			{children}
		</>
	);
}
