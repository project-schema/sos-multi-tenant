import { apiSlice } from '../../api/apiSlice';

const api = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		// add to cart
		AddToCart: builder.mutation<{ status: 200; message: string }, any>({
			query: (data) => ({
				url: '/cart/add',
				method: 'POST',
				body: data,
			}),
		}),

		// get cart
		GetCart: builder.query<{ status: 200; message: string; data: any }, void>({
			query: () => ({
				url: '/cart',
				method: 'GET',
			}),
		}),
	}),
});

export const { useAddToCartMutation, useGetCartQuery } = api;
