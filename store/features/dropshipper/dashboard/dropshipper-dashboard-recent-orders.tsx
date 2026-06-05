'use client';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { sign } from '@/lib';
import { cn } from '@/lib/utils';
import { Search } from 'lucide-react';
import { useMemo, useState } from 'react';

import type { DropshipperRecentOrder } from './dropshipper-dashboard-type';

const statusStyles: Record<string, string> = {
	completed:
		'border-transparent bg-emerald-50 text-emerald-700 hover:bg-emerald-50',
	processing: 'border-transparent bg-blue-50 text-blue-700 hover:bg-blue-50',
	pending: 'border-transparent bg-orange-50 text-orange-700 hover:bg-orange-50',
	cancelled: 'border-transparent bg-red-50 text-red-700 hover:bg-red-50',
};

const defaultStatusStyle =
	'border-transparent bg-muted text-muted-foreground hover:bg-muted';

const ROWS_PER_PAGE_OPTIONS = [5, 10, 15];

export function DropshipperDashboardRecentOrders({
	orders = [],
}: {
	orders?: DropshipperRecentOrder[];
}) {
	const [search, setSearch] = useState('');
	const [page, setPage] = useState(1);
	const [rowsPerPage, setRowsPerPage] = useState(5);

	const filtered = useMemo(() => {
		const q = search.trim().toLowerCase();
		if (!q) return orders;
		return orders.filter(
			(o) =>
				o.customerName.toLowerCase().includes(q) ||
				o.id.toLowerCase().includes(q) ||
				o.product.toLowerCase().includes(q)
		);
	}, [search, orders]);

	const totalPages = Math.max(1, Math.ceil(filtered.length / rowsPerPage));
	const safePage = Math.min(page, totalPages);
	const start = (safePage - 1) * rowsPerPage;
	const pageRows = filtered.slice(start, start + rowsPerPage);

	const pageNumbers = useMemo(() => {
		const pages: number[] = [];
		for (let i = 1; i <= totalPages; i++) {
			if (i === 1 || i === totalPages || Math.abs(i - safePage) <= 1) {
				pages.push(i);
			}
		}
		return [...new Set(pages)].sort((a, b) => a - b);
	}, [safePage, totalPages]);

	return (
		<Card className="shadow-none">
			<CardHeader className="border-b">
				<div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
					<div>
						<div className="flex items-center gap-2">
							<h3 className="text-lg font-semibold">Recent Product Orders</h3>
							<Badge variant="secondary" className="rounded-full font-normal">
								{filtered.length}
							</Badge>
						</div>
						<p className="mt-1 text-sm text-muted-foreground">
							Latest dropshipper product orders from your customers.
						</p>
					</div>
					<div className="flex flex-wrap items-center gap-2">
						<div className="relative min-w-[200px] flex-1 sm:flex-none">
							<Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
							<Input
								placeholder="Search orders..."
								className="pl-9"
								value={search}
								onChange={(e) => {
									setSearch(e.target.value);
									setPage(1);
								}}
							/>
						</div>
					</div>
				</div>
			</CardHeader>
			<CardContent className="p-0">
				<Table>
					<TableHeader>
						<TableRow className="hover:bg-transparent">
							<TableHead className="text-muted-foreground">Customer</TableHead>
							<TableHead className="text-muted-foreground">Order ID</TableHead>
							<TableHead className="text-muted-foreground">Product</TableHead>
							<TableHead className="text-muted-foreground">Date</TableHead>
							<TableHead className="text-right text-muted-foreground">
								Amount
							</TableHead>
							<TableHead className="text-muted-foreground">Status</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{pageRows.map((order) => (
							<TableRow key={order.id}>
								<TableCell>
									<div className="flex items-center gap-3">
										<Avatar className="size-8">
											<AvatarFallback className="bg-muted text-xs font-medium">
												{order.initials}
											</AvatarFallback>
										</Avatar>
										<span className="font-medium">{order.customerName}</span>
									</div>
								</TableCell>
								<TableCell className="text-muted-foreground">
									{order.id}
								</TableCell>
								<TableCell className="max-w-[180px] truncate">
									{order.product}
								</TableCell>
								<TableCell className="text-muted-foreground">
									{order.date}
								</TableCell>
								<TableCell className="text-right font-semibold">
									{order.amount.toLocaleString()} {sign.tk}
								</TableCell>
								<TableCell>
									<Badge
										className={cn(
											'capitalize',
											statusStyles[order.status] ?? defaultStatusStyle
										)}
									>
										{order.status}
									</Badge>
								</TableCell>
							</TableRow>
						))}
						{pageRows.length === 0 && (
							<TableRow>
								<TableCell
									colSpan={6}
									className="h-24 text-center text-muted-foreground"
								>
									No orders found.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</CardContent>
		</Card>
	);
}
