'use client';

import { useTenantCreateAdvertiseMutation } from '@/store/features/frontend/advertiser-form';
import { VendorAdvertiseCreate } from '@/store/features/vendor/advertise';

export default function PageClient() {
	const [createAdvertise, { isLoading }] = useTenantCreateAdvertiseMutation();
	return (
		<VendorAdvertiseCreate
			createAdvertise={createAdvertise}
			isLoading={isLoading}
		/>
	);
}
