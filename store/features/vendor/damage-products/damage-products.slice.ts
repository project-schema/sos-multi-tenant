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
	remark: string;
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

export interface PosSalesDamageState {
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
	note: string;
}

const initialState: PosSalesDamageState = {
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
	note: '',
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

const posSalesDamageSlice = createSlice({
	name: 'posSalesDamage',
	initialState,
	reducers: {
		// Cart Management
		addToCart: (state, action: PayloadAction<CartItem>) => {
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

		updateCartItemQuantity: (
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

		removeFromCart: (
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

		setCartRemark: (
			state,
			action: PayloadAction<{ id: number; variant_id?: number; remark: string }>
		) => {
			const { id, variant_id, remark } = action.payload;
			const item = state.cart.find(
				(item) => item.id === id && item.variant_id === variant_id
			);
			if (item) {
				item.remark = remark;
			}
		},

		clearCart: (state) => {
			state.cart = [];
			state.subtotal = 0;
			state.discount = 0;
			state.tax = 0;
			state.total = 0;
			state.note = '';
		},

		// Customer Management
		setCustomer: (state, action: PayloadAction<Customer | null>) => {
			state.customer = action.payload;
		},

		updateCustomer: (state, action: PayloadAction<Partial<Customer>>) => {
			if (state.customer) {
				state.customer = { ...state.customer, ...action.payload };
			}
		},

		// Payment Management
		setPayment: (state, action: PayloadAction<PaymentInfo | null>) => {
			state.payment = action.payload;
		},

		updatePayment: (state, action: PayloadAction<Partial<PaymentInfo>>) => {
			if (state.payment) {
				state.payment = { ...state.payment, ...action.payload };
			}
		},

		// Invoice Management
		setInvoice: (state, action: PayloadAction<InvoiceInfo>) => {
			state.invoice = { ...state.invoice, ...action.payload };
		},

		// Discount and Tax Management
		setDiscount: (state, action: PayloadAction<number>) => {
			state.discount = action.payload;
			const totals = calculateTotals(state.cart, state.discount, state.tax);
			state.subtotal = totals.subtotal;
			state.total = totals.total;
		},

		setTax: (state, action: PayloadAction<number>) => {
			state.tax = action.payload;
			const totals = calculateTotals(state.cart, state.discount, state.tax);
			state.subtotal = totals.subtotal;
			state.total = totals.total;
		},

		setNote: (state, action: PayloadAction<{ note: string }>) => {
			const { note } = action.payload;
			state.note = note;
		},

		// Loading States
		setLoading: (state, action: PayloadAction<boolean>) => {
			state.loading = action.payload;
		},

		setError: (state, action: PayloadAction<string | null>) => {
			state.error = action.payload;
		},

		// Reset State
		resetPosSales: (state) => {
			return {
				...initialState,
				invoice: { date: new Date().toISOString().split('T')[0] },
			};
		},
	},
});

export const {
	addToCart,
	updateCartItemQuantity,
	removeFromCart,
	clearCart,
	setCustomer,
	updateCustomer,
	setPayment,
	updatePayment,
	setInvoice,
	setDiscount,
	setTax,
	setLoading,
	setError,
	resetPosSales,
	setNote,
	setCartRemark,
} = posSalesDamageSlice.actions;

export default posSalesDamageSlice.reducer;
