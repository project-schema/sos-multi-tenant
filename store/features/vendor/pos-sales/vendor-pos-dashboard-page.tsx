'use client';

import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import {
	CreditCard,
	RotateCcw,
	ShoppingCart,
	Store,
	Users,
} from 'lucide-react';
import {
	OverviewStatCard,
	SectionShell,
	SimpleDataTable,
	StatusBarChart,
	StatusPieChart,
	StatusPills,
	StatusProgressBar,
	TrendLineChart,
} from '../../admin/dashboard/admin-dashboard-components';
import {
	posCustomerStatuses,
	posOrderStatuses,
	posOverviewStats,
	posPaymentStatuses,
	posQuickMetrics,
	posReturnStatuses,
	posRevenueTrend,
	posSalesTrend,
	recentPosOrders,
	recentPosPayments,
	recentPosReturns,
	sumStatusCounts,
} from './vendor-pos-dashboard-data';

export function VendorPosDashboardPage() {
	const totalOrders = sumStatusCounts(posOrderStatuses);
	const totalPayments = sumStatusCounts(posPaymentStatuses);
	const totalCustomers = sumStatusCounts(posCustomerStatuses);
	const totalReturns = sumStatusCounts(posReturnStatuses);

	return (
		<div className="mx-6 mt-4 mb-8 flex flex-col gap-8">
			<div>
				<h1 className="text-2xl font-semibold tracking-tight">POS Dashboard</h1>
				<p className="mt-1 text-sm text-muted-foreground">
					Overview of customers, sales, orders, payments, and returns. Static
					preview data — API integration coming soon.
				</p>
			</div>

			<div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
				{posQuickMetrics.map((metric) => (
					<Card key={metric.label} className="shadow-none py-3">
						<CardContent className="lg:px-4">
							<p className="text-sm text-muted-foreground">{metric.label}</p>
							<p className="mt-1 text-2xl font-semibold tracking-tight">
								{metric.value}
							</p>
						</CardContent>
					</Card>
				))}
			</div>

			<div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5">
				{posOverviewStats.map((stat) => (
					<Link key={stat.id} href={stat.href} className="block">
						<OverviewStatCard {...stat} />
					</Link>
				))}
			</div>

			<SectionShell
				icon={ShoppingCart}
				title="POS Orders"
				description="Order volume, payment status, and recent POS transactions"
				total={totalOrders}
			>
				<div className="space-y-6">
					<div>
						<h4 className="mb-3 text-sm font-medium">Payment Status</h4>
						<StatusPills statuses={posPaymentStatuses} />
						<div className="mt-4">
							<StatusProgressBar statuses={posPaymentStatuses} />
						</div>
					</div>

					<div>
						<h4 className="mb-3 text-sm font-medium">Order Status</h4>
						<StatusPills statuses={posOrderStatuses} />
						<div className="mt-4 grid gap-6 lg:grid-cols-2">
							<StatusPieChart statuses={posOrderStatuses} />
							<StatusBarChart statuses={posOrderStatuses} layout="vertical" />
						</div>
					</div>

					<div>
						<h4 className="mb-3 text-sm font-medium">Recent Orders</h4>
						<SimpleDataTable
							rows={recentPosOrders}
							columns={[
								{ key: 'id', label: 'Order ID' },
								{ key: 'name', label: 'Customer' },
								{ key: 'status', label: 'Payment' },
								{ key: 'amount', label: 'Amount', align: 'right' },
								{ key: 'date', label: 'Date', align: 'right' },
							]}
						/>
					</div>
				</div>
			</SectionShell>

			<div className="grid gap-6 xl:grid-cols-2">
				<SectionShell
					icon={Users}
					title="POS Customer"
					description="Registered POS customers by account status"
					total={totalCustomers}
				>
					<div className="space-y-6">
						<StatusPills statuses={posCustomerStatuses} />
						<StatusProgressBar statuses={posCustomerStatuses} />
						<div className="grid gap-6 lg:grid-cols-2">
							<StatusPieChart statuses={posCustomerStatuses} />
							<StatusBarChart
								statuses={posCustomerStatuses}
								layout="vertical"
							/>
						</div>
					</div>
				</SectionShell>

				<SectionShell
					icon={CreditCard}
					title="POS Payment History"
					description="Payment methods and recent collection activity"
					total={totalPayments}
				>
					<div className="space-y-6">
						<StatusPills statuses={posPaymentStatuses} />
						<StatusBarChart statuses={posPaymentStatuses} layout="vertical" />
						<div>
							<h4 className="mb-3 text-sm font-medium">Recent Payments</h4>
							<SimpleDataTable
								rows={recentPosPayments}
								columns={[
									{ key: 'id', label: 'Payment ID' },
									{ key: 'name', label: 'Method' },
									{ key: 'status', label: 'Status' },
									{ key: 'amount', label: 'Amount', align: 'right' },
									{ key: 'date', label: 'Date', align: 'right' },
								]}
							/>
						</div>
					</div>
				</SectionShell>
			</div>

			<div className="grid gap-6 xl:grid-cols-2">
				<SectionShell
					icon={Store}
					title="POS Sales"
					description="Monthly sales count trend"
					total={1842}
				>
					<TrendLineChart data={posSalesTrend} label="Sales" />
				</SectionShell>

				<SectionShell
					icon={CreditCard}
					title="POS Revenue"
					description="Monthly revenue trend from POS sales"
					total={2898000}
				>
					<TrendLineChart data={posRevenueTrend} label="Revenue" />
				</SectionShell>
			</div>

			<SectionShell
				icon={RotateCcw}
				title="POS Sales Return"
				description="Return requests and approval breakdown"
				total={totalReturns}
			>
				<div className="space-y-6">
					<StatusPills statuses={posReturnStatuses} />
					<StatusProgressBar statuses={posReturnStatuses} />
					<div className="grid gap-6 lg:grid-cols-2">
						<StatusPieChart statuses={posReturnStatuses} />
						<StatusBarChart statuses={posReturnStatuses} layout="vertical" />
					</div>
					<div>
						<h4 className="mb-3 text-sm font-medium">Recent Returns</h4>
						<SimpleDataTable
							rows={recentPosReturns}
							columns={[
								{ key: 'id', label: 'Return ID' },
								{ key: 'name', label: 'Order Ref' },
								{ key: 'status', label: 'Status' },
								{ key: 'amount', label: 'Amount', align: 'right' },
								{ key: 'date', label: 'Date', align: 'right' },
							]}
						/>
					</div>
				</div>
			</SectionShell>
		</div>
	);
}
