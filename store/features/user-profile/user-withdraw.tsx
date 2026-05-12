'use client';

import { Container1, Loader8 } from '@/components/dashboard';
import { Pagination1 } from '@/components/dashboard/pagination';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CardTitle } from '@/components/ui/card';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import {
	badgeFormat,
	dateFormat,
	sign,
	tableSrCount,
	textCount,
	timeFormat,
} from '@/lib';
import { Ellipsis } from 'lucide-react';
import { useState } from 'react';
import { iAdminWithdrawal } from '../admin/withdrawal';
import { ViewWithdrawalModal } from '../admin/withdrawal/admin.withdrawal.view-modal';
import {
	useAllBanksQuery,
	useAllWithdrawHistoryQuery,
} from './user-profile-api-slice';
import { UserWithdrawModal } from './user-withdraw-modal';

export function UserWithdraw() {
	const { data: allBanks } = useAllBanksQuery(undefined);
	const [page, setPage] = useState(1);
	const { data, isLoading, isFetching, isError } = useAllWithdrawHistoryQuery({
		status: '',
		page: 1,
	});

	return (
		<Container1
			isError={isError}
			isLoading={isLoading}
			header={
				<>
					<div className="pb-2  flex items-center justify-between">
						<CardTitle>
							All Withdraw
							<p className="text-sm text-yellow-800">
								Minimum Withdraw Amount: {allBanks?.settings?.minimum_withdraw}{' '}
								Tk
							</p>
							{allBanks?.settings?.withdraw_charge_status === 'on' && (
								<p className="text-sm text-yellow-800">
									Withdraw Charge : {allBanks?.settings?.withdraw_charge}%
								</p>
							)}
						</CardTitle>

						<div className="flex items-center gap-2">
							<UserWithdrawModal />
						</div>
					</div>
				</>
			}
		>
			<div className="relative overflow-hidden">
				{isFetching && <Loader8 />}

				<div className="border rounded-lg ">
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead className="bg-stone-100">Sr.</TableHead>
								<TableHead className="bg-stone-100">Id</TableHead>
								<TableHead className="bg-stone-100 w-10">
									Your Bank Nu.
								</TableHead>
								<TableHead className="bg-stone-100">Amount</TableHead>
								<TableHead className="bg-stone-100">Withdraw Charge </TableHead>
								<TableHead className="bg-stone-100">Bank Name</TableHead>
								<TableHead className="bg-stone-100">Branch Name </TableHead>
								<TableHead className="bg-stone-100">AC Holder Name </TableHead>
								<TableHead className="bg-stone-100">Date </TableHead>
								<TableHead className="bg-stone-100">Admin T.ID </TableHead>
								<TableHead className="bg-stone-100">Status </TableHead>
								<TableHead className="bg-stone-100">Action </TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{data?.message?.data?.length === 0 ? (
								<TableRow>
									<TableCell
										colSpan={11}
										className="text-center py-8 text-muted-foreground"
									>
										No items found matching your criteria
									</TableCell>
								</TableRow>
							) : (
								data?.message?.data?.map((item: any, i: number) => (
									<TableRow key={item.id}>
										<TableCell className="py-2 pl-4">
											{tableSrCount(data?.message?.current_page, i)}
										</TableCell>
										<TableCell className="font-medium py-4">
											#{item.uniqid}
										</TableCell>
										<TableCell className="py-2">
											{textCount(item.bank_name, 10)}
										</TableCell>
										<TableCell className="py-2">
											{item.amount} {sign.tk}
										</TableCell>
										<TableCell className="py-2">
											<Badge variant="info">
												{item.charge} {sign.tk}
											</Badge>
										</TableCell>
										<TableCell className="py-2">
											<Badge variant="outline">{item.bank_name}</Badge>
										</TableCell>
										<TableCell className="py-2">
											<Badge variant="success">{item.branch_name || ''} </Badge>
										</TableCell>

										<TableCell className="py-2">
											<Badge variant="default">{item.holder_name || ''} </Badge>
										</TableCell>
										<TableCell className="py-2">
											{dateFormat(item.created_at)} <br />
											{timeFormat(item.created_at)}
										</TableCell>

										<TableCell className="py-2">
											{item.admin_transition_id}
										</TableCell>
										<TableCell className="py-2">
											{item.status && (
												<Badge
													className="capitalize"
													variant={badgeFormat(item.status)}
												>
													{item.status}
												</Badge>
											)}
										</TableCell>

										<TableCell className="py-2">
											<DropDownAction item={item as any} />
										</TableCell>
									</TableRow>
								))
							)}
						</TableBody>
					</Table>
				</div>
			</div>
			<Pagination1 pagination={data?.message} setPage={setPage} />
		</Container1>
	);
}

const DropDownAction = ({ item }: { item: iAdminWithdrawal }) => {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant="outline"
					className="data-[state=open]:bg-muted text-muted-foreground flex size-8"
					size="icon"
				>
					<Ellipsis />
					<span className="sr-only">Open menu</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end" className="w-56">
				{item.status === 'success' && <ViewWithdrawalModal data={item} />}
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
