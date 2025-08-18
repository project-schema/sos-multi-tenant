import { apiSlice } from '../../api/apiSlice';
import { iVendorBrandResponse } from './vendor.brand.type';

const vendorBrandApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		// get all
		VendorViewBrand: builder.query<
			iVendorBrandResponse,
			{ page: number | string }
		>({
			query: ({ page }) => ({
				url: `/tenant-brands?page=${page}`,
				method: 'GET',
			}),
			providesTags: ['VendorBrand'],
		}),

		// store
		VendorStoreBrand: builder.mutation<any, any>({
			query: (data) => {
				const body = new FormData();
				Object.entries(data).forEach(([key, value]) => {
					if (value) {
						body.append(key, value as string);
					}
				});

				return {
					url: `/tenant-brand-store`,
					method: 'POST',
					body,
					formData: true,
				};
			},
			invalidatesTags: ['VendorBrand'],
		}),

		// update
		VendorUpdateBrand: builder.mutation<any, any>({
			query: (data) => {
				const body = new FormData();
				Object.entries(data).forEach(([key, value]) => {
					if (value) {
						body.append(key, value as string);
					}
				});

				body.append('_method', 'PUT');
				return {
					url: `/tenant-brand-update/${data.id}`,
					method: 'POST',
					body,
					formData: true,
				};
			},
			invalidatesTags: ['VendorBrand'],
		}),

		// delete
		VendorDeleteBrand: builder.mutation<
			{ status: 200; message: string },
			{ id: string | number }
		>({
			query: (data) => ({
				url: `/tenant-brand-delete/${data.id}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['VendorBrand'],
		}),
	}),
});

export const {
	useVendorViewBrandQuery,
	useVendorStoreBrandMutation,
	useVendorDeleteBrandMutation,
	useVendorUpdateBrandMutation,
} = vendorBrandApi;
