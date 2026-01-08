import { apiSlice } from '../../api/apiSlice';
import { iVendorDeliveryCharge } from '../../vendor/delivery-charge/vendor-delivery-charge-type';
import { iVendorProduct } from '../../vendor/product/vendor-product-type';

// Types
export type iCartItemDetail = {
	id: number;
	cart_id: number;
	color: string | null;
	size: string | null;
	qty: number;
	variant_id: number | null;
	unit_id: number | null;
};

export type iCartItem = {
	id: number;
	user_id: number;
	product_id: number;
	product_price: string;
	vendor_id: number;
	amount: string;
	category_id: number;
	product_qty: number;
	totalproductprice: string;
	total_affiliate_commission: string;
	purchase_type: 'single' | 'bulk';
	advancepayment: string;
	totaladvancepayment: string;
	tenant_id: string | null;
	created_at: string;
	updated_at: string;
	product?: iVendorProduct;
	cart_details?: iCartItemDetail[];
};

export type iCartResponse = {
	message: string;
	success: boolean;
	cart: iCartItem[];
	deliveryCharge: iVendorDeliveryCharge[];
};

export type iAddToCartRequest = {
	product_id: number;
	purchase_type: 'single' | 'bulk';
	tenant_id: string;
	qty: number[];
	size_id: string | null[];
	color_id: string | null[];
	frontend_purchase: 'yes' | 'no';
	unit_id: string | null[];
	cartItems: {
		qty: number;
		color?: string | null;
		size?: string | null;
		variant_id?: number | null;
		unit?: number | null;
	}[];
};

export type iAddToCartResponse = {
	status: number;
	message: string;
};

export type iDeleteCartResponse = {
	message: string;
	success: boolean;
};

// Order types
export type iPlaceOrderRequest = {
	name: string;
	phone: string;
	address: string;
	notes?: string;
	payment_method: 'cod' | 'online';
	shipping_cost?: number;
	discount?: number;
};
const data = {
	cart_id: '31',
	tenant_id: 'borax',
	datas: [
		{
			id: 1767889655371,
			name: 'Abdur',
			phone: '01818321271',
			email: 'abdur.shobur.me@gmail.com',
			area_name: 'Dhaka',
			city: 'Dhaka',
			item_type: 2,
			item_weight: 1,
			amount_to_collect: 260,
			delivery_type: 1,
			item_quantity: 1,
			special_instruction: '121',
			item_description:
				'Product Description: sadasdas Order Phone: 01818321271',
			address: 'Dhaka\nDhaka',
			variants: [
				{
					id: 55,
					unit: {
						id: 1,
						unit_name: 'Kg',
					},
					qty: '1',
					size: {
						id: 2,
						name: 'Variant 2',
					},
					color: {
						id: 1,
						name: 'Color 1',
					},
					variant_id: '12',
					previousQty: '2',
				},
			],
		},
	],
	payment_type: 'my-wallet',
	tenant_type: 'tenant',
};

export type iPlaceOrderRequestData = typeof data;

export type iPlaceOrderResponse = {
	status: number;
	success: boolean;
	message: string;
	data?: {
		order_id: number;
		order_number: string;
	};
};

const api = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		// Get cart
		getCart: builder.query<iCartResponse, void>({
			query: () => ({
				url: `/tenant-frontend/cart`,
				method: 'GET',
			}),
			providesTags: ['Cart'],
		}),

		// Add to cart
		addToCart: builder.mutation<iAddToCartResponse, iAddToCartRequest>({
			query: (data) => ({
				url: `/tenant-frontend/add-to-cart`,
				method: 'POST',
				body: data,
			}),
			invalidatesTags: ['Cart'],
		}),

		// Delete from cart
		deleteFromCart: builder.mutation<iDeleteCartResponse, { id: number }>({
			query: ({ id }) => ({
				url: `/tenant-frontend/cart/${id}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['Cart'],
		}),

		// Place order
		placeOrder: builder.mutation<iPlaceOrderResponse, iPlaceOrderRequestData>({
			query: (data) => ({
				url: `/frontend-order-create`,
				method: 'POST',
				body: data,
			}),
			invalidatesTags: ['Cart'],
		}),
	}),
});

export const {
	useGetCartQuery,
	useAddToCartMutation,
	useDeleteFromCartMutation,
	usePlaceOrderMutation,
} = api;
