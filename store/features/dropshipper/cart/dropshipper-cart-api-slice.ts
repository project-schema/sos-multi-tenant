import { apiSlice } from '../../api/apiSlice';
import { iDropShipperCart, iDropShipperCartView } from './type';

const api = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		// get all
		GetAllCarts: builder.query<
			{ products: iDropShipperCart[]; status: 200 },
			void
		>({
			query: () => ({
				url: '/tenant-dropshipper/cart',
				method: 'GET',
			}),
		}),

		// cart view
		CartView: builder.query<iDropShipperCartView, { cartId: string }>({
			query: ({ cartId }) => ({
				url: `/tenant-dropshipper/cat/${cartId}`,
				method: 'GET',
			}),
		}),
	}),
});

export const { useGetAllCartsQuery, useCartViewQuery } = api;
