'use client';
import { Loader5, Loader8 } from '@/components/dashboard';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { env, ErrorAlert, tableSrCount } from '@/lib';
import Link from 'next/link';
import { useAdminViewPartnerQuery } from './partner.api.slice';
import { PartnerDelete } from './partner.delete';
import { PartnerEdit } from './partner.edit';

export function PartnerTable() {
	const { data, isFetching, isLoading, isError } = useAdminViewPartnerQuery({
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
								<TableHead className="bg-stone-100">Profile </TableHead>
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
										No Partner found matching your criteria
									</TableCell>
								</TableRow>
							) : (
								data?.data?.map((category, i) => (
									<TableRow key={category.id}>
										<TableCell className="py-2 pl-4">
											{tableSrCount(1, i)}
										</TableCell>
										<TableCell className="py-2">
											<Link href={`/admin/users/${category.id}`}>
												<Avatar className="h-12 w-12 rounded-xl">
													<AvatarImage
														src={env.baseAPI + '/' + category.image}
														alt={'Image'}
													/>
													<AvatarFallback className="rounded-xl bg-sky-100">
														{'I'}
													</AvatarFallback>
												</Avatar>
											</Link>
										</TableCell>

										<TableCell className="py-2 space-x-2">
											<PartnerEdit editData={category} />
											<PartnerDelete data={category} />
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
