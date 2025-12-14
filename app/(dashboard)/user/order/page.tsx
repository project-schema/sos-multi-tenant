'use client';
import { DbHeader } from '@/components/dashboard';

const breadcrumbItems = [
	{ name: 'Dashboard', path: '/user' },
	{ name: 'Order' },
];

export default function Page() {
	return (
		<>
			<DbHeader breadcrumb={breadcrumbItems} />
			<div className="max-w-2xl mx-auto w-full md:mt-12">
				{/* <UserServicePage /> */}
			</div>
		</>
	);
}
