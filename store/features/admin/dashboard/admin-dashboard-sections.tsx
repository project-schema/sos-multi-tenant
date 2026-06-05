'use client';

import type { ReactNode } from 'react';
import {
	OverviewStatCard,
	SectionShell,
	SimpleDataTable,
	StackedPlanTable,
	StatusBarChart,
	StatusPieChart,
	StatusPills,
	StatusProgressBar,
	TrendLineChart,
	UserTypeTable,
} from './admin-dashboard-components';
import {
	AdminSectionError,
	AdminSectionLoader,
	AdminSectionState,
	getSectionUiState,
} from './admin-dashboard-section-state';
import {
	getModuleIcon,
	mapModuleOverview,
	mapUserTypeGroups,
	sumStatusCounts,
	toStatusCounts,
} from './admin-dashboard-utils';
import {
	useGetAdminAdvertiseQuery,
	useGetAdminCouponsQuery,
	useGetAdminMembershipQuery,
	useGetAdminModuleOverviewQuery,
	useGetAdminOrdersQuery,
	useGetAdminProductsQuery,
	useGetAdminRequestsQuery,
	useGetAdminServiceOrdersQuery,
	useGetAdminServicesQuery,
	useGetAdminSubscriptionQuery,
	useGetAdminSupportQuery,
	useGetAdminUsersQuery,
	useGetAdminWithdrawQuery,
} from './api-slice';
import {
	useAdminSectionComplete,
	useAdminSectionFetch,
	useInView,
} from './use-in-view-query';

function LazySection({
	sectionRef,
	inView,
	children,
}: {
	sectionRef: React.RefObject<HTMLDivElement | null>;
	inView: boolean;
	children: ReactNode;
}) {
	return (
		<div ref={sectionRef} className="min-h-[1px]">
			{inView ? children : <AdminSectionLoader />}
		</div>
	);
}

export function AdminModuleOverviewSection() {
	const { ref, inView } = useInView({ immediate: true });
	const canFetch = useAdminSectionFetch('overview', inView);
	const { data, isLoading, isError, refetch, isFetching } =
		useGetAdminModuleOverviewQuery(undefined, { skip: !canFetch });
	const isSettled = isError || !!data;
	useAdminSectionComplete(
		'overview',
		canFetch,
		isLoading || isFetching,
		isSettled
	);

	const { isBusy, showError } = getSectionUiState({
		canFetch,
		inView,
		isLoading,
		isFetching,
		isError,
		hasData: !!data?.data?.adminModuleOverview?.length,
	});

	return (
		<div ref={ref}>
			{isBusy ? (
				<div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6">
					{Array.from({ length: 11 }).map((_, i) => (
						<AdminSectionLoader key={i} />
					))}
				</div>
			) : showError ? (
				<AdminSectionError title="Overview" onRetry={refetch} />
			) : (
				<div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6">
					{mapModuleOverview(data!.data.adminModuleOverview).map((m) => (
						<OverviewStatCard key={m.id} {...m} />
					))}
				</div>
			)}
		</div>
	);
}

export function AdminUsersSection() {
	const { ref, inView } = useInView();
	const canFetch = useAdminSectionFetch('users', inView);
	const { data, isLoading, isError, refetch, isFetching } =
		useGetAdminUsersQuery(undefined, { skip: !canFetch });
	const isSettled = isError || !!data;
	useAdminSectionComplete(
		'users',
		canFetch,
		isLoading || isFetching,
		isSettled
	);
	const stats = data?.data;
	const userTypeGroups = mapUserTypeGroups(stats?.userTypeGroups);

	return (
		<LazySection sectionRef={ref} inView={inView}>
			<AdminSectionState
				title="Users"
				canFetch={canFetch}
				inView={inView}
				isLoading={isLoading}
				isFetching={isFetching}
				isError={isError}
				hasData={!!stats}
				refetch={refetch}
			>
				{stats && (
					<SectionShell
						icon={getModuleIcon('users')}
						title="Users"
						description="Merchants, dropshippers, and end users with active / pending / blocked status"
						total={stats.total}
					>
						<div className="space-y-6">
							<UserTypeTable groups={userTypeGroups} />
							<div className="grid gap-6 lg:grid-cols-2">
								<div>
									<p className="mb-3 text-sm font-medium">
										Distribution by user type
									</p>
									<StatusPieChart
										statuses={userTypeGroups.map((g) => ({
											label: g.type,
											count: g.total,
											color: 'bg-foreground',
										}))}
									/>
								</div>
								<div>
									<p className="mb-3 text-sm font-medium">
										New registrations (6 months)
									</p>
									<TrendLineChart
										data={stats.registrationTrend}
										label="Registrations"
									/>
								</div>
							</div>
							<div className="grid gap-4 sm:grid-cols-3">
								{userTypeGroups.map((g) => (
									<div key={g.type} className="rounded-lg border p-4">
										<p className="text-sm font-semibold">{g.type}</p>
										<StatusPills statuses={g.statuses} />
									</div>
								))}
							</div>
						</div>
					</SectionShell>
				)}
			</AdminSectionState>
		</LazySection>
	);
}

