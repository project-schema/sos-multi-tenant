'use client';

import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { ArrowDownRight, ArrowUpRight } from 'lucide-react';
import type { ModuleOverview } from './admin-dashboard-data';

export function AdminDashboardMetricCard({
	title,
	total,
	change,
	trend,
	icon: Icon,
}: ModuleOverview) {
	return (
		<Card className="shadow-none">
			<CardContent>
				<div className="flex items-start justify-between">
					<div className="flex size-10 items-center justify-center rounded-lg border bg-muted/40">
						<Icon className="size-5 text-muted-foreground" />
					</div>
				</div>
				<p className="mt-4 text-sm text-muted-foreground">{title}</p>
				<p className="mt-1 text-3xl font-semibold tracking-tight">
					{total.toLocaleString()}
				</p>
				<p
					className={cn(
						'mt-3 flex items-center gap-1 text-sm font-medium',
						trend === 'up' ? 'text-emerald-600' : 'text-red-600'
					)}
				>
					{trend === 'up' ? (
						<ArrowUpRight className="size-4" />
					) : (
						<ArrowDownRight className="size-4" />
					)}
					{change}
				</p>
			</CardContent>
		</Card>
	);
}
