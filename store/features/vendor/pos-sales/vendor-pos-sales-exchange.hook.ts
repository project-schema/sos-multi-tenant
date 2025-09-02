import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store';
import {
	addToCartExchange,
	clearCartExchange,
	removeFromCartExchange,
	resetPosSalesExchange,
	setCustomerExchange,
	setDiscountExchange,
	setErrorExchange,
	setInvoiceExchange,
	setLoadingExchange,
	setPaymentExchange,
	setTaxExchange,
	updateCartItemQuantityExchange,
	updateCustomerExchange,
	updatePaymentExchange,
} from './vendor-pos-sales-exchange.slice';

export const usePosSalesExchangeSelector = () => {
	return useSelector((state: RootState) => state.posSalesExchange);
};

export const useCartExchangeSelector = () => {
	return useSelector((state: RootState) => state.posSalesExchange.cart);
};

export const useCustomerExchangeSelector = () => {
	return useSelector((state: RootState) => state.posSalesExchange.customer);
};

export const usePaymentExchangeSelector = () => {
	return useSelector((state: RootState) => state.posSalesExchange.payment);
};

export const useInvoiceExchangeSelector = () => {
	return useSelector((state: RootState) => state.posSalesExchange.invoice);
};

export const useTotalsExchangeSelector = () => {
	const { subtotal, discount, tax, total } = useSelector(
		(state: RootState) => state.posSalesExchange
	);
	return { subtotal, discount, tax, total };
};

export const usePosSalesExchangeActions = () => {
	const dispatch = useDispatch();

	return {
		addToCart: (item: Parameters<typeof addToCartExchange>[0]) =>
			dispatch(addToCartExchange(item)),
		updateCartItemQuantity: (payload: {
			id: number;
			variant_id?: number;
			quantity: number;
		}) => dispatch(updateCartItemQuantityExchange(payload)),
		removeFromCart: (payload: { id: number; variant_id?: number }) =>
			dispatch(removeFromCartExchange(payload)),
		clearCart: () => dispatch(clearCartExchange()),

		setCustomer: (customer: Parameters<typeof setCustomerExchange>[0]) =>
			dispatch(setCustomerExchange(customer)),
		updateCustomer: (customer: Parameters<typeof updateCustomerExchange>[0]) =>
			dispatch(updateCustomerExchange(customer)),

		setPayment: (payment: Parameters<typeof setPaymentExchange>[0]) =>
			dispatch(setPaymentExchange(payment)),
		updatePayment: (payment: Parameters<typeof updatePaymentExchange>[0]) =>
			dispatch(updatePaymentExchange(payment)),

		setInvoice: (invoice: Parameters<typeof setInvoiceExchange>[0]) =>
			dispatch(setInvoiceExchange(invoice)),

		setDiscount: (discount: number) => dispatch(setDiscountExchange(discount)),
		setTax: (tax: number) => dispatch(setTaxExchange(tax)),

		setLoading: (loading: boolean) => dispatch(setLoadingExchange(loading)),
		setError: (error: string | null) => dispatch(setErrorExchange(error)),
		resetPosSales: () => dispatch(resetPosSalesExchange()),
	};
};

export const usePosSalesExchange = () => {
	const state = usePosSalesExchangeSelector();
	const actions = usePosSalesExchangeActions();

	return {
		...state,
		...actions,
	};
};
