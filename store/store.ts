import {
	Action,
	combineReducers,
	configureStore,
	ThunkAction,
} from '@reduxjs/toolkit';

import { apiSlice } from './features/api/apiSlice';
import counterReducer from './features/counter/counterSlice';
import advertiseFormReducer from './features/frontend/advertiser-form/advertiser-form-slice';
import barcodeGeneratorReducer from './features/vendor/barcode-generator/barcode-generator.slice';
import posSalesDamageReducer from './features/vendor/damage-products/damage-products.slice';
import posSalesExchangeReducer from './features/vendor/pos-sales/vendor-pos-sales-exchange.slice';
import posSalesReducer from './features/vendor/pos-sales/vendor-pos-sales.slice';
import dropshipperCartReducer from './features/dropshipper/cart/dropshipper-cart-slice';
// import webReducer from './web'

// ...

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
	return configureStore({
		reducer: rootReducer,
		devTools: process.env.NODE_ENV !== 'production',

		middleware: (getDefaultMiddleware) => {
			return getDefaultMiddleware({
				serializableCheck: false,
			}).concat(apiSlice.middleware);
		},
	});
};

export type AppStore = ReturnType<typeof makeStore>;

export type AppDispatch = AppStore['dispatch'];
export type AppThunk<ThunkReturnType = void> = ThunkAction<
	ThunkReturnType,
	RootState,
	unknown,
	Action
>;
