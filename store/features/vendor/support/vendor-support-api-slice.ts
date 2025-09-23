import { apiSlice } from '../../api/apiSlice';
import { iVendorSupportResponse } from './vendor-support-type';

const api = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		// get all
		VendorSupportAll: builder.query<
			iVendorSupportResponse,
			{ page: number | string; search: string }
		>({
			query: ({ page, search = '' }) => {
				// Use 'all' as default status

				return {
					url: `/tenant-support?page=${page}&search=${search}`,
					method: 'GET',
				};
			},
			providesTags: ['VendorSupport'],
		}),
	}),
});

export const { useVendorSupportAllQuery } = api;
