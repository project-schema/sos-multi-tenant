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
import { cn, env, ErrorAlert, tableSrCount } from '@/lib';
import Link from 'next/link';
import { useAdminViewCrmMemberQuery } from './member.api.slice';
import { CrmMemberDelete } from './member.delete';
import { CrmMemberEdit } from './member.edit';

export function CrmMemberTable() {
	const { data, isFetching, isLoading, isError } = useAdminViewCrmMemberQuery({
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
								<TableHead className="bg-stone-100">Name </TableHead>
								<TableHead className="bg-stone-100">Designation </TableHead>
								<TableHead className="bg-stone-100">Links </TableHead>
								<TableHead className="bg-stone-100">Action </TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{data?.data?.length === 0 ? (
								<TableRow>
									<TableCell
										colSpan={6}
										className="text-center py-8 text-muted-foreground"
									>
										No CrmMember found matching your criteria
									</TableCell>
								</TableRow>
							) : (
								data?.data?.map((item, i) => (
									<TableRow key={item.id}>
										<TableCell className="py-2 pl-4">
											{tableSrCount(1, i)}
										</TableCell>
										<TableCell className="py-2">
											<Avatar className="h-12 w-12 rounded-xl">
												<AvatarImage
													src={env.baseAPI + '/' + item.photo}
													alt={'Image'}
												/>
												<AvatarFallback className="rounded-xl bg-sky-100">
													{'I'}
												</AvatarFallback>
											</Avatar>
										</TableCell>

										<TableCell className={cn('py-2 whitespace-pre-wrap')}>
											{item.name}
										</TableCell>

										<TableCell className={cn('py-2 whitespace-pre-wrap')}>
											{item.designation}
										</TableCell>

										<TableCell className={cn('py-2 whitespace-pre-wrap')}>
											<Link href={item.facebook_link} target="_blank">
												{item.facebook_link}
											</Link>
											<br />
											<Link href={item.instagram_link} target="_blank">
												{item.instagram_link}
											</Link>
											<br />
											<Link href={item.twitter_link} target="_blank">
												{item.twitter_link}
											</Link>
										</TableCell>

										<TableCell className="py-2 space-x-2">
											<CrmMemberEdit editData={item} />
											<CrmMemberDelete data={item} />
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
