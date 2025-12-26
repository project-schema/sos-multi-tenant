'use client';

import { Container1 } from '@/components/dashboard';
import {
	HeadingOfSD,
	ServiceOfDetails,
	SliderOfSD,
	TabOfSD,
} from '@/components/essential/ServiceDetails';
import style from '@/components/essential/ServiceDetails/style.module.css';
import { CardTitle } from '@/components/ui/card';
import { iAdminService } from '../../admin/service';
export function VendorServicePurchaseView({
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
							<CardTitle>Purchase Service</CardTitle>
						</div>
					</>
				}
			>
				<section>
					<div className="layout">
						<div className={style.servicesDetailsWp}>
							<div className={style?.servicesdetailsSlider}>
								<HeadingOfSD service={service} />
								<SliderOfSD images={service?.serviceimages} />
								<ServiceOfDetails service={service} />
							</div>
							{/* @ts-ignore */}
							<TabOfSD packages={service?.servicepackages} />
						</div>
					</div>
				</section>
			</Container1>
		</>
	);
}
