import { apiSlice } from '@/store/features/api/apiSlice';
import { iAdFormatResponse } from './ad_format.type';

const api = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		//  get all
		adminAdFormat: builder.query<iAdFormatResponse, undefined>({
			query: () => {
				return {
					url: `/admin/dynamic-colum/add_format`,
					method: 'GET',
				};
			},
			providesTags: ['AdminAdFormat'],
		}),

		// store
		adminStoreAdFormat: builder.mutation<
			{ status: 200; message: string; success: boolean },
			{ add_format: string; campaign_category_id: string; colum_name: string }
		>({
			query: (data) => ({
				url: `/admin/dynamic-colum/add_format`,
				body: data,
				method: 'POST',
			}),
			invalidatesTags: ['AdminAdFormat'],
		}),
		// update
		adminUpdateAdFormat: builder.mutation<
			{ status: 200; message: string; success: boolean },
			{
				id: string | number;
				add_format: string;
				campaign_category_id: string;
				colum_name: string;
			}
		>({
			query: (data) => ({
				url: `/admin/dynamic-colum/update/${data.id}/add_format`,
				body: data,
				method: 'POST',
			}),
			invalidatesTags: ['AdminAdFormat'],
		}),
		// delete
		adminDeleteAdFormat: builder.mutation<
			{ status: 200; message: string },
			{ id: string | number }
		>({
			query: (data) => ({
				url: `/admin/dynamic-colum/delete/${data.id}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['AdminAdFormat'],
		}),
	}),
});

export const {
	useAdminAdFormatQuery,
	useAdminStoreAdFormatMutation,
	useAdminUpdateAdFormatMutation,
	useAdminDeleteAdFormatMutation,
} = api;
