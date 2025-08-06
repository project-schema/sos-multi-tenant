import { apiSlice } from '../../../api/apiSlice';
import { iTestimonialResponse } from './testimonial.type';

const api = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		// get all
		adminViewTestimonial: builder.query<
			iTestimonialResponse,
			{ page: number | string }
		>({
			query: ({ page }) => ({
				url: `/admin/testimonial?page=${page}`,
				method: 'GET',
			}),
			providesTags: ['AdminTestimonial'],
		}),

		// store
		adminStoreTestimonial: builder.mutation<
			{ status: 200; message: string },
			any
		>({
			query: (data) => {
				const body = new FormData();
				Object.entries(data).forEach(([key, value]) => {
					if (value) {
						body.append(key, value as string);
					}
				});

				return {
					url: `/admin/testimonial`,
					method: 'POST',
					body,
					formData: true,
				};
			},
			invalidatesTags: ['AdminTestimonial'],
		}),

		// update
		adminUpdateTestimonial: builder.mutation<
			{ status: 200; message: string },
			any
		>({
			query: (data) => {
				const body = new FormData();
				Object.entries(data).forEach(([key, value]) => {
					if (value) {
						body.append(key, value as string);
					}
				});
				body.append('_method', 'PUT');

				return {
					url: `/admin/testimonial/${data.id}`,
					method: 'POST',
					body,
					formData: true,
				};
			},
			invalidatesTags: ['AdminTestimonial'],
		}),

		// delete
		adminDeleteTestimonial: builder.mutation<
			{ status: 200; message: string },
			{ id: string | number }
		>({
			query: (data) => ({
				url: `/admin/testimonial/${data.id}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['AdminTestimonial'],
		}),
	}),
});

export const {
	useAdminViewTestimonialQuery,
	useAdminStoreTestimonialMutation,
	useAdminDeleteTestimonialMutation,
	useAdminUpdateTestimonialMutation,
} = api;
