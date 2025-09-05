import { apiSlice } from '@/store/features/api/apiSlice';
import {
	iVendorServices,
	iVendorServicesResponse,
} from './vendor-services-type';

const api = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		VendorServices: builder.query<iVendorServicesResponse, void>({
			query: () => '/tenant-services',
		}),

		// count
		VendorServicesCount: builder.query<iVendorServices, void>({
			query: () => '/tenant-services/count',
		}),

		// view
		VendorServicesView: builder.query<iVendorServices, { id: string }>({
			query: ({ id }) => `/tenant-services/${id}`,
		}),
	}),
});

export const {
	useVendorServicesQuery,
	useVendorServicesCountQuery,
	useVendorServicesViewQuery,
} = api;
