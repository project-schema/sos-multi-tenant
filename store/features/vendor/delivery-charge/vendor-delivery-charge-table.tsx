'use client';
import { Loader5, Loader8 } from '@/components/dashboard';
import { Badge } from '@/components/ui/badge';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { badgeFormat, cn, ErrorAlert, tableSrCount, textCount } from '@/lib';
import { useVendorDeliveryChargeQuery } from './vendor-delivery-charge-api-slice';
import { VendorDeliveryChargeDelete } from './vendor-delivery-charge-delete';
import { VendorDeliveryChargeEdit } from './vendor-delivery-charge-edit';

export function VendorDeliveryChargeTable() {
	const { data, isFetching, isLoading, isError } = useVendorDeliveryChargeQuery(
		{ page: '' }
	);

	if (isError) {
		return <ErrorAlert />;
	}

	if (isLoading) {
		return (
			<>
				<Loader5 />
				<Loader5 />
				<Loader5 />
				<Loader5 />
			</>
		);
	}
	return (
		<>
			<div className="border rounded-lg relative">
				{isFetching && <Loader8 />}
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead className="bg-stone-100">#SL.</TableHead>
							<TableHead className="bg-stone-100">Charge </TableHead>
							<TableHead className="bg-stone-100">Address </TableHead>
							<TableHead className="bg-stone-100">Status </TableHead>
							<TableHead className="bg-stone-100">Action </TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{data?.deliveryCharge?.length === 0 ? (
							<TableRow>
								<TableCell
									colSpan={5}
									className="text-center py-8 text-muted-foreground"
								>
									No data found matching your criteria
								</TableCell>
							</TableRow>
						) : (
							data?.deliveryCharge?.map((deliveryCharge, i) => (
								<TableRow key={deliveryCharge.id}>
									<TableCell className="py-2 pl-4">
										{tableSrCount(1, i)}
									</TableCell>

									<TableCell className="py-2">
										{textCount(deliveryCharge.charge, 25)}
									</TableCell>

									<TableCell className={cn('py-2 whitespace-pre-wrap')}>
										{deliveryCharge?.area || ''}
									</TableCell>

									<TableCell className="py-2">
										<Badge
											className="capitalize"
											variant={badgeFormat(deliveryCharge.status)}
										>
											{deliveryCharge.status}
										</Badge>
									</TableCell>
									<TableCell className="py-2 space-x-2">
										<VendorDeliveryChargeEdit editData={deliveryCharge} />
										<VendorDeliveryChargeDelete data={deliveryCharge} />
									</TableCell>
								</TableRow>
							))
						)}
					</TableBody>
				</Table>
			</div>
		</>
	);
}
