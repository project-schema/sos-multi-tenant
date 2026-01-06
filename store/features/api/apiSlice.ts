import { env } from '@/lib';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getSession } from 'next-auth/react';

export const getApiBaseUrl = () => {
	if (typeof window === 'undefined') return `${env.baseAPI}/api`; // fallback for SSR

	const { hostname } = window.location;

	// Check if the hostname is a subdomain of localhost (e.g., testcompany.localhost)
	const parts = hostname.split('.');

	let apiHost = hostname;

	// If format is like testcompany.localhost
	if (parts.length === 2 && parts[1] === 'localhost') {
		// use the same subdomain, but change the port to 8000
		apiHost = `${parts[0]}.localhost`;
	} else if (hostname === 'localhost') {
		// just localhost, no subdomain
		apiHost = 'localhost';
	}

	return `http://${apiHost}:8000/api`;
};

const baseQuery = fetchBaseQuery({
	baseUrl: getApiBaseUrl(),
	prepareHeaders: async (headers) => {
		const session = await getSession(); // Get session from NextAuth
		headers.set('Authorization', `Bearer ${session?.accessToken}`);
		return headers;
	},
});

export const apiSlice = createApi({
	reducerPath: 'api',
	baseQuery,
	endpoints: () => ({}),
	refetchOnReconnect: env.production ? false : true,
	refetchOnMountOrArgChange: env.production ? false : true,
	refetchOnFocus: env.production ? false : true,
	keepUnusedDataFor: 50000,
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

		'VendorBrand',
		'VendorCategory',
		'VendorSubCategory',
		'VendorColor',
		'VendorVariation',
		'VendorUnit',
		'VendorWarehouse',
		'VendorSupplier',
		'VendorCustomer',

		'VendorProduct',
		'VendorProductCreateData',

		'VendorProductOrder',

		'VendorSupport',

		'VendorOrderSource',
		'VendorPickAndDeliveryAddress',
		'VendorDeliveryCharge',
		'VendorPaymentMethods',
		'VendorWooCommerce',
		'VendorCourierCompany',
		'VendorPurchase',
		'VendorProductPurchaseCreateData',

		'VendorShopInfo',

		'VendorPosSales',
		'VendorDamageProducts',
		'VendorWastageProducts',

		'VendorCoupon',

		'DropShipperProduct',
		'DropShipperCart',
		'DropshipperProductOrder',

		'Withdraw',
		'VendorService',
		'VendorBarcodeGenerator',

		'UserSupport',
		'Advertise',
	],
});
