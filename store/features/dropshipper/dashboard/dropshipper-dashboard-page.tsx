'use client';

import { Loader9 } from '@/components/dashboard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import {
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
	type ChartConfig,
} from '@/components/ui/chart';
import { ErrorAlert, sign } from '@/lib';
import { BarChart3, Package, TrendingUp } from 'lucide-react';
import {
	Area,
	AreaChart,
	Bar,
	BarChart,
	CartesianGrid,
	Cell,
	Pie,
	PieChart,
	XAxis,
	YAxis,
} from 'recharts';

import { useGetDropshipperDashboardQuery } from './api-slice';
import { DropshipperDashboardMetricCard } from './dropshipper-dashboard-metric-card';
import { DropshipperDashboardRecentOrders } from './dropshipper-dashboard-recent-orders';

const salesChartConfig = {
	orders: { label: 'Orders', color: 'hsl(0, 0%, 9%)' },
	revenue: { label: 'Revenue', color: 'hsl(0, 0%, 45%)' },
} satisfies ChartConfig;

const pipelineChartConfig = {
	value: { label: 'Value', color: 'hsl(0, 0%, 55%)' },
} satisfies ChartConfig;

const productStatusConfig = {
	count: { label: 'Products' },
	active: { label: 'Active', color: 'hsl(142, 76%, 36%)' },
	pending: { label: 'Pending', color: 'hsl(38, 92%, 50%)' },
	rejected: { label: 'Rejected', color: 'hsl(0, 84%, 60%)' },
	expired: { label: 'Expired', color: 'hsl(0, 0%, 60%)' },
} satisfies ChartConfig;

const PIE_GRADIENTS = [
	{ id: 'dsPieG1', from: '#16a34a', to: '#4ade80' },
	{ id: 'dsPieG2', from: '#d97706', to: '#fbbf24' },
	{ id: 'dsPieG3', from: '#dc2626', to: '#f87171' },
	{ id: 'dsPieG4', from: '#737373', to: '#a3a3a3' },
];

