'use client';

import { DbHeader } from '@/components/dashboard';
import { SessionProvider } from '@/provider';
import { useUserAdvertiseCreateMutation } from '@/store/features/user/advertise';
import { VendorAdvertiseCreate } from '@/store/features/vendor/advertise';

const breadcrumbItems = [
	{ name: 'Dashboard', path: '/user' },
	{ name: 'Advertise', path: '/user/advertise' },
	{ name: 'Create Advertise' },
];
export default function PageClient() {
	const [createAdvertise, { isLoading }] = useUserAdvertiseCreateMutation();
	return (
		<SessionProvider>
			<DbHeader breadcrumb={breadcrumbItems} />
			<div className="-mt-60 sm:-mt-40">
				<VendorAdvertiseCreate
					createAdvertise={createAdvertise}
					isLoading={isLoading}
				/>
			</div>
		</SessionProvider>
	);
}
