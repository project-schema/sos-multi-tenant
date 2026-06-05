import { apiSlice } from '../../api/apiSlice';
import type {
	AdminDBAdvertiseData,
	AdminDBCouponsData,
	AdminDBMembershipData,
	AdminDBModuleOverviewData,
	AdminDBOrdersData,
	AdminDBProductsData,
	AdminDBRequestsData,
	AdminDBServiceOrdersData,
	AdminDBServicesData,
	AdminDBSubscriptionData,
	AdminDBSupportData,
	AdminDBUsersData,
	AdminDBWithdrawData,
} from './type';

const adminStatsQueryOptions = {
	refetchOnMountOrArgChange: false,
	refetchOnFocus: false,
	keepUnusedDataFor: 600,
} as const;

const api = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getAdminModuleOverview: builder.query<AdminDBModuleOverviewData, void>({
			query: () => ({
				url: '/admin/statistics/module-overview',
				method: 'GET',
			}),
			providesTags: ['AdminDashboard'],
			...adminStatsQueryOptions,
		}),

		getAdminUsers: builder.query<AdminDBUsersData, void>({
			query: () => ({
				url: '/admin/statistics/users',
				method: 'GET',
			}),
			providesTags: ['AdminDashboard'],
			...adminStatsQueryOptions,
		}),

		getAdminProducts: builder.query<AdminDBProductsData, void>({
			query: () => ({
				url: '/admin/statistics/products',
				method: 'GET',
			}),
			providesTags: ['AdminDashboard'],
			...adminStatsQueryOptions,
		}),

		getAdminRequests: builder.query<AdminDBRequestsData, void>({
			query: () => ({
				url: '/admin/statistics/requests',
				method: 'GET',
			}),
			providesTags: ['AdminDashboard'],
			...adminStatsQueryOptions,
		}),

		getAdminOrders: builder.query<AdminDBOrdersData, void>({
			query: () => ({
				url: '/admin/statistics/orders',
				method: 'GET',
			}),
			providesTags: ['AdminDashboard'],
			...adminStatsQueryOptions,
		}),

		getAdminServices: builder.query<AdminDBServicesData, void>({
			query: () => ({
				url: '/admin/statistics/services',
				method: 'GET',
			}),
			providesTags: ['AdminDashboard'],
			...adminStatsQueryOptions,
		}),

		getAdminServiceOrders: builder.query<AdminDBServiceOrdersData, void>({
			query: () => ({
				url: '/admin/statistics/service-orders',
				method: 'GET',
			}),
			providesTags: ['AdminDashboard'],
			...adminStatsQueryOptions,
		}),

		getAdminAdvertise: builder.query<AdminDBAdvertiseData, void>({
			query: () => ({
				url: '/admin/statistics/advertise',
				method: 'GET',
			}),
			providesTags: ['AdminDashboard'],
			...adminStatsQueryOptions,
		}),

		getAdminCoupons: builder.query<AdminDBCouponsData, void>({
			query: () => ({
				url: '/admin/statistics/coupons',
				method: 'GET',
			}),
			providesTags: ['AdminDashboard'],
			...adminStatsQueryOptions,
		}),

		getAdminMembership: builder.query<AdminDBMembershipData, void>({
			query: () => ({
				url: '/admin/statistics/membership',
				method: 'GET',
			}),
			providesTags: ['AdminDashboard'],
			...adminStatsQueryOptions,
		}),

		getAdminSubscription: builder.query<AdminDBSubscriptionData, void>({
			query: () => ({
				url: '/admin/statistics/subscription',
				method: 'GET',
			}),
			providesTags: ['AdminDashboard'],
			...adminStatsQueryOptions,
		}),

		getAdminSupport: builder.query<AdminDBSupportData, void>({
			query: () => ({
				url: '/admin/statistics/support',
				method: 'GET',
			}),
			providesTags: ['AdminDashboard'],
			...adminStatsQueryOptions,
		}),

		getAdminWithdraw: builder.query<AdminDBWithdrawData, void>({
			query: () => ({
				url: '/admin/statistics/withdraw',
				method: 'GET',
			}),
			providesTags: ['AdminDashboard'],
			...adminStatsQueryOptions,
		}),
	}),
});

export const {
	useGetAdminModuleOverviewQuery,
	useGetAdminUsersQuery,
	useGetAdminProductsQuery,
	useGetAdminRequestsQuery,
	useGetAdminOrdersQuery,
	useGetAdminServicesQuery,
	useGetAdminServiceOrdersQuery,
	useGetAdminAdvertiseQuery,
	useGetAdminCouponsQuery,
	useGetAdminMembershipQuery,
	useGetAdminSubscriptionQuery,
	useGetAdminSupportQuery,
	useGetAdminWithdrawQuery,
} = api;
