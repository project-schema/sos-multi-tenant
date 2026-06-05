'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
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
import { ArrowUpDown, Filter, Search } from 'lucide-react';
import { useMemo, useState } from 'react';

import type { VendorTopSellingProduct } from '../../vendor/dashboard/type';

export function DropshipperDashboardTopProducts({
	products = [],
}: {
	products?: VendorTopSellingProduct[];
}) {
	const [search, setSearch] = useState('');

	const filtered = useMemo(() => {
		const q = search.trim().toLowerCase();
		if (!q) return products;
		return products.filter((p) => p.name.toLowerCase().includes(q));
	}, [search, products]);

	return (
		<Card className="shadow-none">
			<CardHeader className="border-b">
				<div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
					<div>
						<div className="flex items-center gap-2">
							<h3 className="text-lg font-semibold">
								Top Dropshipper Products
							</h3>
							<Badge variant="secondary" className="rounded-full font-normal">
								{products.length}
							</Badge>
						</div>
						<p className="mt-1 text-sm text-muted-foreground">
							Best performing products by quantity sold and revenue.
						</p>
					</div>
					<div className="flex flex-wrap items-center gap-2">
						<div className="relative min-w-[200px] flex-1 sm:flex-none">
							<Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
							<Input
								placeholder="Search products..."
								className="pl-9"
								value={search}
								onChange={(e) => setSearch(e.target.value)}
							/>
						</div>
						<Button variant="outline" size="sm">
							<Filter className="size-4" />
							Filter
						</Button>
					</div>
				</div>
			</CardHeader>
			<CardContent className="p-0">
				<Table>
					<TableHeader>
						<TableRow className="hover:bg-transparent">
							<TableHead className="w-14 text-muted-foreground">#</TableHead>
							<TableHead className="text-muted-foreground">
								<span className="inline-flex items-center gap-1">
									Product Name
									<ArrowUpDown className="size-3.5" />
								</span>
							</TableHead>
							<TableHead className="text-right text-muted-foreground">
								Sold Qty
							</TableHead>
							<TableHead className="text-right text-muted-foreground">
								Revenue
							</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{filtered.length === 0 && (
							<TableRow>
								<TableCell
									colSpan={5}
									className="h-24 text-center text-muted-foreground"
								>
									No products found.
								</TableCell>
							</TableRow>
						)}
						{filtered.map((product) => (
							<TableRow key={product.rank}>
								<TableCell className="font-medium">{product.rank}</TableCell>
								<TableCell className="font-medium">{product.name}</TableCell>
								<TableCell className="text-right text-muted-foreground">
									{product.sold}
								</TableCell>
								<TableCell className="text-right font-semibold">
									{product.revenue.toLocaleString()} {sign.tk}
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</CardContent>
		</Card>
	);
}
