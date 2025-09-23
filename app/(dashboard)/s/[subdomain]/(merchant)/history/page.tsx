import { DbHeader } from '@/components/dashboard';
import { UserHistory } from '@/store/features';
const breadcrumbItems = [{ name: 'Dashboard', path: '/' }, { name: 'History' }];
export default function Page() {
	return (
		<>
			<DbHeader breadcrumb={breadcrumbItems} />
			<UserHistory />
		</>
	);
}