export function DropshipperDashboardPage() {
	const { data, isLoading, isError, isFetching, refetch } =
		useGetDropshipperDashboardQuery();

	if (isLoading) {
		return (
			<div className="flex min-h-[50vh] items-center justify-center">
				<Loader9 />
			</div>
		);
	}

	if (isError) {
		return (
			<div className="mx-6 mt-4 mb-8">
				<ErrorAlert title="Failed to load dashboard">
					<p>Could not load dashboard statistics.</p>
					<Button
						variant="outline"
						size="sm"
						className="mt-3"
						onClick={() => refetch()}
					>
						Try again
					</Button>
				</ErrorAlert>
			</div>
		);
	}

	const stats = data?.data;

	if (!stats) {
		return (
			<div className="mx-6 mt-4 mb-8">
				<ErrorAlert title="No dashboard data">
					<p>Dashboard statistics are unavailable.</p>
				</ErrorAlert>
			</div>
		);
	}

	const {
		summaryMetrics,
		weeklySalesData,
		ordersPipeline,
		revenuePipeline,
		productStatusData,
		recentOrders,
	} = stats;

	const weekOrdersTotal = weeklySalesData.reduce((s, d) => s + d.orders, 0);
	const weekRevenueTotal = weeklySalesData.reduce((s, d) => s + d.revenue, 0);
	const productStatusTotal = productStatusData.reduce((s, d) => s + d.count, 0);

	return (
		<div className="relative mx-6 mt-4 mb-8 flex flex-col gap-6">
			{isFetching && (
				<div className="pointer-events-none absolute inset-0 z-10 flex items-start justify-center bg-background/40 pt-24">
					<Loader9 />
				</div>
			)}

			<div>
				<h1 className="text-2xl font-semibold tracking-tight">
					Dropshipper Dashboard
				</h1>
				<p className="mt-1 text-sm text-muted-foreground">
					Overview of products, orders, customers, balance, services, and more.
				</p>
			</div>

			<div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
				{summaryMetrics.map((metric) => (
					<DropshipperDashboardMetricCard key={metric.id} {...metric} />
				))}
			</div>

			<div className="grid gap-6 xl:grid-cols-2">
				<Card className="shadow-none">
					<CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
						<div className="space-y-3">
							<div className="flex items-center gap-2">
								<BarChart3 className="size-4 text-muted-foreground" />
								<h3 className="font-semibold">Weekly Sales Report</h3>
							</div>
							<div>
								<p className="text-3xl font-semibold tracking-tight">
									{weekRevenueTotal.toLocaleString()} {sign.tk}
								</p>
								<p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
									{weekOrdersTotal} orders this week
								</p>
							</div>
						</div>
						<div className="flex items-center gap-4 text-sm">
							<span className="flex items-center gap-1.5">
								<span className="size-2.5 rounded-full bg-foreground" />
								Orders
							</span>
							<span className="flex items-center gap-1.5 text-muted-foreground">
								<span className="size-2.5 rounded-full bg-neutral-500" />
								Revenue
							</span>
						</div>
					</CardHeader>
					<CardContent>
						<ChartContainer
							config={salesChartConfig}
							className="aspect-[2/1] max-h-[280px] w-full"
						>
							<BarChart
								data={weeklySalesData}
								margin={{ top: 8, right: 8, left: 0, bottom: 0 }}
							>
								<CartesianGrid vertical={false} strokeDasharray="3 3" />
								<XAxis
									dataKey="day"
									tickLine={false}
									axisLine={false}
									tickMargin={8}
								/>
								<YAxis
									tickLine={false}
									axisLine={false}
									tickMargin={8}
									tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
								/>
								<ChartTooltip
									content={
										<ChartTooltipContent
											formatter={(value, name) =>
												name === 'revenue'
													? `${Number(value).toLocaleString()} ${sign.tk}`
													: String(value)
											}
										/>
									}
								/>
								<Bar
									dataKey="orders"
									stackId="stack"
									fill="hsl(0, 0%, 9%)"
									radius={[0, 0, 0, 0]}
									maxBarSize={40}
								/>
								<Bar
									dataKey="revenue"
									stackId="stack"
									fill="hsl(0, 0%, 45%)"
									radius={[4, 4, 0, 0]}
									maxBarSize={40}
								/>
							</BarChart>
						</ChartContainer>
					</CardContent>
				</Card>

				<Card className="shadow-none">
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
						<div className="flex items-center gap-2">
							<TrendingUp className="size-4 text-muted-foreground" />
							<h3 className="font-semibold">Performance Overview</h3>
						</div>
					</CardHeader>
					<CardContent className="space-y-6">
						<div className="grid gap-6 sm:grid-cols-2">
							<PipelineAreaChart
								title="Total Orders"
								data={ordersPipeline}
								formatValue={(v) => v.toString()}
							/>
							<PipelineAreaChart
								title="Total Revenue"
								data={revenuePipeline}
								formatValue={(v) => `${(v / 1000).toFixed(0)}k ${sign.tk}`}
							/>
						</div>

						<div className="border-t pt-6">
							<div className="mb-4 flex items-center gap-2">
								<Package className="size-4 text-muted-foreground" />
								<p className="text-sm font-medium text-muted-foreground">
									Product status breakdown ({productStatusTotal} total)
								</p>
							</div>
							{productStatusTotal === 0 ? (
								<p className="py-8 text-center text-sm text-muted-foreground">
									No products in this period.
								</p>
							) : (
								<>
									<ChartContainer
										config={productStatusConfig}
										className="mx-auto aspect-square max-h-[200px]"
									>
										<PieChart>
											<defs>
												{PIE_GRADIENTS.map((g) => (
													<linearGradient
														key={g.id}
														id={g.id}
														x1="0"
														y1="0"
														x2="1"
														y2="1"
													>
														<stop
															offset="0%"
															stopColor={g.from}
															stopOpacity={1}
														/>
														<stop
															offset="100%"
															stopColor={g.to}
															stopOpacity={0.85}
														/>
													</linearGradient>
												))}
											</defs>
											<ChartTooltip
												content={<ChartTooltipContent hideLabel />}
											/>
											<Pie
												data={productStatusData}
												dataKey="count"
												nameKey="status"
												innerRadius={50}
												outerRadius={80}
												paddingAngle={3}
												strokeWidth={2}
												stroke="hsl(var(--background))"
											>
												{productStatusData.map((_, index) => (
													<Cell
														key={`cell-${index}`}
														fill={`url(#${
															PIE_GRADIENTS[index % PIE_GRADIENTS.length].id
														})`}
													/>
												))}
											</Pie>
										</PieChart>
									</ChartContainer>
									<div className="mt-4 flex flex-wrap justify-center gap-3">
										{productStatusData.map((item, i) => (
											<span
												key={item.status}
												className="flex items-center gap-1.5 text-xs text-muted-foreground capitalize"
											>
												<span
													className="size-2 rounded-full"
													style={{
														background: `linear-gradient(135deg, ${
															PIE_GRADIENTS[i % PIE_GRADIENTS.length].from
														}, ${PIE_GRADIENTS[i % PIE_GRADIENTS.length].to})`,
													}}
												/>
												{item.status} ({item.count})
											</span>
										))}
									</div>
								</>
							)}
						</div>
					</CardContent>
				</Card>
			</div>

			<DropshipperDashboardRecentOrders orders={recentOrders} />
		</div>
	);
}

function PipelineAreaChart({
	title,
	data,
	formatValue,
}: {
	title: string;
	data: { month: string; value: number }[];
	formatValue: (v: number) => string;
}) {
	const total = data.reduce((s, d) => s + d.value, 0);
	const gradientId = `ds-area-${title.replace(/\s/g, '')}`;

	return (
		<div>
			<p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
				{title}
			</p>
			<p className="mt-1 text-2xl font-semibold">{formatValue(total)}</p>
			<ChartContainer
				config={pipelineChartConfig}
				className="mt-4 aspect-[2/1] max-h-[140px] w-full"
			>
				<AreaChart
					data={data}
					margin={{ top: 4, right: 4, left: 0, bottom: 0 }}
				>
					<defs>
						<linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
							<stop offset="0%" stopColor="#a3a3a3" stopOpacity={0.45} />
							<stop offset="100%" stopColor="#a3a3a3" stopOpacity={0} />
						</linearGradient>
					</defs>
					<XAxis
						dataKey="month"
						tickLine={false}
						axisLine={false}
						tickMargin={6}
						tick={{ fontSize: 11 }}
					/>
					<ChartTooltip
						content={
							<ChartTooltipContent
								formatter={(value) => formatValue(Number(value))}
							/>
						}
					/>
					<Area
						type="stepAfter"
						dataKey="value"
						stroke="hsl(0, 0%, 30%)"
						strokeWidth={2}
						fill={`url(#${gradientId})`}
					/>
				</AreaChart>
			</ChartContainer>
		</div>
	);
}
