import { DbHeader } from '@/components/dashboard';

const breadcrumbItems = [{ name: 'Dashboard' }];
export default async function AdminPage() {
	return (
		<div>
			<DbHeader breadcrumb={breadcrumbItems} />
		</div>
	);
}
