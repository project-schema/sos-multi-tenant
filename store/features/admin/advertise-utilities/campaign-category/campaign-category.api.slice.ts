import { apiSlice } from '@/store/features/api/apiSlice';
import { iCampaignCategoryResponse } from './campaign-category.type';

const api = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		// Campaign Category
		adminCampaignCategory: builder.query<
			iCampaignCategoryResponse,
			{ page: number | string }
		>({
			query: ({ page }) => {
				return {
					url: `/admin/campaign/category?page=${page}`,
					method: 'GET',
				};
			},
			providesTags: ['AdminCampaignCategory'],
		}),
		// store
		adminStoreCampaignCategory: builder.mutation<
			{ success: boolean; message: string; status: 200 },
			{ name: string; icon: string }
		>({
			query: (data) => ({
				url: `/admin/campaign/category`,
				body: data,
				method: 'POST',
			}),
			invalidatesTags: ['AdminCampaignCategory'],
		}),
		// update
		adminUpdateCampaignCategory: builder.mutation<
			{ status: 200; message: string; success: boolean },
			{ id: string | number; name: string; icon: string }
		>({
			query: (data) => ({
				url: `/admin/campaign/category/${data.id}`,
				body: data,
				method: 'PUT',
			}),
			invalidatesTags: ['AdminCampaignCategory'],
		}),
		// delete
		adminDeleteCampaignCategory: builder.mutation<
			{ status: 200; message: string },
			{ id: string | number }
		>({
			query: (data) => ({
				url: `/admin/campaign/category/${data.id}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['AdminCampaignCategory'],
		}),
	}),
});

export const {
	useAdminCampaignCategoryQuery,
	useAdminStoreCampaignCategoryMutation,
	useAdminUpdateCampaignCategoryMutation,
	useAdminDeleteCampaignCategoryMutation,
} = api;