export function AdminProductsSection() {
	const { ref, inView } = useInView();
	const canFetch = useAdminSectionFetch('products', inView);
	const { data, isLoading, isError, refetch, isFetching } =
		useGetAdminProductsQuery(undefined, { skip: !canFetch });
	const isSettled = isError || !!data;
	useAdminSectionComplete(
		'products',
		canFetch,
		isLoading || isFetching,
		isSettled
	);
	const stats = data?.data;
	const statuses = toStatusCounts(stats?.productStatuses);
	const total = sumStatusCounts(stats?.productStatuses);

	return (
		<LazySection sectionRef={ref} inView={inView}>
			<AdminSectionState
				title="Products"
				canFetch={canFetch}
				inView={inView}
				isLoading={isLoading}
				isFetching={isFetching}
				isError={isError}
				hasData={!!stats?.productStatuses}
				refetch={refetch}
			>
				{stats?.productStatuses && (
					<SectionShell
						icon={getModuleIcon('products')}
						title="Products"
						description="Merchant products by approval status"
						total={total}
					>
						<div className="space-y-6">
							<StatusPills statuses={statuses} />
							<StatusProgressBar statuses={statuses} />
							<StatusBarChart statuses={statuses} layout="vertical" />
						</div>
					</SectionShell>
				)}
			</AdminSectionState>
		</LazySection>
	);
}

export function AdminRequestsSection() {
	const { ref, inView } = useInView();
	const canFetch = useAdminSectionFetch('requests', inView);
	const { data, isLoading, isError, refetch, isFetching } =
		useGetAdminRequestsQuery(undefined, { skip: !canFetch });
	const isSettled = isError || !!data;
	useAdminSectionComplete(
		'requests',
		canFetch,
		isLoading || isFetching,
		isSettled
	);
	const stats = data?.data;
	const statuses = toStatusCounts(stats?.requestStatuses);
	const total = sumStatusCounts(stats?.requestStatuses);

	return (
		<LazySection sectionRef={ref} inView={inView}>
			<AdminSectionState
				title="Requests"
				canFetch={canFetch}
				inView={inView}
				isLoading={isLoading}
				isFetching={isFetching}
				isError={isError}
				hasData={!!stats?.requestStatuses}
				refetch={refetch}
			>
				{stats?.requestStatuses && (
					<SectionShell
						icon={getModuleIcon('requests')}
						title="Dropshipper Requests"
						description="Product link requests from dropshippers"
						total={total}
					>
						<div className="space-y-6">
							<StatusPills statuses={statuses} />
							<StatusProgressBar statuses={statuses} />
							<div className="grid gap-6 lg:grid-cols-2">
								<StatusPieChart statuses={statuses} />
								<StatusBarChart statuses={statuses} layout="vertical" />
							</div>
						</div>
					</SectionShell>
				)}
			</AdminSectionState>
		</LazySection>
	);
}

export function AdminOrdersSection() {
	const { ref, inView } = useInView();
	const canFetch = useAdminSectionFetch('orders', inView);
	const { data, isLoading, isError, refetch, isFetching } =
		useGetAdminOrdersQuery(undefined, { skip: !canFetch });
	const isSettled = isError || !!data;
	useAdminSectionComplete(
		'orders',
		canFetch,
		isLoading || isFetching,
		isSettled
	);
	const stats = data?.data;
	const statuses = toStatusCounts(stats?.orderStatuses);
	const total = sumStatusCounts(stats?.orderStatuses);

	return (
		<LazySection sectionRef={ref} inView={inView}>
			<AdminSectionState
				title="Orders"
				canFetch={canFetch}
				inView={inView}
				isLoading={isLoading}
				isFetching={isFetching}
				isError={isError}
				hasData={!!stats?.orderStatuses}
				refetch={refetch}
			>
				{stats?.orderStatuses && (
					<SectionShell
						icon={getModuleIcon('orders')}
						title="Product Orders"
						description="All product orders across merchants by fulfillment status"
						total={total}
					>
						<div className="space-y-6">
							<StatusPills statuses={statuses} />
							<StatusProgressBar statuses={statuses} />
							<div className="grid gap-6 lg:grid-cols-2">
								<StatusPieChart statuses={statuses} />
								<StatusBarChart statuses={statuses} layout="vertical" />
							</div>
						</div>
					</SectionShell>
				)}
			</AdminSectionState>
		</LazySection>
	);
}

