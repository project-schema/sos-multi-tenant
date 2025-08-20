import { apiSlice } from '../../api/apiSlice';
import { iVendorCourierCompanyResponse } from './vendor-courier-company-type';

const api = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		// get all
		VendorCourierCompany: builder.query<
			iVendorCourierCompanyResponse,
			undefined
		>({
			query: () => ({
				url: `/tenant-courier-credential`,
				method: 'GET',
			}),
			providesTags: ['VendorCourierCompany'],
		}),

		// store
		VendorCourierCompanyStore: builder.mutation<
			{ status: 200; message: string },
			any
		>({
			query: (data) => {
				const body = new FormData();
				Object.entries({
					...data,
					secret_key: data?.secret_key || 'not-provide',
				}).forEach(([key, value]) => {
					if (value) {
						body.append(key, value as string);
					}
				});

				return {
					url: `/tenant-courier-credential/store`,
					method: 'POST',
					body,
					formData: true,
				};
			},
			invalidatesTags: ['VendorCourierCompany', 'VendorProductCreateData'],
		}),

		// update
		VendorCourierCompanyUpdate: builder.mutation<
			{ status: 200; message: string },
			any
		>({
			query: (data) => {
				const body = new FormData();
				Object.entries({
					...data,
					secret_key: data?.secret_key || 'not-provide',
				}).forEach(([key, value]) => {
					if (value) {
						body.append(key, value as string);
					}
				});

				return {
					url: `/tenant-courier-credential/update/${data.id}`,
					method: 'POST',
					body,
					formData: true,
				};
			},
			invalidatesTags: ['VendorCourierCompany', 'VendorProductCreateData'],
		}),

		// delete
		VendorCourierCompanyDelete: builder.mutation<
			{ status: 200; message: string },
			{ id: string | number }
		>({
			query: (data) => ({
				url: `/tenant-courier-credential/delete/${data.id}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['VendorCourierCompany', 'VendorProductCreateData'],
		}),

		// status
		VendorCourierCompanyStatus: builder.mutation<
			{ status: 200; message: string },
			{ id: string | number }
		>({
			query: (data) => ({
				url: `/tenant-courier-credential/status/${data.id}`,
				method: 'GET',
			}),
			invalidatesTags: ['VendorCourierCompany', 'VendorProductCreateData'],
		}),

		// default
		VendorCourierCompanyDefault: builder.mutation<
			{ status: 200; message: string },
			{ id: string | number }
		>({
			query: (data) => ({
				url: `/tenant-courier-credential/default/${data.id}`,
				method: 'GET',
			}),
			invalidatesTags: ['VendorCourierCompany', 'VendorProductCreateData'],
		}),
	}),
});

export const {
	useVendorCourierCompanyQuery,
	useVendorCourierCompanyStoreMutation,
	useVendorCourierCompanyDeleteMutation,
	useVendorCourierCompanyUpdateMutation,
	useVendorCourierCompanyDefaultMutation,
	useVendorCourierCompanyStatusMutation,
} = api;
