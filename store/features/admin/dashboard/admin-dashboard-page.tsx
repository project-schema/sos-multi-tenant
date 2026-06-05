'use client';

import {
	AdminAdvertiseSection,
	AdminCouponsSection,
	AdminMembershipSection,
	AdminModuleOverviewSection,
	AdminOrdersSection,
	AdminProductsSection,
	AdminRequestsSection,
	AdminServicesSection,
	AdminSubscriptionSection,
	AdminSupportSection,
	AdminUsersSection,
	AdminWithdrawSection,
} from './admin-dashboard-sections';
import { useAdminDashboardQueueReset } from './use-in-view-query';

export function AdminDashboardPage() {
	useAdminDashboardQueueReset();
	return (
		<div className="mx-6 mt-4 mb-8 flex flex-col gap-8">
			<div>
				<h1 className="text-2xl font-semibold tracking-tight">
					Admin Dashboard
				</h1>
				<p className="mt-1 text-sm text-muted-foreground">
					Platform statistics by module and status.
				</p>
			</div>

			<AdminModuleOverviewSection />

			<AdminUsersSection />

			<div className="grid gap-6 xl:grid-cols-2">
				<AdminProductsSection />
				<AdminRequestsSection />
			</div>

			<AdminOrdersSection />

			<AdminServicesSection />

			<div className="grid gap-6 xl:grid-cols-2">
				<AdminAdvertiseSection />
				<AdminCouponsSection />
			</div>

			<div className="grid gap-6 xl:grid-cols-2">
				<AdminMembershipSection />
				<AdminSubscriptionSection />
			</div>

			<div className="grid gap-6 xl:grid-cols-2">
				<AdminSupportSection />
				<AdminWithdrawSection />
			</div>
		</div>
	);
}
