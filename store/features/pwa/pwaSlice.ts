import { RootState } from '@/store';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface PwaState {
	installed: boolean;
	dismissedUntil: number | null;
}

export const PWA_STORAGE_KEY = 'pwaPromptState';

// const FIFTEEN_DAYS_MS = 15 * 24 * 60 * 60 * 1000;
const FIFTEEN_DAYS_MS = 1000;

const initialState: PwaState = {
	installed: false,
	dismissedUntil: null,
};

export const pwaSlice = createSlice({
	name: 'pwa',
	initialState,
	reducers: {
		setInstalled: (state) => {
			state.installed = true;
			state.dismissedUntil = null;
		},
		dismissFor15Days: (state) => {
			state.dismissedUntil = Date.now() + FIFTEEN_DAYS_MS;
		},
		resetPrompt: (state) => {
			state.dismissedUntil = null;
		},
		hydratePwaState: (state, action: PayloadAction<PwaState>) => {
			state.installed = action.payload.installed;
			state.dismissedUntil = action.payload.dismissedUntil;
		},
	},
});

export const { setInstalled, dismissFor15Days, resetPrompt, hydratePwaState } =
	pwaSlice.actions;

export const selectIsInstalled = (state: RootState) => state.pwa.installed;

export const selectDismissedUntil = (state: RootState) =>
	state.pwa.dismissedUntil;

export const selectCanShowPrompt = (state: RootState) => {
	if (state.pwa.installed) return false;

	const { dismissedUntil } = state.pwa;
	if (dismissedUntil === null) return true;

	return Date.now() > dismissedUntil;
};

export default pwaSlice.reducer;
