'use client';
import { DbHeader } from '@/components/dashboard';
import { UserServicePage } from '@/store/features/user/service';

const breadcrumbItems = [
	{ name: 'Dashboard', path: '/user' },
	{ name: 'Order' },
];

export default function Page() {
	return (
		<>
			<DbHeader breadcrumb={breadcrumbItems} />
			<div>
				<UserServicePage />
			</div>
		</>
	);
}
