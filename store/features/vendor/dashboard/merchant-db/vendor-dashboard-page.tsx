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
import {
	BarChart3,
	Calendar,
	Download,
	Globe,
	Package,
	TrendingUp,
} from 'lucide-react';
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
import { useGetVendorDashboardQuery } from '../api-slice';
import { VendorDashboardMetricCard } from './vendor-dashboard-metric-card';
import { VendorDashboardRecentOrders } from './vendor-dashboard-recent-orders';
import { VendorDashboardTopProducts } from './vendor-dashboard-top-products';

const revenueChartConfig = {
	revenue: { label: 'Revenue', color: 'hsl(0, 0%, 9%)' },
	expenses: { label: 'Expenses', color: 'hsl(0, 0%, 45%)' },
} satisfies ChartConfig;

const pipelineChartConfig = {
	value: { label: 'Value', color: 'hsl(0, 0%, 55%)' },
} satisfies ChartConfig;

const ordersPieConfig = {
	orders: { label: 'Orders' },
	completed: { label: 'Completed', color: 'hsl(0, 0%, 20%)' },
	processing: { label: 'Processing', color: 'hsl(0, 0%, 40%)' },
	pending: { label: 'Pending', color: 'hsl(0, 0%, 60%)' },
	cancelled: { label: 'Cancelled', color: 'hsl(0, 0%, 80%)' },
} satisfies ChartConfig;

const PIE_GRADIENTS = [
	{ id: 'pieG1', from: '#171717', to: '#525252' },
	{ id: 'pieG2', from: '#404040', to: '#737373' },
	{ id: 'pieG3', from: '#737373', to: '#a3a3a3' },
	{ id: 'pieG4', from: '#a3a3a3', to: '#d4d4d4' },
];

export function VendorDashboardPage() {
	const { data, isLoading, isError, isFetching, refetch } =
		useGetVendorDashboardQuery();

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
		weeklyRevenueData,
		salesPipelineOrders,
		salesPipelineSales,
		ordersOverviewData,
		recentOrders,
		topSellingProducts,
	} = stats;

	const weekRevenueTotal = weeklyRevenueData.reduce((s, d) => s + d.revenue, 0);
	const ordersPieTotal = ordersOverviewData.reduce((s, d) => s + d.orders, 0);

	return (
		<div className="relative mx-6 mt-4 mb-8 flex flex-col gap-6">
			{isFetching && (
				<div className="pointer-events-none absolute inset-0 z-10 flex items-start justify-center bg-background/40 pt-24">
					<Loader9 />
				</div>
			)}

			<div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
				<div>
					<h1 className="text-2xl font-semibold tracking-tight">
						Dashboard Overview
					</h1>
					<p className="mt-1 text-sm text-muted-foreground">
						A summary for all the purchases, sales, orders and performance.
					</p>
				</div>
				<div hidden className="flex flex-wrap items-center gap-2">
					<Button variant="outline" size="sm" className="h-9 gap-2">
						<Calendar className="size-4" />
						Jan 1 – 31, 2025
					</Button>
					<Button variant="outline" size="sm" className="h-9 gap-2">
						<Globe className="size-4" />
						All Platforms
					</Button>
					<Button variant="outline" size="sm" className="h-9 gap-2">
						<Package className="size-4" />
						All Products
					</Button>
					<Button variant="outline" size="sm" className="h-9 gap-2">
						<Download className="size-4" />
						Export
					</Button>
				</div>
			</div>

			<div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
				{summaryMetrics.map((metric) => (
					<VendorDashboardMetricCard key={metric.id} {...metric} />
				))}
			</div>

			<div className="grid gap-6 xl:grid-cols-2">
				<Card className="shadow-none">
					<CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
						<div className="space-y-3">
							<div className="flex items-center gap-2">
								<BarChart3 className="size-4 text-muted-foreground" />
								<h3 className="font-semibold">Sales Report</h3>
							</div>
							<div>
								<p className="text-3xl font-semibold tracking-tight">
									{weekRevenueTotal.toLocaleString()} {sign.tk}
								</p>
								<p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
									This week vs last week
								</p>
							</div>
						</div>
						<div className="flex items-center gap-4 text-sm">
							<span className="flex items-center gap-1.5">
								<span className="size-2.5 rounded-full bg-foreground" />
								Revenue
							</span>
							<span className="flex items-center gap-1.5 text-muted-foreground">
								<span className="size-2.5 rounded-full bg-neutral-500" />
								Expenses
							</span>
						</div>
					</CardHeader>
					<CardContent>
						<ChartContainer
							config={revenueChartConfig}
							className="aspect-[2/1] max-h-[280px] w-full"
						>
							<BarChart
								data={weeklyRevenueData}
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
											formatter={(value) =>
												`${Number(value).toLocaleString()} ${sign.tk}`
											}
										/>
									}
								/>
								<Bar
									dataKey="revenue"
									stackId="stack"
									fill="hsl(0, 0%, 9%)"
									radius={[0, 0, 0, 0]}
									maxBarSize={40}
								/>
								<Bar
									dataKey="expenses"
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
							<h3 className="font-semibold">Orders Overview</h3>
						</div>
					</CardHeader>
					<CardContent className="space-y-6">
						<div className="grid gap-6 sm:grid-cols-2">
							<PipelineAreaChart
								title="Total Orders"
								data={salesPipelineOrders}
								formatValue={(v) => v.toString()}
							/>
							<PipelineAreaChart
								title="Total Sales"
								data={salesPipelineSales}
								formatValue={(v) => `${(v / 1000).toFixed(0)}k ${sign.tk}`}
							/>
						</div>

						<div className="border-t pt-6">
							<p className="mb-4 text-sm font-medium text-muted-foreground">
								Order status breakdown
							</p>
							{ordersPieTotal === 0 ? (
								<p className="py-8 text-center text-sm text-muted-foreground">
									No orders in this period.
								</p>
							) : (
								<>
									<ChartContainer
										config={ordersPieConfig}
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
												data={ordersOverviewData}
												dataKey="orders"
												nameKey="status"
												innerRadius={50}
												outerRadius={80}
												paddingAngle={3}
												strokeWidth={2}
												stroke="hsl(var(--background))"
											>
												{ordersOverviewData.map((_, index) => (
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
										{ordersOverviewData.map((item, i) => (
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
												{item.status} ({item.orders})
											</span>
										))}
									</div>
								</>
							)}
						</div>
					</CardContent>
				</Card>
			</div>

			<VendorDashboardRecentOrders orders={recentOrders} />
			<VendorDashboardTopProducts products={topSellingProducts} />
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
	const gradientId = `area-${title.replace(/\s/g, '')}`;

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
