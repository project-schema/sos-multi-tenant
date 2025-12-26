'use client';

import { Container1 } from '@/components/dashboard';
import { CardTitle } from '@/components/ui/card';
import { iAdminService } from '../../admin/service';
import { ServiceOrderCheckout } from '../../frontend';
export function VendorServicePurchasePay({
	service,
}: {
	service: iAdminService;
}) {
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
						<ServiceOrderCheckout service={service} />
					</div>
				</section>
			</Container1>
		</>
	);
}
