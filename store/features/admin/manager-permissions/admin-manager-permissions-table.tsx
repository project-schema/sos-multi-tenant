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
import { dateFormat, ErrorAlert, tableSrCount, textCount } from '@/lib';
import { useAdminAllManagerListQuery } from './admin-manager-permissions-api-slice';
import { AdminManagerTableDelete } from './admin-manager-permissions-delete';
import { AdminManagerTableEdit } from './admin-manager-permissions-edit';

export function AdminManagerTable() {
	const { data, isFetching, isLoading, isError } =
		useAdminAllManagerListQuery(undefined);

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
							<TableHead className="bg-stone-100"> Name </TableHead>
							<TableHead className="bg-stone-100">Role </TableHead>
							<TableHead className="bg-stone-100">Email </TableHead>
							<TableHead className="bg-stone-100">Number </TableHead>
							<TableHead className="bg-stone-100">Date </TableHead>
							<TableHead className="bg-stone-100">Action </TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{data?.length === 0 ? (
							<TableRow>
								<TableCell
									colSpan={7}
									className="text-center py-8 text-muted-foreground"
								>
									No data found matching your criteria
								</TableCell>
							</TableRow>
						) : (
							data?.map((item, i) => (
								<TableRow key={item.id}>
									<TableCell className="py-2 pl-4">
										{tableSrCount(1, i)}
									</TableCell>

									<TableCell className="py-2">
										{textCount(item.name, 25)}
									</TableCell>

									<TableCell className="py-2">
										<Badge className="capitalize" variant="outline">
											{item.roles?.[0]?.name}
										</Badge>
									</TableCell>
									<TableCell className="py-2">{item.email}</TableCell>
									<TableCell className="py-2">{item.number}</TableCell>
									<TableCell className="py-2">
										{dateFormat(item.created_at)}
									</TableCell>
									<TableCell className="py-2 space-x-2">
										<AdminManagerTableEdit editData={item} />
										<AdminManagerTableDelete data={item} />
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
