'use client';
import { Loader5, Loader8 } from '@/components/dashboard';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { badgeFormat, env, ErrorAlert, tableSrCount, textCount } from '@/lib';
import { useVendorOrderSourceAllQuery } from './vendor-order-source-api-slice';
import { VendorOrderSourceDelete } from './vendor-order-source-delete';
import { VendorOrderSourceEdit } from './vendor-order-source-edit';

export function VendorOrderSourceTable() {
	const {
		data: orderSources,
		isFetching,
		isLoading,
		isError,
	} = useVendorOrderSourceAllQuery({ page: '' });

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
							<TableHead className="bg-stone-100">Image </TableHead>
							<TableHead className="bg-stone-100">Name </TableHead>
							<TableHead className="bg-stone-100">Status </TableHead>
							<TableHead className="bg-stone-100">Action </TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{orderSources?.resource?.length === 0 ? (
							<TableRow>
								<TableCell
									colSpan={5}
									className="text-center py-8 text-muted-foreground"
								>
									No Order Source found matching your criteria
								</TableCell>
							</TableRow>
						) : (
							orderSources?.resource?.map((orderSource, i) => (
								<TableRow key={orderSource.id}>
									<TableCell className="py-2 pl-4">
										{tableSrCount(orderSources?.resource?.length, i)}
									</TableCell>
									<TableCell className="py-2">
										<Avatar className="h-12 w-12 rounded-xl">
											<AvatarImage
												src={env.baseAPI + '/' + orderSource.image}
												alt={orderSource.name}
											/>
											<AvatarFallback className="rounded-xl bg-sky-100">
												{orderSource.name.charAt(0).toUpperCase()}
											</AvatarFallback>
										</Avatar>
									</TableCell>

									<TableCell className="py-2">
										{textCount(orderSource.name, 25)}
									</TableCell>

									<TableCell className="py-2">
										<Badge
											className="capitalize"
											variant={badgeFormat(orderSource.status)}
										>
											{orderSource.status}
										</Badge>
									</TableCell>
									<TableCell className="py-2 space-x-2">
										<VendorOrderSourceEdit editData={orderSource} />
										<VendorOrderSourceDelete data={orderSource} />
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
