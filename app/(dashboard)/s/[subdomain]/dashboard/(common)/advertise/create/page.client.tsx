'use client';

import { useTenantCreateAdvertiseMutation } from '@/store/features/frontend/advertiser-form';
import { VendorAdvertiseCreate } from '@/store/features/vendor/advertise';

export default function PageClient() {
	const [createAdvertise, { isLoading }] = useTenantCreateAdvertiseMutation();
	return (
		<div className="-mt-60 sm:-mt-40">
			<VendorAdvertiseCreate
				createAdvertise={createAdvertise}
				isLoading={isLoading}
			/>
		</div>
	);
}
