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
import { dateFormat, tableSrCount, timeFormat } from '@/lib';

import { iPagination } from '@/types';
import { iRegisterCustomer } from './type';

export function VendorProductOrderTable({
	data,
}: {
	data: iPagination<iRegisterCustomer>;
}) {
	const customers = data.data;

	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead className="bg-stone-100">Sr.</TableHead>
					<TableHead className="bg-stone-100">Name</TableHead>
					<TableHead className="bg-stone-100">Email</TableHead>
					<TableHead className="bg-stone-100">Role</TableHead>
					<TableHead className="bg-stone-100">Last Seen</TableHead>
					<TableHead className="bg-stone-100">Created At</TableHead>
					<TableHead className="bg-stone-100">Status</TableHead>
				</TableRow>
			</TableHeader>

			<TableBody>
				{customers.length === 0 ? (
					<TableRow>
						<TableCell
							colSpan={7}
							className="text-center py-8 text-muted-foreground"
						>
							No customers found
						</TableCell>
					</TableRow>
				) : (
					customers.map((item, i) => (
						<TableRow key={item.id}>
							<TableCell className="py-2 pl-4">
								{tableSrCount(data.current_page, i)}
							</TableCell>

							<TableCell className="py-2 font-medium">{item.name}</TableCell>

							<TableCell className="py-2">{item.email}</TableCell>

							<TableCell className="py-2 capitalize">
								<Badge variant="outline">{item.role_type}</Badge>
							</TableCell>

							<TableCell className="py-2">
								{item.last_seen
									? `${dateFormat(item.last_seen)} ${timeFormat(item.last_seen)}`
									: '-'}
							</TableCell>

							<TableCell className="py-2">
								{dateFormat(item.created_at)} <br />
								{timeFormat(item.created_at)}
							</TableCell>

							<TableCell className="py-2">
								<Badge variant={item.last_seen ? 'default' : 'secondary'}>
									{item.last_seen ? 'Active' : 'Inactive'}
								</Badge>
							</TableCell>
						</TableRow>
					))
				)}
			</TableBody>
		</Table>
	);
}
