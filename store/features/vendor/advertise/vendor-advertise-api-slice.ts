import { apiSlice } from '@/store/features/api/apiSlice';
import {
	iVendorAdvertise,
	iVendorAdvertiseResponse,
} from './vendor-advertise-type';

const api = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		VendorAdvertise: builder.query<
			iVendorAdvertiseResponse,
			{ page: number | string; search: string }
		>({
			query: ({ page, search }) => ({
				url: '/tenant-advertise',
				method: 'GET',
				params: { page, search },
			}),
		}),

		// count
		VendorAdvertiseCount: builder.query<iVendorAdvertise, void>({
			query: () => '/tenant-advertise/count',
		}),

		// view
		VendorAdvertiseView: builder.query<any, { id: string }>({
			query: ({ id }) => `/tenant-advertise/${id}`,
		}),
	}),
});

export const {
	useVendorAdvertiseQuery,
	useVendorAdvertiseCountQuery,
	useVendorAdvertiseViewQuery,
} = api;
