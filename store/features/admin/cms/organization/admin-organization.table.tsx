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
import { cn, ErrorAlert, tableSrCount } from '@/lib';
import { useAdminViewCrmOrganizationQuery } from './admin-organization.api.slice';
import { CrmOrganizationDelete } from './admin-organization.delete';
import { CrmOrganizationEdit } from './admin-organization.edit';

export function CrmOrganizationTable() {
	const { data, isFetching, isLoading, isError } =
		useAdminViewCrmOrganizationQuery({
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
								<TableHead className="bg-stone-100">Description </TableHead>
								<TableHead className="bg-stone-100">Action </TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{data?.data?.length === 0 ? (
								<TableRow>
									<TableCell
										colSpan={3}
										className="text-center py-8 text-muted-foreground"
									>
										No CrmOrganization found matching your criteria
									</TableCell>
								</TableRow>
							) : (
								data?.data?.map((item, i) => (
									<TableRow key={item.id}>
										<TableCell className="py-2 pl-4">
											{tableSrCount(1, i)}
										</TableCell>

										<TableCell
											className={cn('py-2 whitespace-pre-wrap min-w-3xs ')}
										>
											{item.description}
										</TableCell>

										<TableCell className="py-2 space-x-2">
											<CrmOrganizationEdit editData={item} />
											<CrmOrganizationDelete data={item} />
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
