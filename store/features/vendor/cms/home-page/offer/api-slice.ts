import { apiSlice } from '@/store/features/api/apiSlice';
import { iHomeOfferResponse } from './type';

const api = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		// get all home offers
		tenantViewHomeOffer: builder.query<
			iHomeOfferResponse,
			{ page: number | string }
		>({
			query: ({ page }) => ({
				url: `/tenant/offer`,
				method: 'GET',
			}),
			providesTags: ['HomeOffer'],
		}),

		// store home offer
		tenantStoreHomeOffer: builder.mutation<
			{ success: boolean; message: string },
			any
		>({
			query: (data) => ({
				url: `/tenant/offer`,
				method: 'POST',
				body: data,
			}),
			invalidatesTags: ['HomeOffer'],
		}),

		// update home offer
		tenantUpdateHomeOffer: builder.mutation<
			{ success: boolean; message: string },
			any
		>({
			query: (data) => ({
				url: `/tenant/offer/${data.id}`,
				method: 'POST',
				body: data,
			}),
			invalidatesTags: ['HomeOffer'],
		}),

		// delete home offer
		tenantDeleteHomeOffer: builder.mutation<
			{ status: 200; message: string },
			{ id: string | number }
		>({
			query: (data) => ({
				url: `/tenant/offer/${data.id}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['HomeOffer'],
		}),
	}),
});

export const {
	useTenantViewHomeOfferQuery,
	useTenantStoreHomeOfferMutation,
	useTenantUpdateHomeOfferMutation,
	useTenantDeleteHomeOfferMutation,
} = api;
