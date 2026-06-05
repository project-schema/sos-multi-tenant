'use client';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import {
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
	type ChartConfig,
} from '@/components/ui/chart';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { cn } from '@/lib/utils';
import type { LucideIcon } from 'lucide-react';
import { ArrowDownRight, ArrowUpRight } from 'lucide-react';
import type { ReactNode } from 'react';
import {
	Bar,
	BarChart,
	CartesianGrid,
	Cell,
	Line,
	LineChart,
	Pie,
	PieChart,
	XAxis,
	YAxis,
} from 'recharts';
import type {
	ModuleTableRow,
	ModuleTrendPoint,
	StatusCount,
	UserTypeGroup,
} from './admin-dashboard-data';

const PIE_COLORS = [
	'#171717',
	'#525252',
	'#737373',
	'#a3a3a3',
	'#d4d4d4',
	'#e5e5e5',
	'#f5f5f5',
];

export function OverviewStatCard({
	title,
	total,
	icon: Icon,
	change,
	trend,
}: {
	title: string;
	total: number;
	icon: LucideIcon;
	change: string;
	trend: 'up' | 'down';
}) {
	return (
		<Card className="shadow-none py-3">
			<CardContent className="lg:px-4">
				<div className="flex items-start justify-between">
					<div className="flex size-9 items-center justify-center rounded-lg border bg-muted/40">
						<Icon className="size-4 text-muted-foreground" />
					</div>
					<span
						className={cn(
							'flex items-center gap-0.5 text-xs font-medium',
							trend === 'up' ? 'text-emerald-600' : 'text-red-600'
						)}
					>
						{trend === 'up' ? (
							<ArrowUpRight className="size-3.5" />
						) : (
							<ArrowDownRight className="size-3.5" />
						)}
						{change}
					</span>
				</div>
				<p className="mt-3 text-sm text-muted-foreground">{title}</p>
				<p className="text-2xl font-semibold tracking-tight">
					{total.toLocaleString()}
				</p>
			</CardContent>
		</Card>
	);
}

export function SectionShell({
	icon: Icon,
	title,
	description,
	total,
	children,
}: {
	icon: LucideIcon;
	title: string;
	description: string;
	total: number;
	children: ReactNode;
}) {
	return (
		<Card className="shadow-none">
			<CardHeader className="border-b pb-4">
				<div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
					<div className="flex items-start gap-3">
						<div className="flex size-10 shrink-0 items-center justify-center rounded-lg border bg-muted/40">
							<Icon className="size-5 text-muted-foreground" />
						</div>
						<div>
							<h3 className="text-lg font-semibold">{title}</h3>
							<p className="text-sm text-muted-foreground">{description}</p>
						</div>
					</div>
					<div className="text-right">
						<p className="text-2xl font-semibold">{total?.toLocaleString()}</p>
						<p className="text-xs text-muted-foreground">Total records</p>
					</div>
				</div>
			</CardHeader>
			<CardContent className="pt-6">{children}</CardContent>
		</Card>
	);
}

export function StatusPills({ statuses }: { statuses: StatusCount[] }) {
	return (
		<div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
			{statuses?.map((s) => (
				<div key={s.label} className="rounded-lg border bg-muted/20 px-4 py-3">
					<div className="flex items-center gap-2">
						<span className={cn('size-2.5 rounded-full', s.color)} />
						<span className="text-sm text-muted-foreground">{s.label}</span>
					</div>
					<p className="mt-1 text-xl font-semibold">
						{s.count?.toLocaleString()}
					</p>
				</div>
			))}
		</div>
	);
}

export function StatusProgressBar({ statuses }: { statuses: StatusCount[] }) {
	const total = statuses?.reduce((s, x) => s + x.count, 0);
	if (total === 0) return null;

	return (
		<div className="space-y-3">
			<div className="flex h-3 overflow-hidden rounded-full">
				{statuses?.map((s) => (
					<div
						key={s.label}
						className={cn(s.color)}
						style={{ width: `${(s.count / total) * 100}%` }}
					/>
				))}
			</div>
			<div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
				{statuses?.map((s) => (
					<span key={s.label} className="flex items-center gap-2">
						<span className={cn('size-2 rounded-full', s.color)} />
						<span className="text-muted-foreground">{s.label}</span>
						<span className="font-medium">
							{s.count?.toLocaleString()} (
							{((s.count / total) * 100).toFixed(1)}
							%)
						</span>
					</span>
				))}
			</div>
		</div>
	);
}

