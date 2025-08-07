import { env } from '@/lib';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
	baseUrl: `${env.baseAPI}/api`,
	prepareHeaders: async (headers) => {
		headers.set('Authorization', `Bearer ${env.token}`);
		return headers;
	},
});

export const apiSlice = createApi({
	reducerPath: 'api',
	baseQuery,
	endpoints: () => ({}),
	refetchOnReconnect: true,
	refetchOnFocus: true,
	tagTypes: [
		'UserProfile',
		'AdminUserStatistics',
		'AdminAllUser',

		'AdminCategory',
		'AdminSubCategory',
		'AdminBrand',
		'AdminProduct',
		'AdminProductRequest',
		'AdminProductOrder',

		'AdminServiceCategory',
		'AdminServiceSubCategory',
		'AdminService',
		'AdminServiceOrder',

		'AdminService',
		'AdminOrganization',
		'AdminOrganizationTwo',
		'AdminITService',
		'AdminPartner',
		'AdminSocial',
		'AdminCompanion',
		'AdminMission',
		'AdminTestimonial',
		'AdminMember',
		'AdminAdvertiseFaq',

		'AdminAdvertise',
		'AdminCampaignCategory',
		'AdminConversionLocation',
		'AdminPerformanceGoal',
		'AdminAdFormat',
		'AdminAdvertiseCommonUtilities',

		'AdminCoupon',
		'AdminCouponRequest',
		'AdminWithdrawal',

		'AdminSubscriptionPlan',

		'AdminSupport',
		'AdminSupportCategory',
		'AdminSupportSubCategory',

		'AdminRole',
		'AdminManager',
	],
	keepUnusedDataFor: 50000,
});
