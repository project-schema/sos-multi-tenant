import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Types for POS Sales
export interface CartItem {
	id: number;
	product_id: number;
	variant_id?: number;
	name: string;
	sku: string;
	image: string;
	selling_price: number;
	discount_price?: number;
	discount_percentage?: number;
	quantity: number;
	unit?: string;
	color?: string;
	size?: string;
	stock: number;
	subtotal: number;
	unit_id?: number;
	color_id?: number;
	size_id?: number;
}

export interface Customer {
	id?: number;
	customer_name: string;
	phone: string;
	email?: string;
	address?: string;
}

export interface PaymentInfo {
	method: 'cash' | 'card' | 'mobile_banking' | 'bank_transfer';
	amount: number;
	reference?: string;
}

export interface InvoiceInfo {
	invoice_no?: string;
	date: string;
	due_date?: string;
	notes?: string;
}

export interface PosSalesState {
	cart: CartItem[];
	customer: Customer | null;
	payment: PaymentInfo | null;
	invoice: InvoiceInfo;
	subtotal: number;
	discount: number;
	tax: number;
	total: number;
	loading: boolean;
	error: string | null;
	product_id: number | null;
}

const initialState: PosSalesState = {
	cart: [],
	customer: null,
	payment: null,
	invoice: {
		date: new Date().toISOString().split('T')[0],
	},
	subtotal: 0,
	discount: 0,
	tax: 0,
	total: 0,
	loading: false,
	error: null,
	product_id: null,
};

const calculateTotals = (
	cart: CartItem[],
	discount: number = 0,
	tax: number = 0
) => {
	const subtotal = cart.reduce((sum, item) => sum + item.subtotal, 0);
	const discountAmount = (subtotal * discount) / 100;
	const taxAmount = ((subtotal - discountAmount) * tax) / 100;
	const total = subtotal - discountAmount + taxAmount;

	return { subtotal, discountAmount, taxAmount, total };
};

const posSalesExchangeSlice = createSlice({
	name: 'posSalesExchange',
	initialState,
	reducers: {
		// Cart Management
		addToCartExchange: (state, action: PayloadAction<CartItem>) => {
			const existingItem = state.cart.find(
				(item) =>
					item.id === action.payload.id &&
					item.variant_id === action.payload.variant_id
			);

			if (existingItem) {
				// Update quantity if item already exists
				existingItem.quantity += action.payload.quantity;
				existingItem.subtotal =
					existingItem.quantity * existingItem.selling_price;
			} else {
				// Add new item to cart
				state.cart.push(action.payload);
			}

			const totals = calculateTotals(state.cart, state.discount, state.tax);
			state.subtotal = totals.subtotal;
			state.total = totals.total;
		},

		updateCartItemQuantityExchange: (
			state,
			action: PayloadAction<{
				id: number;
				variant_id?: number;
				quantity: number;
			}>
		) => {
			const { id, variant_id, quantity } = action.payload;
			const item = state.cart.find(
				(item) => item.id === id && item.variant_id === variant_id
			);

			if (item) {
				item.quantity = Math.max(0, quantity);
				item.subtotal = item.quantity * item.selling_price;

				// Remove item if quantity is 0
				if (item.quantity === 0) {
					state.cart = state.cart.filter(
						(cartItem) =>
							!(cartItem.id === id && cartItem.variant_id === variant_id)
					);
				}

				const totals = calculateTotals(state.cart, state.discount, state.tax);
				state.subtotal = totals.subtotal;
				state.total = totals.total;
			}
		},

		removeFromCartExchange: (
			state,
			action: PayloadAction<{ id: number; variant_id?: number }>
		) => {
			const { id, variant_id } = action.payload;
			console.log({ id, variant_id });
			state.cart = state.cart.filter(
				(item) => !(item.id === id && item.variant_id === variant_id)
			);

			const totals = calculateTotals(state.cart, state.discount, state.tax);
			state.subtotal = totals.subtotal;
			state.total = totals.total;
		},

		clearCartExchange: (state) => {
			state.cart = [];
			state.subtotal = 0;
			state.discount = 0;
			state.tax = 0;
			state.total = 0;
		},

		// Customer Management
		setCustomerExchange: (state, action: PayloadAction<Customer | null>) => {
			state.customer = action.payload;
		},

		updateCustomerExchange: (
			state,
			action: PayloadAction<Partial<Customer>>
		) => {
			if (state.customer) {
				state.customer = { ...state.customer, ...action.payload };
			}
		},

		// Payment Management
		setPaymentExchange: (state, action: PayloadAction<PaymentInfo | null>) => {
			state.payment = action.payload;
		},

		updatePaymentExchange: (
			state,
			action: PayloadAction<Partial<PaymentInfo>>
		) => {
			if (state.payment) {
				state.payment = { ...state.payment, ...action.payload };
			}
		},

		// Invoice Management
		setInvoiceExchange: (state, action: PayloadAction<InvoiceInfo>) => {
			state.invoice = { ...state.invoice, ...action.payload };
		},

		// Discount and Tax Management
		setDiscountExchange: (state, action: PayloadAction<number>) => {
			state.discount = action.payload;
			const totals = calculateTotals(state.cart, state.discount, state.tax);
			state.subtotal = totals.subtotal;
			state.total = totals.total;
		},

		setTaxExchange: (state, action: PayloadAction<number>) => {
			state.tax = action.payload;
			const totals = calculateTotals(state.cart, state.discount, state.tax);
			state.subtotal = totals.subtotal;
			state.total = totals.total;
		},

		// Loading States
		setLoadingExchange: (state, action: PayloadAction<boolean>) => {
			state.loading = action.payload;
		},

		setErrorExchange: (state, action: PayloadAction<string | null>) => {
			state.error = action.payload;
		},

		// Reset State
		resetPosSalesExchange: (state) => {
			return {
				...initialState,
				invoice: { date: new Date().toISOString().split('T')[0] },
			};
		},
	},
});

export const {
	addToCartExchange,
	updateCartItemQuantityExchange,
	removeFromCartExchange,
	clearCartExchange,
	setCustomerExchange,
	updateCustomerExchange,
	setPaymentExchange,
	updatePaymentExchange,
	setInvoiceExchange,
	setDiscountExchange,
	setTaxExchange,
	setLoadingExchange,
	setErrorExchange,
	resetPosSalesExchange,
} = posSalesExchangeSlice.actions;

export default posSalesExchangeSlice.reducer;