export function AdminServicesSection() {
	const { ref, inView } = useInView();
	const canFetch = useAdminSectionFetch('services', inView);
	const servicesQuery = useGetAdminServicesQuery(undefined, {
		skip: !canFetch,
	});
	const servicesReady =
		!servicesQuery.isLoading &&
		!servicesQuery.isFetching &&
		(!!servicesQuery.data || servicesQuery.isError);
	const serviceOrdersQuery = useGetAdminServiceOrdersQuery(undefined, {
		skip: !servicesReady,
	});

	const isLoading =
		servicesQuery.isLoading ||
		servicesQuery.isFetching ||
		serviceOrdersQuery.isLoading ||
		serviceOrdersQuery.isFetching;
	const isError = servicesQuery.isError || serviceOrdersQuery.isError;
	const isSettled =
		(!!servicesQuery.data || servicesQuery.isError) &&
		(!!serviceOrdersQuery.data || serviceOrdersQuery.isError);
	useAdminSectionComplete('services', canFetch, isLoading, isSettled);

	const refetch = () => {
		servicesQuery.refetch();
		if (servicesReady) serviceOrdersQuery.refetch();
	};

	const servicesData = servicesQuery.data?.data;
	const serviceOrdersData = serviceOrdersQuery.data?.data;
	const serviceStatuses = toStatusCounts(servicesData?.serviceStatuses);
	const serviceOrderStatuses = toStatusCounts(
		serviceOrdersData?.serviceOrderStatuses
	);
	const servicesTotal = sumStatusCounts(servicesData?.serviceStatuses);
	const serviceOrdersTotal = sumStatusCounts(
		serviceOrdersData?.serviceOrderStatuses
	);

	return (
		<LazySection sectionRef={ref} inView={inView}>
			<AdminSectionState
				title="Services"
				canFetch={canFetch}
				inView={inView}
				isLoading={isLoading}
				isError={isError}
				hasData={
					!!servicesData?.serviceStatuses &&
					!!serviceOrdersData?.serviceOrderStatuses
				}
				refetch={refetch}
			>
				{servicesData?.serviceStatuses &&
					serviceOrdersData?.serviceOrderStatuses && (
						<SectionShell
							icon={getModuleIcon('services')}
							title="Services"
							description="Listed services and service order pipeline"
							total={servicesTotal}
						>
							<div className="space-y-8">
								<div>
									<p className="mb-4 text-sm font-medium text-muted-foreground">
										Service listings ({servicesTotal})
									</p>
									<div className="grid gap-6 lg:grid-cols-2">
										<StatusPills statuses={serviceStatuses} />
										<StatusPieChart statuses={serviceStatuses} />
									</div>
								</div>
								<div className="border-t pt-6">
									<p className="mb-4 text-sm font-medium text-muted-foreground">
										Service orders ({serviceOrdersTotal})
									</p>
									<StatusPills statuses={serviceOrderStatuses} />
									<div className="mt-4">
										<StatusProgressBar statuses={serviceOrderStatuses} />
									</div>
									<div className="mt-6">
										<StatusBarChart
											statuses={serviceOrderStatuses}
											layout="vertical"
										/>
									</div>
								</div>
							</div>
						</SectionShell>
					)}
			</AdminSectionState>
		</LazySection>
	);
}

