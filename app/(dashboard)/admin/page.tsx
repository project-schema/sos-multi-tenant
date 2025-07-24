import { DbHeader } from '@/components/dashboard';
import { rootDomain } from '@/lib/utils';
import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: `Admin Dashboard | ${rootDomain}`,
	description: `Manage subdomains for ${rootDomain}`,
};

const breadcrumbItems = [{ name: 'Dashboard' }];
export default async function AdminPage() {
	return (
		<div>
			<DbHeader breadcrumb={breadcrumbItems} />
		</div>
	);
}
