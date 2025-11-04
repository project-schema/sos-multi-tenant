import { RootState } from '@/store';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { iDropShipperCart } from './type';

export interface CartItemCreate {
	product_id: number;
	product_qty: number;
	variant_id?: string | null;
	color_id?: number | null;
	size_id?: number | null;
	unit_id?: number | null;
	product_price?: string;
	// For API payload compatibility
	color?: number | null;
	size?: number | null;
}

export interface ShippingAddress {
	first_name: string;
	last_name?: string;
	phone: string;
	email: string;
	city: string;
	address: string;
	note?: string;
	delivery_area_id?: number | null;
	courier_id?: number | null;
}

export interface CartCreateState {
	// Cart items to be created/edited
	cartItems: CartItemCreate[];
	
	// Shipping address
	shippingAddress: ShippingAddress | null;
	
	// Selected cart for editing (if editing existing cart)
	editingCartId: number | null;
	
	// Form mode: 'create' | 'edit'
	mode: 'create' | 'edit';
	
	// Quantity selection for specific products
	productQuantities: Record<number, number>;
	
	// Selected variants for products
	productVariants: Record<
		number,
		{
			variant_id?: string | null;
			color_id?: number | null;
			size_id?: number | null;
			unit_id?: number | null;
		}
	>;
}

const initialState: CartCreateState = {
	cartItems: [],
	shippingAddress: null,
	editingCartId: null,
	mode: 'create',
	productQuantities: {},
	productVariants: {},
};

const dropshipperCartSlice = createSlice({
	name: 'dropshipperCart',
	initialState,
	reducers: {
		// Add product to cart items
		addCartItem: (state, action: PayloadAction<CartItemCreate>) => {
			const existingIndex = state.cartItems.findIndex(
				(item) => item.product_id === action.payload.product_id
			);
			
			if (existingIndex >= 0) {
				// Update existing item
				state.cartItems[existingIndex] = {
					...state.cartItems[existingIndex],
					...action.payload,
				};
			} else {
				// Add new item
				state.cartItems.push(action.payload);
			}
		},

		// Remove product from cart items
		removeCartItem: (state, action: PayloadAction<number>) => {
			state.cartItems = state.cartItems.filter(
				(item) => item.product_id !== action.payload
			);
			// Clean up related state
			delete state.productQuantities[action.payload];
			delete state.productVariants[action.payload];
		},

		// Update quantity for a specific product
		updateProductQuantity: (
			state,
			action: PayloadAction<{ productId: number; quantity: number }>
		) => {
			const { productId, quantity } = action.payload;
			state.productQuantities[productId] = quantity;
			
			// Update cart item if it exists
			const cartItemIndex = state.cartItems.findIndex(
				(item) => item.product_id === productId
			);
			if (cartItemIndex >= 0) {
				state.cartItems[cartItemIndex].product_qty = quantity;
			}
		},

		// Update variant for a specific product
		updateProductVariant: (
			state,
			action: PayloadAction<{
				productId: number;
				variant: {
					variant_id?: string | null;
					color_id?: number | null;
					size_id?: number | null;
					unit_id?: number | null;
				};
			}>
		) => {
			const { productId, variant } = action.payload;
			state.productVariants[productId] = variant;
			
			// Update cart item if it exists
			const cartItemIndex = state.cartItems.findIndex(
				(item) => item.product_id === productId
			);
			if (cartItemIndex >= 0) {
				state.cartItems[cartItemIndex] = {
					...state.cartItems[cartItemIndex],
					...variant,
				};
			}
		},

		// Set shipping address
		setShippingAddress: (state, action: PayloadAction<ShippingAddress>) => {
			state.shippingAddress = action.payload;
		},

		// Update shipping address fields
		updateShippingAddress: (
			state,
			action: PayloadAction<Partial<ShippingAddress>>
		) => {
			if (state.shippingAddress) {
				state.shippingAddress = {
					...state.shippingAddress,
					...action.payload,
				};
			} else {
				state.shippingAddress = action.payload as ShippingAddress;
			}
		},

		// Set editing mode and load cart data
		setEditMode: (
			state,
			action: PayloadAction<{
				cartId: number;
				cartItems: CartItemCreate[];
				shippingAddress?: ShippingAddress;
			}>
		) => {
			state.mode = 'edit';
			state.editingCartId = action.payload.cartId;
			state.cartItems = action.payload.cartItems;
			
			// Set quantities
			action.payload.cartItems.forEach((item) => {
				state.productQuantities[item.product_id] = item.product_qty;
				state.productVariants[item.product_id] = {
					variant_id: item.variant_id,
					color_id: item.color_id || null,
					size_id: item.size_id || null,
					unit_id: item.unit_id || null,
				};
			});
			
			if (action.payload.shippingAddress) {
				state.shippingAddress = action.payload.shippingAddress;
			}
		},

		// Set create mode
		setCreateMode: (state) => {
			state.mode = 'create';
			state.editingCartId = null;
			state.cartItems = [];
			state.productQuantities = {};
			state.productVariants = {};
			state.shippingAddress = null;
		},

		// Clear all cart items
		clearCartItems: (state) => {
			state.cartItems = [];
			state.productQuantities = {};
			state.productVariants = {};
		},

		// Reset entire state
		resetCartState: (state) => {
			return initialState;
		},

		// Initialize from existing cart products
		initializeFromProducts: (
			state,
			action: PayloadAction<iDropShipperCart[]>
		) => {
			state.cartItems = action.payload.map((product) => ({
				product_id: product.id,
				product_qty: parseInt(product.qty) || 1,
				product_price: product.selling_price,
			}));
			
			// Set initial quantities
			action.payload.forEach((product) => {
				state.productQuantities[product.id] = parseInt(product.qty) || 1;
			});
		},
	},
});

export const {
	addCartItem,
	removeCartItem,
	updateProductQuantity,
	updateProductVariant,
	setShippingAddress,
	updateShippingAddress,
	setEditMode,
	setCreateMode,
	clearCartItems,
	resetCartState,
	initializeFromProducts,
} = dropshipperCartSlice.actions;

// Selectors
export const selectCartItems = (state: RootState) =>
	state.dropshipperCart.cartItems;
export const selectShippingAddress = (state: RootState) =>
	state.dropshipperCart.shippingAddress;
export const selectCartMode = (state: RootState) => state.dropshipperCart.mode;
export const selectEditingCartId = (state: RootState) =>
	state.dropshipperCart.editingCartId;
export const selectProductQuantity = (productId: number) => (state: RootState) =>
	state.dropshipperCart.productQuantities[productId] || 1;
export const selectProductVariant = (productId: number) => (state: RootState) =>
	state.dropshipperCart.productVariants[productId] || {};

export default dropshipperCartSlice.reducer;

