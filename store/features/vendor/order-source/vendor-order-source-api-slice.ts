import { apiSlice } from '../../api/apiSlice';
import {
	iVendorOrderSource,
	iVendorOrderSourceResponse,
} from './vendor-order-source-type';

const api = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		// get all
		VendorOrderSourceAll: builder.query<
			iVendorOrderSourceResponse,
			{ page?: number | string; status?: null | 'active' | 'pending' }
		>({
			query: ({ page = '', status = null }) => {
				const queryStatus = status ? `&status=${status}` : '';
				return {
					url: `/tenant-order-source?page=${page}${queryStatus}`,
					method: 'GET',
				};
			},
			providesTags: ['VendorOrderSource'],
		}),
		// get all active
		VendorOrderSourceAllActive: builder.query<
			{ categories: iVendorOrderSource[]; status: 200 },
			undefined
		>({
			query: () => {
				return {
					url: `/tenant-order-source/active`,
					method: 'GET',
				};
			},
			providesTags: ['VendorOrderSource'],
		}),

		// store
		VendorOrderSourceStore: builder.mutation<
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
					url: `/tenant-order-source/store`,
					method: 'POST',
					body,
					formData: true,
				};
			},
			invalidatesTags: ['VendorOrderSource', 'VendorProductCreateData'],
		}),

		// update
		VendorOrderSourceUpdate: builder.mutation<
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

				body.append('_method', 'PUT');

				return {
					url: `/tenant-order-source/update/${data.id}`,
					method: 'POST',
					body,
					formData: true,
				};
			},
			invalidatesTags: ['VendorOrderSource', 'VendorProductCreateData'],
		}),

		// delete
		VendorOrderSourceDelete: builder.mutation<
			{ status: 200; message: string },
			{ id: string | number }
		>({
			query: (data) => ({
				url: `/tenant-order-source/delete/${data.id}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['VendorOrderSource', 'VendorProductCreateData'],
		}),
	}),
});

export const {
	useVendorOrderSourceAllQuery,
	useVendorOrderSourceAllActiveQuery,
	useVendorOrderSourceStoreMutation,
	useVendorOrderSourceDeleteMutation,
	useVendorOrderSourceUpdateMutation,
} = api;
