'use client';

import { useFrontendCreateAdvertiseMutation } from '@/store/features/frontend/advertiser-form';
import { VendorAdvertiseCreate } from '@/store/features/vendor/advertise';

export default function PageClient() {
	const [createAdvertise, { isLoading }] = useFrontendCreateAdvertiseMutation();
	return (
		<VendorAdvertiseCreate
			createAdvertise={createAdvertise}
			isLoading={isLoading}
		/>
	);
}
