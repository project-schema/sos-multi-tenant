import { DbHeader } from '@/components/dashboard';
import { UserWithdraw } from '@/store/features';
const breadcrumbItems = [
	{ name: 'Dashboard', path: '/user' },
	{ name: 'Withdraw' },
];
export default function Page() {
	return (
		<>
			<DbHeader breadcrumb={breadcrumbItems} />
			<UserWithdraw />
		</>
	);
}
