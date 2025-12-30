'use client';

import { iAdminService } from '@/store/features/admin/service';
import {
	ServiceOrderCheckout,
	useFrontendServiceOrderMutation,
} from '@/store/features/frontend';

export default function PageClient({ service }: { service: iAdminService }) {
	const [mutate, { isLoading }] = useFrontendServiceOrderMutation();
	return (
		<>
			<ServiceOrderCheckout
				service={service}
				mutate={mutate}
				isLoading={isLoading}
			/>
		</>
	);
}
