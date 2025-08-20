'use client';

import { Container1 } from '@/components/dashboard';
import { CardTitle } from '@/components/ui/card';
import { useVendorCourierCompanyQuery } from './vendor-courier-company-api-slice';
import { VendorCourierCard } from './vendor-courier-company-card';

export function VendorCourierCompanyPage() {
	const { data, isLoading, isError } = useVendorCourierCompanyQuery(undefined);
	const pathao = data?.data?.find((item) => item.courier_name === 'pathao');
	const redx = data?.data?.find((item) => item.courier_name === 'redx');
	const steadfast = data?.data?.find(
		(item) => item.courier_name === 'steadfast'
	);

	return (
		<Container1
			isError={isError}
			isLoading={isLoading}
			header={<CardTitle>Courier Company</CardTitle>}
		>
			<div className="grid lg:grid-cols-3 gap-4">
				<VendorCourierCard type="pathao" data={pathao} />
				<VendorCourierCard type="redx" data={redx} />
				<VendorCourierCard type="steadfast" data={steadfast} />
			</div>
		</Container1>
	);
}
