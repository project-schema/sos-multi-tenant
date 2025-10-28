import { DbHeader } from '@/components/dashboard';
import { protocol, rootDomain } from '@/lib/utils';
import { SessionProvider } from '@/provider';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
const breadcrumbItems = [{ name: 'Dashboard' }];

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

export default async function SubdomainPage({
	params,
}: {
	params: Promise<{ subdomain: string }>;
}) {
	const { subdomain } = await params;
	// const subdomainData = await getSubdomainData(subdomain);

	if (!subdomain) {
		notFound();
	}

	return (
		<SessionProvider>
			<DbHeader breadcrumb={breadcrumbItems} />
			<div className="flex  flex-col bg-gradient-to-b from-blue-50 to-white p-4">
				<div className="absolute top-4 right-4">
					<Link
						href={`${protocol}://${rootDomain}`}
						className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
					>
						{rootDomain}
					</Link>
				</div>

				<div className="flex-1 flex items-center justify-center">
					<div className="text-center">
						<div className="text-9xl mb-6"> </div>
						<h1 className="text-4xl font-bold tracking-tight text-gray-900">
							Welcome to {subdomain}.{rootDomain}
						</h1>
						<p className="mt-3 text-lg text-gray-600">
							This is your custom subdomain page
						</p>
					</div>
				</div>
			</div>
		</SessionProvider>
	);
}
