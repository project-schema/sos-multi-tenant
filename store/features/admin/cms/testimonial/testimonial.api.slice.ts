import { apiSlice } from '../../../api/apiSlice';
import { iCrmTestimonialResponse } from './testimonial.type';

const api = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		// get all
		adminViewCrmTestimonial: builder.query<
			iCrmTestimonialResponse,
			{ page: number | string }
		>({
			query: ({ page }) => ({
				url: `/admin/testimonial?page=${page}`,
				method: 'GET',
			}),
			providesTags: ['AdminCrmTestimonial'],
		}),

		// store
		adminStoreCrmTestimonial: builder.mutation<
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
			invalidatesTags: ['AdminCrmTestimonial'],
		}),

		// update
		adminUpdateCrmTestimonial: builder.mutation<
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
			invalidatesTags: ['AdminCrmTestimonial'],
		}),

		// delete
		adminDeleteCrmTestimonial: builder.mutation<
			{ status: 200; message: string },
			{ id: string | number }
		>({
			query: (data) => ({
				url: `/admin/testimonial/${data.id}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['AdminCrmTestimonial'],
		}),
	}),
});

export const {
	useAdminViewCrmTestimonialQuery,
	useAdminStoreCrmTestimonialMutation,
	useAdminDeleteCrmTestimonialMutation,
	useAdminUpdateCrmTestimonialMutation,
} = api;
