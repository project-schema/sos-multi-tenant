import { apiSlice } from '@/store/features/api/apiSlice';
import { iCmsBlogResponse } from './type';

const api = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		// get all
		CmsBlog: builder.query<
			iCmsBlogResponse,
			{
				page: number | string;
				search: string;
				status?: string;
				category_id?: string;
			}
		>({
			query: ({ page, search, status, category_id }) => {
				const params = new URLSearchParams();
				params.append('page', String(page));
				if (search) params.append('search', search);
				if (status) params.append('status', status);
				if (category_id) params.append('n_category_id', category_id);

				return {
					url: `/tenant-news?${params.toString()}`,
					method: 'GET',
				};
			},
			providesTags: ['AdminBlog'],
		}),

		// store
		CmsBlogStore: builder.mutation<
			{ status: 200; message: string; success: boolean },
			any
		>({
			query: (data) => {
				const body = new FormData();
				Object.entries(data).forEach(([key, value]) => {
					if (value !== null && value !== undefined) {
						if (key === 'image' && value instanceof File) {
							body.append(key, value);
						} else if (key === 'tags' && Array.isArray(value)) {
							body.append(key, JSON.stringify(value));
						} else {
							body.append(key, String(value));
						}
					}
				});

				return {
					url: `/tenant-news/store`,
					method: 'POST',
					body,
					formData: true,
				};
			},
			invalidatesTags: ['AdminBlog'],
		}),

		// update
		CmsBlogUpdate: builder.mutation<
			{ status: 200; message: string; success: boolean },
			any
		>({
			query: (data) => {
				const body = new FormData();
				Object.entries(data).forEach(([key, value]) => {
					if (value !== null && value !== undefined) {
						if (key === 'image' && value instanceof File) {
							body.append(key, value);
						} else if (key === 'tags' && Array.isArray(value)) {
							body.append(key, JSON.stringify(value));
						} else {
							body.append(key, String(value));
						}
					}
				});

				return {
					url: `/tenant-news/update/${data.id}`,
					method: 'POST',
					body,
					formData: true,
				};
			},
			invalidatesTags: ['AdminBlog'],
		}),

		// delete
		CmsBlogDelete: builder.mutation<
			{ status: 200; message: string },
			{ id: string | number }
		>({
			query: (data) => ({
				url: `/tenant-news/delete/${data.id}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['AdminBlog'],
		}),
	}),
});

export const {
	useCmsBlogQuery,
	useCmsBlogDeleteMutation,
	useCmsBlogStoreMutation,
	useCmsBlogUpdateMutation,
} = api;