export function StatusPieChart({
	statuses,
	className,
}: {
	statuses: StatusCount[];
	className?: string;
}) {
	const data = statuses?.map((s) => ({ name: s.label, value: s.count }));
	const config = statuses
		? Object?.fromEntries(
				statuses?.map((s, i) => [
					s.label.toLowerCase(),
					{ label: s.label, color: PIE_COLORS[i % PIE_COLORS.length] },
				])
		  )
		: ({} satisfies ChartConfig);

	return (
		<ChartContainer
			config={config}
			className={cn('mx-auto aspect-square max-h-[200px]', className)}
		>
			<PieChart>
				<ChartTooltip content={<ChartTooltipContent hideLabel />} />
				<Pie
					data={data}
					dataKey="value"
					nameKey="name"
					innerRadius={50}
					outerRadius={80}
					paddingAngle={2}
					strokeWidth={2}
					stroke="hsl(var(--background))"
				>
					{data?.map((_, i) => (
						<Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
					))}
				</Pie>
			</PieChart>
		</ChartContainer>
	);
}

export function StatusBarChart({
	statuses,
	layout = 'horizontal',
}: {
	statuses: StatusCount[];
	layout?: 'horizontal' | 'vertical';
}) {
	const data = statuses?.map((s) => ({ status: s.label, count: s.count }));
	const config = {
		count: { label: 'Count', color: 'hsl(0, 0%, 9%)' },
	} satisfies ChartConfig;

	if (layout === 'vertical') {
		return (
			<ChartContainer
				config={config}
				className="aspect-[2/1] max-h-[220px] w-full"
			>
				<BarChart
					data={data ?? []}
					margin={{ top: 4, right: 8, left: 0, bottom: 0 }}
				>
					<CartesianGrid vertical={false} strokeDasharray="3 3" />
					<XAxis
						dataKey="status"
						tickLine={false}
						axisLine={false}
						tick={{ fontSize: 11 }}
					/>
					<YAxis tickLine={false} axisLine={false} />
					<ChartTooltip content={<ChartTooltipContent />} />
					<Bar
						dataKey="count"
						fill="hsl(0, 0%, 9%)"
						radius={[4, 4, 0, 0]}
						maxBarSize={36}
					/>
				</BarChart>
			</ChartContainer>
		);
	}

	return (
		<ChartContainer
			config={config}
			className="aspect-[2/1] max-h-[220px] w-full"
		>
			<BarChart
				layout="vertical"
				data={data ?? []}
				margin={{ top: 4, right: 12, left: 4, bottom: 0 }}
			>
				<CartesianGrid horizontal={false} strokeDasharray="3 3" />
				<XAxis type="number" tickLine={false} axisLine={false} />
				<YAxis
					type="category"
					dataKey="status"
					tickLine={false}
					axisLine={false}
					width={72}
					tick={{ fontSize: 11 }}
				/>
				<ChartTooltip content={<ChartTooltipContent />} />
				<Bar
					dataKey="count"
					fill="hsl(0, 0%, 9%)"
					radius={[0, 4, 4, 0]}
					maxBarSize={18}
				/>
			</BarChart>
		</ChartContainer>
	);
}