export function AdminAdvertiseSection() {
	const { ref, inView } = useInView();
	const canFetch = useAdminSectionFetch('advertise', inView);
	const { data, isLoading, isError, refetch, isFetching } =
		useGetAdminAdvertiseQuery(undefined, { skip: !canFetch });
	const isSettled = isError || !!data;
	useAdminSectionComplete(
		'advertise',
		canFetch,
		isLoading || isFetching,
		isSettled
	);
	const stats = data?.data;
	const statuses = toStatusCounts(stats?.advertiseStatuses);
	const total = sumStatusCounts(stats?.advertiseStatuses);

	return (
		<LazySection sectionRef={ref} inView={inView}>
			<AdminSectionState
				title="Advertise"
				canFetch={canFetch}
				inView={inView}
				isLoading={isLoading}
				isFetching={isFetching}
				isError={isError}
				hasData={!!stats?.advertiseStatuses}
				refetch={refetch}
			>
				{stats?.advertiseStatuses && (
					<SectionShell
						icon={getModuleIcon('advertise')}
						title="Advertise"
						description="Campaigns across the platform"
						total={total}
					>
						<div className="space-y-6">
							<StatusPills statuses={statuses} />
							<StatusProgressBar statuses={statuses} />
							<StatusBarChart statuses={statuses} layout="vertical" />
						</div>
					</SectionShell>
				)}
			</AdminSectionState>
		</LazySection>
	);
}

export function AdminCouponsSection() {
	const { ref, inView } = useInView();
	const canFetch = useAdminSectionFetch('coupons', inView);
	const { data, isLoading, isError, refetch, isFetching } =
		useGetAdminCouponsQuery(undefined, { skip: !canFetch });
	const isSettled = isError || !!data;
	useAdminSectionComplete(
		'coupons',
		canFetch,
		isLoading || isFetching,
		isSettled
	);
	const stats = data?.data;
	const statuses = toStatusCounts(stats?.couponStatuses);
	const total = sumStatusCounts(stats?.couponStatuses);

	return (
		<LazySection sectionRef={ref} inView={inView}>
			<AdminSectionState
				title="Coupons"
				canFetch={canFetch}
				inView={inView}
				isLoading={isLoading}
				isFetching={isFetching}
				isError={isError}
				hasData={!!stats?.couponStatuses}
				refetch={refetch}
			>
				{stats?.couponStatuses && (
					<SectionShell
						icon={getModuleIcon('coupons')}
						title="Coupons"
						description="Active, requested, and rejected coupon codes"
						total={total}
					>
						<div className="space-y-6">
							<StatusPills statuses={statuses} />
							<div className="grid gap-6 lg:grid-cols-2">
								<StatusPieChart statuses={statuses} />
								<StatusBarChart statuses={statuses} layout="vertical" />
							</div>
						</div>
					</SectionShell>
				)}
			</AdminSectionState>
		</LazySection>
	);
}

export function AdminMembershipSection() {
	const { ref, inView } = useInView();
	const canFetch = useAdminSectionFetch('membership', inView);
	const { data, isLoading, isError, refetch, isFetching } =
		useGetAdminMembershipQuery(undefined, { skip: !canFetch });
	const isSettled = isError || !!data;
	useAdminSectionComplete(
		'membership',
		canFetch,
		isLoading || isFetching,
		isSettled
	);
	const stats = data?.data;
	const statuses = toStatusCounts(stats?.membershipStatuses);
	const total = sumStatusCounts(stats?.membershipStatuses);

	return (
		<LazySection sectionRef={ref} inView={inView}>
			<AdminSectionState
				title="Membership"
				canFetch={canFetch}
				inView={inView}
				isLoading={isLoading}
				isFetching={isFetching}
				isError={isError}
				hasData={!!stats?.membershipStatuses}
				refetch={refetch}
			>
				{stats?.membershipStatuses && (
					<SectionShell
						icon={getModuleIcon('membership')}
						title="Membership"
						description="Member accounts and tier distribution"
						total={total}
					>
						<div className="space-y-6">
							<StatusPills statuses={statuses} />
							<StatusProgressBar statuses={statuses} />
							<div>
								<p className="mb-3 text-sm font-medium">Members by tier</p>
								<StatusBarChart
									statuses={(stats.membershipTierBreakdown ?? []).map((t) => ({
										label: t.tier,
										count: t.count,
										color: 'bg-foreground',
									}))}
									layout="vertical"
								/>
							</div>
						</div>
					</SectionShell>
				)}
			</AdminSectionState>
		</LazySection>
	);
}

