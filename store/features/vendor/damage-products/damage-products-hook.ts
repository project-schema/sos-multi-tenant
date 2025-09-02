import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store';
import {
	addToCart,
	CartItem,
	clearCart,
	Customer,
	InvoiceInfo,
	PaymentInfo,
	removeFromCart,
	resetPosSales,
	setCartRemark,
	setCustomer,
	setDiscount,
	setError,
	setInvoice,
	setLoading,
	setNote,
	setPayment,
	setTax,
	updateCartItemQuantity,
	updateCustomer,
	updatePayment,
} from './damage-products.slice';

// Selectors
export const usePosSalesDamageSelector = () => {
	return useSelector((state: RootState) => state.posSalesDamage);
};

export const useCartSelector = () => {
	return useSelector((state: RootState) => state.posSalesDamage.cart);
};

export const useCustomerSelector = () => {
	return useSelector((state: RootState) => state.posSalesDamage.customer);
};

export const usePaymentSelector = () => {
	return useSelector((state: RootState) => state.posSalesDamage.payment);
};

export const useInvoiceSelector = () => {
	return useSelector((state: RootState) => state.posSalesDamage.invoice);
};

export const useTotalsSelector = () => {
	const { subtotal, discount, tax, total } = useSelector(
		(state: RootState) => state.posSalesDamage
	);
	return { subtotal, discount, tax, total };
};

// Actions Hook
export const usePosSalesDamageActions = () => {
	const dispatch = useDispatch();

	return {
		// Cart Actions
		addToCart: (item: CartItem) => dispatch(addToCart(item)),
		updateCartItemQuantity: (payload: {
			id: number;
			variant_id?: number;
			quantity: number;
		}) => dispatch(updateCartItemQuantity(payload)),
		removeFromCart: (payload: { id: number; variant_id?: number }) =>
			dispatch(removeFromCart(payload)),
		clearCart: () => dispatch(clearCart()),
		setNote: (note: string) => dispatch(setNote({ note })),
		setCartRemark: (payload: {
			id: number;
			variant_id?: number;
			remark: string;
		}) => dispatch(setCartRemark(payload)),
		// Customer Actions
		setCustomer: (customer: Customer | null) => dispatch(setCustomer(customer)),
		updateCustomer: (customer: Partial<Customer>) =>
			dispatch(updateCustomer(customer)),

		// Payment Actions
		setPayment: (payment: PaymentInfo | null) => dispatch(setPayment(payment)),
		updatePayment: (payment: Partial<PaymentInfo>) =>
			dispatch(updatePayment(payment)),

		// Invoice Actions
		setInvoice: (invoice: InvoiceInfo) => dispatch(setInvoice(invoice)),

		// Calculation Actions
		setDiscount: (discount: number) => dispatch(setDiscount(discount)),
		setTax: (tax: number) => dispatch(setTax(tax)),

		// Utility Actions
		setLoading: (loading: boolean) => dispatch(setLoading(loading)),
		setError: (error: string | null) => dispatch(setError(error)),
		resetPosSales: () => dispatch(resetPosSales()),
	};
};

// Combined Hook for easy access
export const usePosSalesDamage = () => {
	const state = usePosSalesDamageSelector();
	const actions = usePosSalesDamageActions();

	return {
		...state,
		...actions,
	};
};
