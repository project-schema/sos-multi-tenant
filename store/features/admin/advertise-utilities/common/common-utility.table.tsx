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
import { ErrorAlert, tableSrCount, textCount } from '@/lib';
import { useAdminAdvertiseCommonUtilitiesQuery } from './common-utility.api.slice';
import { AdvertiseCommonUtilitiesDelete } from './common-utility.delete';
import { AdvertiseCommonUtilitiesEdit } from './common-utility.edit';
import { iAdvertiseCommonPath } from './common-utility.type';

export function AdvertiseCommonUtilitiesTable({
	path,
}: {
	path: iAdvertiseCommonPath;
}) {
	const { data, isFetching, isLoading, isError } =
		useAdminAdvertiseCommonUtilitiesQuery({ path });

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
		<div>
			<>
				<div className="border rounded-lg relative">
					{isFetching && <Loader8 />}
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead className="bg-stone-100">#SL.</TableHead>
								<TableHead className="bg-stone-100 capitalize">
									{path?.replace(/_/g, '  ')}
								</TableHead>
								<TableHead className="bg-stone-100">Action </TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{data?.message?.length === 0 ? (
								<TableRow>
									<TableCell
										colSpan={4}
										className="text-center py-8 text-muted-foreground"
									>
										No Category found matching your criteria
									</TableCell>
								</TableRow>
							) : (
								data?.message?.map((category, i) => (
									<TableRow key={category.id}>
										<TableCell className="py-2 pl-4">
											{tableSrCount(1, i)}
										</TableCell>

										<TableCell className="py-2">
											{textCount(category[path], 25)}
										</TableCell>

										<TableCell className="py-2 space-x-2">
											<AdvertiseCommonUtilitiesEdit
												editData={category}
												path={path}
											/>
											<AdvertiseCommonUtilitiesDelete data={category} />
										</TableCell>
									</TableRow>
								))
							)}
						</TableBody>
					</Table>
				</div>
			</>
		</div>
	);
}
