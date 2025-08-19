import { apiSlice } from '../../api/apiSlice';
import { iVendorWarehouseResponse } from './vendor-warehouse-type';

const api = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		// get all
		VendorWarehouse: builder.query<
			iVendorWarehouseResponse,
			{ page: number | string }
		>({
			query: ({ page }) => ({
				url: `/tenant-warehouse?page=${page}`,
				method: 'GET',
			}),
			providesTags: ['VendorWarehouse'],
		}),

		// store
		VendorWarehouseStore: builder.mutation<
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
					url: `/tenant-warehouse/store`,
					method: 'POST',
					body,
					formData: true,
				};
			},
			invalidatesTags: ['VendorWarehouse'],
		}),

		// update
		VendorWarehouseUpdate: builder.mutation<
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
					url: `/tenant-warehouse/update/${data.id}`,
					method: 'POST',
					body,
					formData: true,
				};
			},
			invalidatesTags: ['VendorWarehouse'],
		}),

		// delete
		VendorWarehouseDelete: builder.mutation<
			{ status: 200; message: string },
			{ id: string | number }
		>({
			query: (data) => ({
				url: `/tenant-warehouse/delete/${data.id}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['VendorWarehouse'],
		}),
	}),
});

export const {
	useVendorWarehouseQuery,
	useVendorWarehouseStoreMutation,
	useVendorWarehouseDeleteMutation,
	useVendorWarehouseUpdateMutation,
} = api;
