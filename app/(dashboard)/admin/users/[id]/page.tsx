import { DbHeader } from '@/components/dashboard';

const breadcrumbItems = [
	{ name: 'Dashboard', path: '/user' },
	{ name: 'User', path: '/user/profile' },
	{ name: 'Admin' },
];
export default function User() {
	return (
		<>
			<DbHeader breadcrumb={breadcrumbItems} />
		</>
	);
}
