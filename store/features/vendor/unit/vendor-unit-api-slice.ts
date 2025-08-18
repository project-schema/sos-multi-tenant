import { apiSlice } from '../../api/apiSlice';
import { iVendorUnitResponse } from './vendor-unit-type';

const api = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		// get all
		VendorUnit: builder.query<iVendorUnitResponse, { page: number | string }>({
			query: ({ page }) => ({
				url: `/unit?status=active`,
				method: 'GET',
			}),
			providesTags: ['VendorUnit'],
		}),

		// store
		VendorUnitStore: builder.mutation<{ status: 200; message: string }, any>({
			query: (data) => {
				const body = new FormData();
				Object.entries(data).forEach(([key, value]) => {
					if (value) {
						body.append(key, value as string);
					}
				});

				return {
					url: `/unit/store`,
					method: 'POST',
					body,
					formData: true,
				};
			},
			invalidatesTags: ['VendorUnit'],
		}),

		// update
		VendorUnitUpdate: builder.mutation<{ status: 200; message: string }, any>({
			query: (data) => {
				const body = new FormData();
				Object.entries(data).forEach(([key, value]) => {
					if (value) {
						body.append(key, value as string);
					}
				});

				return {
					url: `/unit/update/${data.id}`,
					method: 'POST',
					body,
					formData: true,
				};
			},
			invalidatesTags: ['VendorUnit'],
		}),

		// delete
		VendorUnitDelete: builder.mutation<
			{ status: 200; message: string },
			{ id: string | number }
		>({
			query: (data) => ({
				url: `/unit/delete/${data.id}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['VendorUnit'],
		}),
	}),
});

export const {
	useVendorUnitQuery,
	useVendorUnitStoreMutation,
	useVendorUnitDeleteMutation,
	useVendorUnitUpdateMutation,
} = api;
