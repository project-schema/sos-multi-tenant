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
import { useAdminViewCrmAdvertiseFaqQuery } from './crm-admin-advertise-faq.api.slice';
import { CrmAdvertiseFaqDelete } from './crm-admin-advertise-faq.delete';
import { CrmAdvertiseFaqEdit } from './crm-admin-advertise-faq.edit';

export function CrmAdvertiseFaqTable() {
	const { data, isFetching, isLoading, isError } =
		useAdminViewCrmAdvertiseFaqQuery({
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
								<TableHead className="bg-stone-100">Heading </TableHead>
								<TableHead className="bg-stone-100">Description </TableHead>
								<TableHead className="bg-stone-100">Action </TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{data?.datas?.length === 0 ? (
								<TableRow>
									<TableCell
										colSpan={4}
										className="text-center py-8 text-muted-foreground"
									>
										No CrmAdvertiseFaq found matching your criteria
									</TableCell>
								</TableRow>
							) : (
								data?.datas?.map((item, i) => (
									<TableRow key={item.id}>
										<TableCell className="py-2 pl-4">
											{tableSrCount(1, i)}
										</TableCell>

										<TableCell className={cn('py-2 whitespace-pre-wrap')}>
											{item.heading}
										</TableCell>

										<TableCell className={cn('py-2 whitespace-pre-wrap')}>
											{item.description}
										</TableCell>

										<TableCell className="py-2 space-x-2">
											<CrmAdvertiseFaqEdit editData={item} />
											<CrmAdvertiseFaqDelete data={item} />
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
