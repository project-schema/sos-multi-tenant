import { apiSlice } from '../../api/apiSlice';
import { iDropShipperCart } from './type';

const api = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		// get all
		GetAllCarts: builder.query<iDropShipperCart[], void>({
			query: () => ({
				url: '/tenant-dropshipper/cart',
				method: 'GET',
			}),
		}),
	}),
});

export const { useGetAllCartsQuery } = api;
