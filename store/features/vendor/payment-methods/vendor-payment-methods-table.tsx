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
import { useVendorPaymentMethodsQuery } from './vendor-payment-methods-api-slice';
import { VendorPaymentMethodsDelete } from './vendor-payment-methods-delete';
import { VendorPaymentMethodsEdit } from './vendor-payment-methods-edit';

export function VendorPaymentMethodsTable() {
	const { data, isFetching, isLoading, isError } = useVendorPaymentMethodsQuery(
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
							<TableHead className="bg-stone-100">
								Payment Methods Name
							</TableHead>
							<TableHead className="bg-stone-100">Account Number </TableHead>
							<TableHead className="bg-stone-100">Status </TableHead>
							<TableHead className="bg-stone-100">Action </TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{data?.data?.length === 0 ? (
							<TableRow>
								<TableCell
									colSpan={5}
									className="text-center py-8 text-muted-foreground"
								>
									No data found matching your criteria
								</TableCell>
							</TableRow>
						) : (
							data?.data?.map((item, i) => (
								<TableRow key={item.id}>
									<TableCell className="py-2 pl-4">
										{tableSrCount(1, i)}
									</TableCell>

									<TableCell className="py-2">
										{textCount(item.payment_method_name, 25)}
									</TableCell>

									<TableCell className={cn('py-2 whitespace-pre-wrap')}>
										{item?.acc_no || ''}
									</TableCell>

									<TableCell className="py-2">
										<Badge
											className="capitalize"
											variant={badgeFormat(item.status)}
										>
											{item.status}
										</Badge>
									</TableCell>
									<TableCell className="py-2 space-x-2">
										<VendorPaymentMethodsEdit editData={item} />
										<VendorPaymentMethodsDelete data={item} />
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
