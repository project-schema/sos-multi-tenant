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
import { DynamicIcon } from '@/lib/icon/dynamic-icon';
import { useAdminViewCrmOrganizationTwoQuery } from './admin-organization-two.api.slice';
import { CrmOrganizationTwoDelete } from './admin-organization-two.delete';
import { CrmOrganizationTwoEdit } from './admin-organization-two.edit';

export function CrmOrganizationTwoTable() {
	const { data, isFetching, isLoading, isError } =
		useAdminViewCrmOrganizationTwoQuery({
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
		<div>
			<>
				<div className="border rounded-lg relative">
					{isFetching && <Loader8 />}
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead className="bg-stone-100">#SL.</TableHead>
								<TableHead className="bg-stone-100">Icon </TableHead>
								<TableHead className="bg-stone-100">Title </TableHead>
								<TableHead className="bg-stone-100">Description </TableHead>
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
										No CrmOrganizationTwo found matching your criteria
									</TableCell>
								</TableRow>
							) : (
								data?.data?.map((item, i) => (
									<TableRow key={item.id}>
										<TableCell className="py-2 pl-4">
											{tableSrCount(1, i)}
										</TableCell>

										<TableCell className="py-2">
											<DynamicIcon icon={item.icon} className="!w-8 !h-8" />
										</TableCell>

										<TableCell className="py-2">
											{textCount(item.title, 25)}
										</TableCell>
										<TableCell className={cn('py-2 whitespace-pre-wrap')}>
											{item.description}
										</TableCell>

										<TableCell className="py-2 space-x-2">
											<CrmOrganizationTwoEdit editData={item} />
											<CrmOrganizationTwoDelete data={item} />
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
