'use client';

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';

import { Badge } from '@/components/ui/badge';
import {
	badgeFormat,
	dateFormat,
	tableSrCount,
	textCount,
	timeFormat,
} from '@/lib';

import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';
import { iPagination } from '@/types';
import { Ellipsis, LoaderCircle } from 'lucide-react';
import {
	useAdminSupportCloseMutation,
	useAdminSupportDeleteMutation,
} from './admin.support.api.slice';
import { AdminSupportAssignModal } from './admin.support.assign';
import { AdminSupportClose } from './admin.support.close';
import { AdminSupportDelete } from './admin.support.delete';
import { iAdminSupport } from './admin.support.type';

export function AdminSupportTable({
	data,
}: {
	data: iPagination<iAdminSupport>;
}) {
	const advertises = data.data;
	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead className="bg-stone-100">SL.</TableHead>
					<TableHead className="bg-stone-100 w-10">Ticket ID </TableHead>
					<TableHead className="bg-stone-100"> Subject </TableHead>
					<TableHead className="bg-stone-100">Description </TableHead>
					<TableHead className="bg-stone-100">Category </TableHead>
					<TableHead className="bg-stone-100">Problem Topic </TableHead>
					<TableHead className="bg-stone-100">Rating </TableHead>
					<TableHead className="bg-stone-100">Date </TableHead>
					<TableHead className="bg-stone-100">Status </TableHead>
					<TableHead className="bg-stone-100">Action </TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{advertises.length === 0 ? (
					<TableRow>
						<TableCell
							colSpan={10}
							className="text-center py-8 text-muted-foreground"
						>
							No items found matching your criteria
						</TableCell>
					</TableRow>
				) : (
					advertises?.map((item, i) => (
						<TableRow key={item.id}>
							<TableCell className="py-2 pl-4">
								{tableSrCount(data.current_page, i)}
							</TableCell>
							<TableCell className="font-medium py-4">
								#{item.ticket_no}
							</TableCell>
							<TableCell className="py-2">
								{textCount(item?.subject, 15)}
							</TableCell>
							<TableCell className="py-2">
								{textCount(item?.description, 15)}
							</TableCell>
							<TableCell className="py-2">
								{textCount(item?.category?.name, 15)}
							</TableCell>
							<TableCell className="py-2">
								{textCount(item?.problem_topic?.name, 15)}
							</TableCell>
							<TableCell className="py-2">{item.rating}</TableCell>
							<TableCell className="py-2">
								{dateFormat(item.created_at.toString())} <br />
								{timeFormat(item.created_at.toString())}
							</TableCell>
							<TableCell className="py-2">
								<Badge
									className="capitalize"
									variant={badgeFormat(item.status)}
								>
									{item.status}
								</Badge>
							</TableCell>

							<TableCell className="py-2">
								<DropDownAction item={item} />
							</TableCell>
						</TableRow>
					))
				)}
			</TableBody>
		</Table>
	);
}
const DropDownAction = ({ item }: { item: iAdminSupport }) => {
	const [mutation, { isLoading }] = useAdminSupportDeleteMutation();
	const [close, { isLoading: isLoadingClose }] = useAdminSupportCloseMutation();

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant="outline"
					className="data-[state=open]:bg-muted text-muted-foreground flex size-8"
					size="icon"
					disabled={isLoading || isLoadingClose}
				>
					{isLoading || isLoadingClose ? (
						<LoaderCircle className="size-4 animate-spin text-destructive" />
					) : (
						<Ellipsis />
					)}
					<span className="sr-only">Open menu</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end" className="w-56">
				{item?.is_close?.toString() !== '1' && (
					<AdminSupportAssignModal data={item} />
				)}
				{item?.is_close?.toString() !== '1' && (
					<AdminSupportClose
						data={item}
						isLoading={isLoadingClose}
						mutation={close}
					/>
				)}
				<Separator />
				<AdminSupportDelete
					data={item}
					isLoading={isLoading}
					mutation={mutation}
				/>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
