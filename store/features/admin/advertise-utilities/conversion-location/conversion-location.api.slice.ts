import { apiSlice } from '@/store/features/api/apiSlice';
import {
	iConversionLocationRequest,
	iConversionLocationResponse,
} from './conversion-location.type';

const api = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		//  get all
		adminConversionLocation: builder.query<
			iConversionLocationResponse,
			{ page: number | string }
		>({
			query: ({ page }) => {
				return {
					url: `/admin/conversion/location?page=${page}`,
					method: 'GET',
				};
			},
			providesTags: ['AdminConversionLocation'],
		}),
		// get single
		adminGetConversionLocation: builder.query<
			iConversionLocationRequest,
			{ id: number | string }
		>({
			query: ({ id }) => {
				return {
					url: `/admin/get/conversion/location/${id}`,
					method: 'GET',
				};
			},
			providesTags: ['AdminConversionLocation'],
		}),
		// store
		adminStoreConversionLocation: builder.mutation<
			{ status: 200; message: string; success: boolean },
			{ name: string; campaign_category_id: string }
		>({
			query: (data) => ({
				url: `/admin/conversion/location`,
				body: data,
				method: 'POST',
			}),
			invalidatesTags: ['AdminConversionLocation'],
		}),
		// update
		adminUpdateConversionLocation: builder.mutation<
			{ status: 200; message: string; success: boolean },
			{ id: string | number; name: string; campaign_category_id: string }
		>({
			query: (data) => ({
				url: `/admin/conversion/location/${data.id}`,
				body: data,
				method: 'PUT',
			}),
			invalidatesTags: ['AdminConversionLocation'],
		}),
		// delete
		adminDeleteConversionLocation: builder.mutation<
			{ status: 200; message: string },
			{ id: string | number }
		>({
			query: (data) => ({
				url: `/admin/conversion/location/${data.id}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['AdminConversionLocation'],
		}),
	}),
});

export const {
	useAdminConversionLocationQuery,
	useAdminGetConversionLocationQuery,
	useAdminStoreConversionLocationMutation,
	useAdminUpdateConversionLocationMutation,
	useAdminDeleteConversionLocationMutation,
} = api;
