import { apiSlice } from '@/store/features/api/apiSlice';
import { iPerformanceGoalResponse } from './performance-goal.type';

const api = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		//  get all
		adminPerformanceGoal: builder.query<
			iPerformanceGoalResponse,
			{ page: number | string }
		>({
			query: ({ page }) => {
				return {
					url: `/admin/performance/goal?page=${page}`,
					method: 'GET',
				};
			},
			providesTags: ['AdminPerformanceGoal'],
		}),
		// store
		adminStorePerformanceGoal: builder.mutation<
			{ status: 200; message: string; success: boolean },
			{ name: string; campaign_category_id: string }
		>({
			query: (data) => ({
				url: `/admin/performance/goal`,
				body: data,
				method: 'POST',
			}),
			invalidatesTags: ['AdminPerformanceGoal'],
		}),
		// update
		adminUpdatePerformanceGoal: builder.mutation<
			{ status: 200; message: string; success: boolean },
			{ id: string | number; name: string; campaign_category_id: string }
		>({
			query: (data) => ({
				url: `/admin/performance/goal/${data.id}`,
				body: data,
				method: 'PUT',
			}),
			invalidatesTags: ['AdminPerformanceGoal'],
		}),
		// delete
		adminDeletePerformanceGoal: builder.mutation<
			{ status: 200; message: string },
			{ id: string | number }
		>({
			query: (data) => ({
				url: `/admin/performance/goal/${data.id}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['AdminPerformanceGoal'],
		}),
	}),
});

export const {
	useAdminPerformanceGoalQuery,
	useAdminStorePerformanceGoalMutation,
	useAdminUpdatePerformanceGoalMutation,
	useAdminDeletePerformanceGoalMutation,
} = api;
