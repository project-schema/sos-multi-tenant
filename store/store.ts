import {
	Action,
	combineReducers,
	configureStore,
	ThunkAction,
} from '@reduxjs/toolkit';

import { apiSlice } from './features/api/apiSlice';
import counterReducer from './features/counter/counterSlice';
import dropshipperCartReducer from './features/dropshipper/cart/dropshipper-cart-slice';
import advertiseFormReducer, {
	AdvertiseFormState,
} from './features/frontend/advertiser-form/advertiser-form-slice';
import barcodeGeneratorReducer from './features/vendor/barcode-generator/barcode-generator.slice';
import posSalesDamageReducer from './features/vendor/damage-products/damage-products.slice';
import posSalesExchangeReducer from './features/vendor/pos-sales/vendor-pos-sales-exchange.slice';
import posSalesReducer from './features/vendor/pos-sales/vendor-pos-sales.slice';
// import webReducer from './web'

// ...

const isBrowser = typeof window !== 'undefined';
const ADVERTISE_FORM_STORAGE_KEY = 'advertiseFormState';

const loadAdvertiseFormState = (): AdvertiseFormState | undefined => {
	if (!isBrowser) return undefined;
	try {
		const serialized = window.localStorage.getItem(ADVERTISE_FORM_STORAGE_KEY);
		if (!serialized) return undefined;
		return JSON.parse(serialized) as AdvertiseFormState;
	} catch (error) {
		console.warn('Failed to load advertise form data from localStorage', error);
		return undefined;
	}
};

const stripUnsupported = (value: unknown): unknown => {
	if (typeof File !== 'undefined' && value instanceof File) return undefined;
	if (typeof Blob !== 'undefined' && value instanceof Blob) return undefined;
	if (value instanceof ArrayBuffer) return undefined;
	if (value instanceof Date) return value.toISOString();
	if (value instanceof Set) return Array.from(value);
	if (value instanceof Map) return Object.fromEntries(value);
	if (typeof value === 'function') return undefined;
	if (Array.isArray(value)) {
		return value
			.map((item) => stripUnsupported(item))
			.filter((item) => item !== undefined);
	}
	if (value && typeof value === 'object') {
		return Object.entries(value as Record<string, unknown>).reduce(
			(acc, [key, val]) => {
				const sanitized = stripUnsupported(val);
				if (sanitized !== undefined) acc[key] = sanitized;
				return acc;
			},
			{} as Record<string, unknown>
		);
	}
	return value;
};

const saveAdvertiseFormState = (state: AdvertiseFormState) => {
	if (!isBrowser) return;
	try {
		const sanitized = stripUnsupported(state);
		window.localStorage.setItem(
			ADVERTISE_FORM_STORAGE_KEY,
			JSON.stringify(sanitized)
		);
	} catch (error) {
		console.warn('Failed to save advertise form data to localStorage', error);
	}
};

const rootReducer = combineReducers({
	counter: counterReducer,
	advertiseForm: advertiseFormReducer,
	posSales: posSalesReducer,
	posSalesExchange: posSalesExchangeReducer,
	posSalesDamage: posSalesDamageReducer,
	barcodeGenerator: barcodeGeneratorReducer,
	dropshipperCart: dropshipperCartReducer,
	[apiSlice.reducerPath]: apiSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const makeStore = () => {
	const preloadedAdvertiseForm = loadAdvertiseFormState();
	const preloadedState = preloadedAdvertiseForm
		? { advertiseForm: preloadedAdvertiseForm }
		: undefined;

	const store = configureStore({
		reducer: rootReducer,
		devTools: process.env.NODE_ENV !== 'production',
		preloadedState,
		middleware: (getDefaultMiddleware) => {
			return getDefaultMiddleware({
				serializableCheck: false,
			}).concat(apiSlice.middleware);
		},
	});

	if (isBrowser) {
		store.subscribe(() => {
			const { advertiseForm } = store.getState();
			saveAdvertiseFormState(advertiseForm);
		});
	}

	return store;
};

export type AppStore = ReturnType<typeof makeStore>;

export type AppDispatch = AppStore['dispatch'];
export type AppThunk<ThunkReturnType = void> = ThunkAction<
	ThunkReturnType,
	RootState,
	unknown,
	Action
>;
