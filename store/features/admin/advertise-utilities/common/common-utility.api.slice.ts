import { apiSlice } from '@/store/features/api/apiSlice';
import {
	DynamicAddFormat,
	iAdvertiseCommonPath,
	iAdvertiseCommonUtilitiesResponse,
} from './common-utility.type';

const api = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		//  get all
		adminAdvertiseCommonUtilities: builder.query<
			iAdvertiseCommonUtilitiesResponse<iAdvertiseCommonPath>,
			{ path: iAdvertiseCommonPath }
		>({
			query: ({ path }) => {
				return {
					url: `/admin/dynamic-colum/${path}`,
					method: 'GET',
				};
			},
			providesTags: ['AdminAdvertiseCommonUtilities'],
		}),

		// store
		adminStoreAdvertiseCommonUtilities: builder.mutation<
			{ status: 200; message: string; success: boolean },
			Partial<DynamicAddFormat<iAdvertiseCommonPath>>
		>({
			query: (data) => ({
				url: `/admin/dynamic-colum/${data.colum_name}`,
				body: data,
				method: 'POST',
			}),
			invalidatesTags: ['AdminAdvertiseCommonUtilities'],
		}),
		// update
		adminUpdateAdvertiseCommonUtilities: builder.mutation<
			{ status: 200; message: string; success: boolean },
			Partial<DynamicAddFormat<iAdvertiseCommonPath>> & { id: string | number }
		>({
			query: (data) => ({
				url: `/admin/dynamic-colum/update/${data.id}/${data.colum_name}`,
				body: data,
				method: 'POST',
			}),
			invalidatesTags: ['AdminAdvertiseCommonUtilities'],
		}),
		// delete
		adminDeleteAdvertiseCommonUtilities: builder.mutation<
			{ status: 200; message: string },
			{ id: string | number }
		>({
			query: (data) => ({
				url: `/admin/dynamic-colum/delete/${data.id}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['AdminAdvertiseCommonUtilities'],
		}),
	}),
});

export const {
	useAdminAdvertiseCommonUtilitiesQuery,
	useAdminStoreAdvertiseCommonUtilitiesMutation,
	useAdminUpdateAdvertiseCommonUtilitiesMutation,
	useAdminDeleteAdvertiseCommonUtilitiesMutation,
} = api;