export function TrendLineChart({
	data,
	label,
}: {
	data: ModuleTrendPoint[];
	label: string;
}) {
	const config = {
		value: { label, color: 'hsl(0, 0%, 9%)' },
	} satisfies ChartConfig;

	return (
		<ChartContainer
			config={config}
			className="aspect-[2.5/1] max-h-[180px] w-full"
		>
			<LineChart
				data={data ?? []}
				margin={{ top: 8, right: 8, left: 0, bottom: 0 }}
			>
				<CartesianGrid vertical={false} strokeDasharray="3 3" />
				<XAxis
					dataKey="month"
					tickLine={false}
					axisLine={false}
					tickMargin={8}
				/>
				<YAxis tickLine={false} axisLine={false} tickMargin={8} />
				<ChartTooltip content={<ChartTooltipContent />} />
				<Line
					type="monotone"
					dataKey="value"
					stroke="hsl(0, 0%, 9%)"
					strokeWidth={2}
					dot={{ r: 3 }}
				/>
			</LineChart>
		</ChartContainer>
	);
}

export function UserTypeTable({ groups }: { groups: UserTypeGroup[] }) {
	return (
		<Table>
			<TableHeader>
				<TableRow className="hover:bg-transparent">
					<TableHead className="text-muted-foreground">User Type</TableHead>
					<TableHead className="text-right text-muted-foreground">
						Total
					</TableHead>
					<TableHead className="text-right text-muted-foreground">
						Active
					</TableHead>
					<TableHead className="text-right text-muted-foreground">
						Pending
					</TableHead>
					<TableHead className="text-right text-muted-foreground">
						Blocked
					</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{groups?.map((g) => {
					const active =
						g.statuses?.find((s) => s.label === 'Active')?.count ?? 0;
					const pending =
						g.statuses?.find((s) => s.label === 'Pending')?.count ?? 0;
					const blocked =
						g.statuses?.find((s) => s.label === 'Blocked')?.count ?? 0;
					return (
						<TableRow key={g.type}>
							<TableCell className="font-medium">{g.type}</TableCell>
							<TableCell className="text-right font-semibold">
								{g.total.toLocaleString()}
							</TableCell>
							<TableCell className="text-right text-emerald-600">
								{active.toLocaleString()}
							</TableCell>
							<TableCell className="text-right text-amber-600">
								{pending.toLocaleString()}
							</TableCell>
							<TableCell className="text-right text-red-600">
								{blocked.toLocaleString()}
							</TableCell>
						</TableRow>
					);
				})}
			</TableBody>
		</Table>
	);
}

export function SimpleDataTable({
	rows,
	columns,
}: {
	rows: ModuleTableRow[];
	columns: { key: keyof ModuleTableRow; label: string; align?: 'right' }[];
}) {
	return (
		<Table>
			<TableHeader>
				<TableRow className="hover:bg-transparent">
					{columns.map((col) => (
						<TableHead
							key={col.key}
							className={cn(
								'text-muted-foreground',
								col.align === 'right' && 'text-right'
							)}
						>
							{col.label}
						</TableHead>
					))}
				</TableRow>
			</TableHeader>
			<TableBody>
				{rows?.map((row) => (
					<TableRow key={row.id}>
						{columns.map((col) => (
							<TableCell
								key={col.key}
								className={cn(
									col.key === 'id' && 'font-medium',
									col.align === 'right' && 'text-right'
								)}
							>
								{col.key === 'status' ? (
									<Badge variant="outline" className="capitalize">
										{row.status}
									</Badge>
								) : (
									row[col.key]
								)}
							</TableCell>
						))}
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
}

export function StackedPlanTable({
	data,
}: {
	data: { plan: string; merchants: number; dropshippers: number }[];
}) {
	return (
		<Table>
			<TableHeader>
				<TableRow className="hover:bg-transparent">
					<TableHead className="text-muted-foreground">Plan</TableHead>
					<TableHead className="text-right text-muted-foreground">
						Merchants
					</TableHead>
					<TableHead className="text-right text-muted-foreground">
						Dropshippers
					</TableHead>
					<TableHead className="text-right text-muted-foreground">
						Total
					</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{data?.map((row) => (
					<TableRow key={row.plan}>
						<TableCell className="font-medium">{row.plan}</TableCell>
						<TableCell className="text-right">{row.merchants}</TableCell>
						<TableCell className="text-right">{row.dropshippers}</TableCell>
						<TableCell className="text-right font-semibold">
							{(row.merchants + row.dropshippers)?.toLocaleString()}
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
}
