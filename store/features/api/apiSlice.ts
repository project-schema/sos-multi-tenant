import { env } from '@/lib';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getSession } from 'next-auth/react';

export const getApiBaseUrl1 = () => {
	if (typeof window === 'undefined') return `${env.baseAPI}/api`;

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

	if (!env.baseAPI.includes('localhost')) {
		const domain = env.baseAPI.split('//')[1];
		apiHost = `${parts[0]}.${domain}`;
	}

	return `http://${apiHost}:8000/api`;
};

export const getApiBaseUrl = () => {
	// SSR
	if (typeof window === 'undefined') {
		return `${env.baseAPI}/api`;
	}

	const { hostname } = window.location;
	const parts = hostname.split('.'); // [subdomain, domain, tld]

	// ─────────────────────────────
	// API LOCALHOST MODE
	// ─────────────────────────────
	if (env.baseAPI.includes('localhost')) {
		// two.localhost → http://two.localhost:8000/api
		if (parts.length === 2 && parts[1] === 'localhost') {
			return `http://${hostname}:8000/api`;
		}

		// localhost → http://localhost:8000/api
		return 'http://localhost:8000/api';
	}

	// ─────────────────────────────
	// API LIVE MODE AND FRONTEND LoCAL
	// ─────────────────────────────

	const apiDomain = env.baseAPI.replace(/^https?:\/\//, ''); // storeeb.com
	const subdomain = parts[0]; // two

	if (!env.baseAPI.includes('localhost') && hostname.includes('localhost')) {
		if (parts.length === 2 && subdomain) {
			return `https://${subdomain}.${apiDomain}/api`;
		}
		return `https://${apiDomain}/api`;
	}

	// ─────────────────────────────
	// PRODUCTION MODE
	// env.baseAPI = https://storeeb.com
	// frontend = two.storeeb.com
	// result   = https://two.storeeb.com/api
	// ─────────────────────────────

	if (parts.length === 3 && subdomain) {
		return `https://${subdomain}.${apiDomain}/api`;
	}
	return `https://${apiDomain}/api`;
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
		'AdminBlog',
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

		'Wishlist',
		'Cart',
		'AccountOrders',

		'TenantBanner',
		'HomeOffer',
	],
});
