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
import { badgeFormat, cn, ErrorAlert, tableSrCount } from '@/lib';
import { useVendorPickAndDeliveryAddressQuery } from './vendor-delivery-area-api-slice';
import { VendorPickAndDeliveryAddressDelete } from './vendor-delivery-area-delete';
import { VendorPickAndDeliveryAddressEdit } from './vendor-delivery-area-edit';

export function VendorPickAndDeliveryAddressTable({
	type,
}: {
	type: 'pickup' | 'delivery';
}) {
	const { data, isFetching, isLoading, isError } =
		useVendorPickAndDeliveryAddressQuery({ type });

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
							<TableHead className="bg-stone-100">
								{type === 'pickup' ? 'Pickup Address' : 'Delivery Address'}
							</TableHead>
							<TableHead className="bg-stone-100">Status </TableHead>
							<TableHead className="bg-stone-100">Action </TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{data?.deliveryAndPickupAddress?.length === 0 ? (
							<TableRow>
								<TableCell
									colSpan={4}
									className="text-center py-8 text-muted-foreground"
								>
									No {type} found matching your criteria
								</TableCell>
							</TableRow>
						) : (
							data?.deliveryAndPickupAddress?.map((item, i) => (
								<TableRow key={item?.id}>
									<TableCell className="py-2 pl-4">
										{tableSrCount(1, i)}
									</TableCell>

									<TableCell className={cn('py-2 whitespace-pre-wrap')}>
										{item?.address || ''}
									</TableCell>

									<TableCell className="py-2">
										<Badge
											className="capitalize"
											variant={badgeFormat(item?.status)}
										>
											{item?.status}
										</Badge>
									</TableCell>
									<TableCell className="py-2 space-x-2">
										<VendorPickAndDeliveryAddressEdit
											editData={item}
											type={type}
										/>
										<VendorPickAndDeliveryAddressDelete data={item} />
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
