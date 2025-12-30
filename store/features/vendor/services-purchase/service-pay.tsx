'use client';

import { Container1 } from '@/components/dashboard';
import { CardTitle } from '@/components/ui/card';
import { iAdminService } from '../../admin/service';
import { ServiceOrderCheckout } from '../../frontend';
import { useVendorServiceOrderMutation } from './api-slice';
export function VendorServicePurchasePay({
	service,
}: {
	service: iAdminService;
}) {
	const [mutate, { isLoading }] = useVendorServiceOrderMutation();

	return (
		<>
			<Container1
				header={
					<>
						<div className="pb-2 lg:pb-3 flex items-center justify-between">
							<CardTitle>Pay for Service</CardTitle>
						</div>
					</>
				}
			>
				<section>
					<div className="layout">
						<ServiceOrderCheckout
							service={service}
							mutate={mutate}
							isLoading={isLoading}
						/>
					</div>
				</section>
			</Container1>
		</>
	);
}
