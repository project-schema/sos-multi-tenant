import { apiSlice } from '@/store/features/api/apiSlice';
import {
	iVendorEmployeeRole,
	IVendorEmployeeRoleSingleRes,
} from './role-permission-type';

const api = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		vendorEmployeeRoleCreate: builder.mutation<
			{ message: string; status: number; data: any; success: boolean },
			any
		>({
			query: (body) => ({
				url: `/tenant-role-permission/store`,
				method: 'POST',
				body,
			}),
			invalidatesTags: ['VendorEmployeeRole'],
		}),

		vendorEmployeeAllRole: builder.query<
			{ status: number; roles: iVendorEmployeeRole[]; tenant_type: string },
			undefined
		>({
			query: () => ({
				url: `/tenant-role-permission/manage`,
				method: 'GET',
			}),
			providesTags: ['VendorEmployeeRole'],
		}),

		vendorEmployeeRoleWithPermission: builder.query<
			IVendorEmployeeRoleSingleRes,
			{ id: number }
		>({
			query: ({ id }) => ({
				url: `/tenant-role-permission/show/${id}`,
				method: 'GET',
			}),
			providesTags: ['VendorEmployeeRole'],
		}),

		vendorEmployeeUpdateRole: builder.mutation<
			{ message: string; status: number; data: any; success: boolean },
			{ id: string } & Record<string, string | null>
		>({
			query: ({ id, ...body }) => ({
				url: `/tenant-role-permission/update/${id}`,
				method: 'POST',
				body,
			}),
			invalidatesTags: ['VendorEmployeeRole'],
		}),

		vendorEmployeeDeleteRole: builder.mutation<
			{ message: string; status: number; data: any; success: boolean },
			{ id: number }
		>({
			query: ({ id }) => ({
				url: `/tenant-role-permission/delete/${id}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['VendorEmployeeRole'],
		}),
	}),
});

export const {
	useVendorEmployeeRoleCreateMutation,
	useVendorEmployeeAllRoleQuery,
	useVendorEmployeeUpdateRoleMutation,
	useVendorEmployeeDeleteRoleMutation,
	useVendorEmployeeRoleWithPermissionQuery,
} = api;
