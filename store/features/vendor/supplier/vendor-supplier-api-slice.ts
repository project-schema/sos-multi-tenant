import { apiSlice } from '../../api/apiSlice';
import { iVendorSupplierResponse } from './vendor-supplier-type';

const api = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		// get all
		VendorSupplier: builder.query<
			iVendorSupplierResponse,
			{ page: number | string }
		>({
			query: ({ page }) => ({
				url: `/tenant-supplier?page=${page}`,
				method: 'GET',
			}),
			providesTags: ['VendorSupplier'],
		}),

		// store
		VendorSupplierStore: builder.mutation<
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
					url: `/tenant-supplier/store`,
					method: 'POST',
					body,
					formData: true,
				};
			},
			invalidatesTags: ['VendorSupplier', 'VendorProductCreateData'],
		}),

		// update
		VendorSupplierUpdate: builder.mutation<
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
					url: `/tenant-supplier/update/${data.id}`,
					method: 'POST',
					body,
					formData: true,
				};
			},
			invalidatesTags: ['VendorSupplier', 'VendorProductCreateData'],
		}),

		// delete
		VendorSupplierDelete: builder.mutation<
			{ status: 200; message: string },
			{ id: string | number }
		>({
			query: (data) => ({
				url: `/tenant-supplier/delete/${data.id}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['VendorSupplier', 'VendorProductCreateData'],
		}),
	}),
});

export const {
	useVendorSupplierQuery,
	useVendorSupplierStoreMutation,
	useVendorSupplierDeleteMutation,
	useVendorSupplierUpdateMutation,
} = api;
