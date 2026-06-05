import { iTenantEmployeePermissionsResponse } from '@/lib/permissions/parse-employee-permissions';
import { apiSlice } from '@/store/features/api/apiSlice';
import { iVendorEmployee, iVendorEmployeeResponse } from './vendor-employee-type';

const api = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		vendorEmployeeList: builder.query<iVendorEmployeeResponse, { page: number | string }>(
			{
				query: ({ page }) => ({
					url: `/tenant-employee/manage?page=${page}`,
					method: 'GET',
				}),
				providesTags: ['VendorEmployeeRole'],
			},
		),

		vendorEmployeeCreateForm: builder.query<unknown, void>({
			query: () => ({
				url: `/tenant-employee/create`,
				method: 'GET',
			}),
		}),

		vendorEmployeeShow: builder.query<iVendorEmployee, { id: string | number }>({
			query: ({ id }) => ({
				url: `/tenant-employee/show/${id}`,
				method: 'GET',
			}),
			providesTags: ['VendorEmployeeRole'],
		}),

		vendorEmployeeCreate: builder.mutation<{ status: 200; message: string }, any>({
			query: (data) => {
				const body = new FormData();
				Object.entries(data).forEach(([key, value]) => {
					if (value !== undefined && value !== null && value !== '') {
						body.append(key, value as string);
					}
				});
				return {
					url: `/tenant-employee/store`,
					method: 'POST',
					body,
					formData: true,
				};
			},
			invalidatesTags: ['VendorEmployeeRole'],
		}),

		vendorEmployeeUpdate: builder.mutation<{ status: 200; message: string }, any>({
			query: (data) => {
				const body = new FormData();
				Object.entries(data).forEach(([key, value]) => {
					if (value !== undefined && value !== null && value !== '') {
						body.append(key, value as string);
					}
				});
				return {
					url: `/tenant-employee/update/${data.id}`,
					method: 'POST',
					body,
					formData: true,
				};
			},
			invalidatesTags: ['VendorEmployeeRole'],
		}),

		vendorEmployeeDelete: builder.mutation<
			{ status: 200; message: string },
			{ id: string | number }
		>({
			query: ({ id }) => ({
				url: `/tenant-employee/delete/${id}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['VendorEmployeeRole'],
		}),

		vendorEmployeeStatus: builder.mutation<
			{ status: 200; message: string },
			{ id: string | number }
		>({
			query: ({ id }) => ({
				url: `/tenant-employee/status/${id}`,
				method: 'GET',
			}),
			invalidatesTags: ['VendorEmployeeRole'],
		}),

		vendorEmployeePermissions: builder.query<
			iTenantEmployeePermissionsResponse,
			void
		>({
			query: () => ({
				url: `/tenant-employee/permissions`,
				method: 'GET',
			}),
			providesTags: ['VendorEmployeeRole'],
		}),
	}),
});

export const {
	useVendorEmployeeListQuery,
	useVendorEmployeeCreateFormQuery,
	useVendorEmployeeShowQuery,
	useVendorEmployeeCreateMutation,
	useVendorEmployeeUpdateMutation,
	useVendorEmployeeDeleteMutation,
	useVendorEmployeeStatusMutation,
	useVendorEmployeePermissionsQuery,
} = api;
