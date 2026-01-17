'use client';
import { DbHeader } from '@/components/dashboard';
import { SessionProvider } from '@/provider';
import { VendorRecharge } from '@/store/features/vendor/recharge';

const breadcrumbItems = [
	{ name: 'Dashboard', path: '/dashboard' },
	{ name: 'Recharge' },
];

export default function Page() {
	return (
		<SessionProvider>
			<DbHeader breadcrumb={breadcrumbItems} />
			<div className="max-w-2xl mx-auto w-full md:mt-12">
				<VendorRecharge />
			</div>
		</SessionProvider>
	);
}