export function AdminSubscriptionSection() {
	const { ref, inView } = useInView();
	const canFetch = useAdminSectionFetch('subscription', inView);
	const { data, isLoading, isError, refetch, isFetching } =
		useGetAdminSubscriptionQuery(undefined, { skip: !canFetch });
	const isSettled = isError || !!data;
	useAdminSectionComplete(
		'subscription',
		canFetch,
		isLoading || isFetching,
		isSettled
	);
	const stats = data?.data;
	const statuses = toStatusCounts(stats?.subscriptionStatuses);
	const total = sumStatusCounts(stats?.subscriptionStatuses);

	return (
		<LazySection sectionRef={ref} inView={inView}>
			<AdminSectionState
				title="Subscription"
				canFetch={canFetch}
				inView={inView}
				isLoading={isLoading}
				isFetching={isFetching}
				isError={isError}
				hasData={!!stats?.subscriptionStatuses}
				refetch={refetch}
			>
				{stats?.subscriptionStatuses && (
					<SectionShell
						icon={getModuleIcon('subscription')}
						title="Subscription"
						description="SaaS plans subscribed by merchants and dropshippers"
						total={total}
					>
						<div className="space-y-6">
							<StatusPills statuses={statuses} />
							<StatusPieChart statuses={statuses} />
							<div>
								<p className="mb-3 text-sm font-medium">Subscribers by plan</p>
								<StackedPlanTable
									data={stats.subscriptionPlanBreakdown ?? []}
								/>
							</div>
						</div>
					</SectionShell>
				)}
			</AdminSectionState>
		</LazySection>
	);
}

export function AdminSupportSection() {
	const { ref, inView } = useInView();
	const canFetch = useAdminSectionFetch('support', inView);
	const { data, isLoading, isError, refetch, isFetching } =
		useGetAdminSupportQuery(undefined, { skip: !canFetch });
	const isSettled = isError || !!data;
	useAdminSectionComplete(
		'support',
		canFetch,
		isLoading || isFetching,
		isSettled
	);
	const stats = data?.data;
	const statuses = toStatusCounts(stats?.supportStatuses);
	const total = sumStatusCounts(stats?.supportStatuses);

	return (
		<LazySection sectionRef={ref} inView={inView}>
			<AdminSectionState
				title="Support"
				canFetch={canFetch}
				inView={inView}
				isLoading={isLoading}
				isFetching={isFetching}
				isError={isError}
				hasData={!!stats?.supportStatuses}
				refetch={refetch}
			>
				{stats?.supportStatuses && (
					<SectionShell
						icon={getModuleIcon('support')}
						title="Support"
						description="Support tickets by resolution status"
						total={total}
					>
						<div className="space-y-6">
							<StatusPills statuses={statuses} />
							<div className="grid gap-6 lg:grid-cols-2">
								<StatusPieChart statuses={statuses} />
								<StatusBarChart statuses={statuses} layout="vertical" />
							</div>
						</div>
					</SectionShell>
				)}
			</AdminSectionState>
		</LazySection>
	);
}

export function AdminWithdrawSection() {
	const { ref, inView } = useInView();
	const canFetch = useAdminSectionFetch('withdraw', inView);
	const { data, isLoading, isError, refetch, isFetching } =
		useGetAdminWithdrawQuery(undefined, { skip: !canFetch });
	const isSettled = isError || !!data;
	useAdminSectionComplete(
		'withdraw',
		canFetch,
		isLoading || isFetching,
		isSettled
	);
	const stats = data?.data;
	const statuses = toStatusCounts(stats?.withdrawStatuses);
	const total = sumStatusCounts(stats?.withdrawStatuses);

	return (
		<LazySection sectionRef={ref} inView={inView}>
			<AdminSectionState
				title="Withdraw"
				canFetch={canFetch}
				inView={inView}
				isLoading={isLoading}
				isFetching={isFetching}
				isError={isError}
				hasData={!!stats?.withdrawStatuses}
				refetch={refetch}
			>
				{stats?.withdrawStatuses && (
					<SectionShell
						icon={getModuleIcon('withdraw')}
						title="Withdraw"
						description="Withdrawal requests and payout status"
						total={total}
					>
						<div className="space-y-6">
							<StatusPills statuses={statuses} />
							<StatusProgressBar statuses={statuses} />
							{stats.withdrawRecent?.length > 0 && (
								<div>
									<p className="mb-3 text-sm font-medium">Recent withdrawals</p>
									<SimpleDataTable
										rows={stats.withdrawRecent}
										columns={[
											{ key: 'id', label: 'ID' },
											{ key: 'name', label: 'Tenant' },
											{ key: 'amount', label: 'Amount', align: 'right' },
											{ key: 'status', label: 'Status' },
											{ key: 'date', label: 'Date', align: 'right' },
										]}
									/>
								</div>
							)}
						</div>
					</SectionShell>
				)}
			</AdminSectionState>
		</LazySection>
	);
}
