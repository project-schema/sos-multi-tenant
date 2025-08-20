'use client';
import { Loader5, Loader8 } from '@/components/dashboard';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { cn, ErrorAlert, tableSrCount, textCount } from '@/lib';
import { useVendorWooCommerceQuery } from './vendor-woo-commerce-api-slice';
import { VendorWooCommerceDelete } from './vendor-woo-commerce-delete';
import { VendorWooCommerceEdit } from './vendor-woo-commerce-edit';

export function VendorWooCommerceTable() {
	const { data, isFetching, isLoading, isError } = useVendorWooCommerceQuery({
		page: '',
	});

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
							<TableHead className="bg-stone-100">WooCommerce Key</TableHead>
							<TableHead className="bg-stone-100">
								WooCommerce Secret{' '}
							</TableHead>
							<TableHead className="bg-stone-100">WooCommerce URL </TableHead>
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
										{textCount(item.wc_key, 25)}
									</TableCell>

									<TableCell className={cn('py-2 whitespace-pre-wrap')}>
										{item?.wc_secret || ''}
									</TableCell>

									<TableCell className="py-2">{item?.wc_url || ''}</TableCell>
									<TableCell className="py-2 space-x-2">
										<VendorWooCommerceEdit editData={item} />
										<VendorWooCommerceDelete data={item} />
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
