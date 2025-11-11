import { apiSlice } from '../../api/apiSlice';
import {
	iUserSupport,
	iUserSupportCategory,
	iUserSupportResponse,
	iUserSupportSubResponse,
} from './type';

const api = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		// get all
		UserSupportAll: builder.query<
			iUserSupportResponse,
			{ page: number | string; search: string }
		>({
			query: ({ page, search = '' }) => {
				// Use 'all' as default status

				return {
					url: `/user/supportbox?page=${page}&search=${search}`,
					method: 'GET',
				};
			},
			providesTags: ['UserSupport'],
		}),

		UserSupportCreate: builder.mutation<{ status: 200; message: string }, any>({
			query: (data) => {
				const body = new FormData();
				Object.entries(data).forEach(([key, value]) => {
					if (value) {
						body.append(key, value as string);
					}
				});
				return {
					url: `/user/supportbox`,
					method: 'POST',
					body,
					formData: true,
				};
			},
		}),

		UserSupportCategory: builder.query<
			{ status: 200; message: iUserSupportCategory[]; data: 'success' },
			any
		>({
			query: () => ({
				url: `/user/all-ticket-category`,
				method: 'GET',
			}),
		}),

		UserSupportSubCategory: builder.query<
			iUserSupportSubResponse,
			{ id: string }
		>({
			query: ({ id }) => ({
				url: `/user/ticket-category-to-problem/${id}`,
				method: 'GET',
			}),
		}),

		UserSupportView: builder.query<
			{ status: 200; message: iUserSupport },
			{ id: string }
		>({
			query: ({ id }) => ({
				url: `/tenant-support/show/${id}`,
				method: 'GET',
			}),
		}),

		UserSupportCount: builder.query<{ closed: number; all_support: [] }, void>({
			query: () => ({
				url: `/user/support-count`,
				method: 'GET',
			}),
			providesTags: ['UserSupport'],
		}),
	}),
});

export const {
	useUserSupportAllQuery,
	useUserSupportCreateMutation,
	useUserSupportCategoryQuery,
	useUserSupportSubCategoryQuery,
	useUserSupportViewQuery,
	useUserSupportCountQuery,
} = api;
