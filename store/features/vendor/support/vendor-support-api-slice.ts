import { apiSlice } from '../../api/apiSlice';
import {
	iVendorSupportCategory,
	iVendorSupportResponse,
	iVendorSupportSubResponse,
} from './vendor-support-type';

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

		VendorSupportCreate: builder.mutation<
			{ status: 200; message: string },
			any
		>({
			query: (data) => {
				const body = new FormData();
				Object.entries(data).forEach(([key, value]) => {
					if (value) {
						body.append(key, value as string);
					}
				});
				return {
					url: `/tenant-support`,
					method: 'POST',
					body,
					formData: true,
				};
			},
		}),

		VendorSupportCategory: builder.query<
			{ status: 200; message: iVendorSupportCategory[]; data: 'success' },
			any
		>({
			query: () => ({
				url: `/tenant-support/category`,
				method: 'GET',
			}),
		}),

		VendorSupportSubCategory: builder.query<
			iVendorSupportSubResponse,
			{ id: string }
		>({
			query: ({ id }) => ({
				url: `/tenant-support/sub-category/${id}`,
				method: 'GET',
			}),
		}),
	}),
});

export const {
	useVendorSupportAllQuery,
	useVendorSupportCreateMutation,
	useVendorSupportCategoryQuery,
	useVendorSupportSubCategoryQuery,
} = api;
