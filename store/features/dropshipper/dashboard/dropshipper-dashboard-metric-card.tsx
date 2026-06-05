'use client';

import { Card, CardContent } from '@/components/ui/card';
import { sign } from '@/lib';
import { cn } from '@/lib/utils';
import { ArrowDownRight, ArrowUpRight } from 'lucide-react';

import type { DropshipperDashboardMetric } from './dropshipper-dashboard-type';

export function DropshipperDashboardMetricCard({
	title,
	value,
	format,
	change,
	trend,
	footer,
}: DropshipperDashboardMetric) {
	const displayValue =
		format === 'currency'
			? `${value.toLocaleString()} ${sign.tk}`
			: value.toLocaleString();

	return (
		<Card className="shadow-none">
			<CardContent>
				<p className="text-sm text-muted-foreground">{title}</p>
				<p className="mt-2 text-3xl font-semibold tracking-tight">
					{displayValue}
				</p>
				<p
					className={cn(
						'mt-2 flex items-center gap-1 text-sm font-medium',
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
				<p className="mt-6 text-xs text-muted-foreground">{footer}</p>
			</CardContent>
		</Card>
	);
}
