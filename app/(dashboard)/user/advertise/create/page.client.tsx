'use client';

import { useUserAdvertiseCreateMutation } from '@/store/features/user/advertise';
import { VendorAdvertiseCreate } from '@/store/features/vendor/advertise';

export default function PageClient() {
	const [createAdvertise, { isLoading }] = useUserAdvertiseCreateMutation();
	return (
		<div className="-mt-60 sm:-mt-40">
			<VendorAdvertiseCreate
				createAdvertise={createAdvertise}
				isLoading={isLoading}
			/>
		</div>
	);
}
