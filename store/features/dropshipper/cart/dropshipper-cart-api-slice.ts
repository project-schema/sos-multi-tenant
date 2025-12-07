import { apiSlice } from '../../api/apiSlice';
import {
	CartCreatePayload,
	CartUpdatePayload,
	iDropShipperCart,
	iDropShipperCartView,
} from './type';

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
			providesTags: ['DropShipperCart'],
		}),

		// cart view
		CartView: builder.query<iDropShipperCartView, { cartId: string }>({
			query: ({ cartId }) => ({
				url: `/tenant-dropshipper/cart/${cartId}`,
				method: 'GET',
			}),
			providesTags: ['DropShipperCart'],
		}),

		// create cart
		CreateCart: builder.mutation<
			{ status: 200; message: string; data?: any },
			CartCreatePayload
		>({
			query: (data) => {
				const body = new FormData();

				// Add products array
				data.products.forEach((product, index) => {
					body.append(
						`products[${index}][product_id]`,
						String(product.product_id)
					);
					body.append(
						`products[${index}][product_qty]`,
						String(product.product_qty)
					);
					if (product.variant_id) {
						body.append(
							`products[${index}][variant_id]`,
							String(product.variant_id)
						);
					}
					if (product.color) {
						body.append(`products[${index}][color]`, String(product.color));
					}
					if (product.size) {
						body.append(`products[${index}][size]`, String(product.size));
					}
					if (product.unit_id) {
						body.append(`products[${index}][unit_id]`, String(product.unit_id));
					}
				});

				// Add shipping address
				body.append('first_name', data.first_name);
				if (data.last_name) {
					body.append('last_name', data.last_name);
				}
				body.append('phone', data.phone);
				body.append('email', data.email);
				body.append('city', data.city);
				body.append('address', data.address);
				if (data.note) {
					body.append('note', data.note);
				}
				if (data.delivery_area_id) {
					body.append('delivery_area_id', String(data.delivery_area_id));
				}
				if (data.courier_id) {
					body.append('courier_id', String(data.courier_id));
				}

				return {
					url: '/tenant-dropshipper/cart',
					method: 'POST',
					body,
					formData: true,
				};
			},
			invalidatesTags: ['DropShipperCart'],
		}),

		// update cart
		UpdateCart: builder.mutation<
			{ status: 200; message: string; data?: any },
			CartUpdatePayload
		>({
			query: (data) => {
				const body = new FormData();

				body.append('cart_id', String(data.cart_id));

				// Add products array if provided
				if (data.products && data.products.length > 0) {
					data.products.forEach((product, index) => {
						body.append(
							`products[${index}][product_id]`,
							String(product.product_id)
						);
						body.append(
							`products[${index}][product_qty]`,
							String(product.product_qty)
						);
						if (product.variant_id) {
							body.append(
								`products[${index}][variant_id]`,
								String(product.variant_id)
							);
						}
						if (product.color) {
							body.append(`products[${index}][color]`, String(product.color));
						}
						if (product.size) {
							body.append(`products[${index}][size]`, String(product.size));
						}
						if (product.unit_id) {
							body.append(
								`products[${index}][unit_id]`,
								String(product.unit_id)
							);
						}
					});
				}

				// Add shipping address fields if provided
				if (data.first_name) {
					body.append('first_name', data.first_name);
				}
				if (data.last_name) {
					body.append('last_name', data.last_name);
				}
				if (data.phone) {
					body.append('phone', data.phone);
				}
				if (data.email) {
					body.append('email', data.email);
				}
				if (data.city) {
					body.append('city', data.city);
				}
				if (data.address) {
					body.append('address', data.address);
				}
				if (data.note) {
					body.append('note', data.note);
				}
				if (data.delivery_area_id) {
					body.append('delivery_area_id', String(data.delivery_area_id));
				}
				if (data.courier_id) {
					body.append('courier_id', String(data.courier_id));
				}

				return {
					url: `/tenant-dropshipper/cart/${data.cart_id}`,
					method: 'PUT',
					body,
					formData: true,
				};
			},
			invalidatesTags: ['DropShipperCart'],
		}),

		// delete cart
		DeleteCart: builder.mutation<
			{ status: 200; message: string },
			{ cartId: number }
		>({
			query: ({ cartId }) => ({
				url: `/tenant-dropshipper/delete-cartitem/${cartId}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['DropShipperCart'],
		}),

		CheckoutCart: builder.mutation<{ status: 200; message: string }, any>({
			query: (data) => ({
				url: `/tenant-dropshipper/order-create`,
				method: 'POST',
				body: data,
			}),
		}),
	}),
});

export const {
	useGetAllCartsQuery,
	useCartViewQuery,
	useCreateCartMutation,
	useUpdateCartMutation,
	useDeleteCartMutation,

	useCheckoutCartMutation,
} = api;
