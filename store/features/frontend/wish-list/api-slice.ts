import { apiSlice } from '../../api/apiSlice';

// Types
export type iWishlistItem = {
	id: number;
	user_id: number;
	product_id: number;
	tenant_id: null;
	deleted_at: null;
	created_at: string;
	updated_at: string;
};

export type iWishlistResponse = {
	message: string;
	success: boolean;
	wishlist: iWishlistItem[];
};

export type iAddToWishlistResponse = {
	message: string;
	success: boolean;
};

export type iDeleteWishlistResponse = {
	message: string;
	success: boolean;
};

const api = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		// Get wishlist
		getWishlist: builder.query<iWishlistResponse, void>({
			query: () => ({
				url: `/tenant-frontend/wishlist`,
				method: 'GET',
			}),
			providesTags: ['Wishlist'],
		}),

		// Add to wishlist
		addToWishlist: builder.mutation<
			iAddToWishlistResponse,
			{ product_id: number }
		>({
			query: (data) => ({
				url: `/tenant-frontend/add-to-wishlist`,
				method: 'POST',
				body: data,
			}),
			invalidatesTags: ['Wishlist'],
		}),

		// Delete from wishlist
		deleteFromWishlist: builder.mutation<
			iDeleteWishlistResponse,
			{ id: number }
		>({
			query: ({ id }) => ({
				url: `/tenant-frontend/wishlist/${id}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['Wishlist'],
		}),
	}),
});

export const {
	useGetWishlistQuery,
	useAddToWishlistMutation,
	useDeleteFromWishlistMutation,
} = api;
