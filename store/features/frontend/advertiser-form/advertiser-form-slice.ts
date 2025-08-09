import { RootState } from '@/store/store';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { format } from 'date-fns';
import { iCampaignCategory } from '../../admin/advertise-utilities';

type AdvertiseFormState = {
	step: number;
	level1: iCampaignCategory | null;
	level2: any;
	level3: any;
	cardsCreate: any;
};

// Define the initial state using that type
const initialState: AdvertiseFormState = {
	step: 1,
	level1: null,
	level2: {},
	level3: {},
	cardsCreate: { init: {}, cards: [] },
};

const advertiseForm = createSlice({
	name: 'form',
	initialState,
	reducers: {
		nextStep(state) {
			state.step += 1;
		},
		prevStep(state) {
			state.step -= 1;
		},
		updateLevel1(state, action: PayloadAction<iCampaignCategory>) {
			state.level1 = action.payload;
		},
		updateLevel2(state, action: PayloadAction<any>) {
			state.level2 = action.payload;
		},
		updateLevel3(state, action: PayloadAction<any>) {
			state.level3 = action.payload;
		},
		updateCardsCreate(state, action: PayloadAction<any>) {
			state.cardsCreate = action.payload;
		},
	},
});

export const {
	nextStep,
	prevStep,
	updateLevel1,
	updateLevel2,
	updateLevel3,
	updateCardsCreate,
} = advertiseForm.actions;

// Other code such as selectors can use the imported `RootState` type
export const advertiseStep = (state: RootState) => state.advertiseForm.step;

export default advertiseForm.reducer;

export const level2Format = (level2: any) => {
	const data = {
		...level2,
		start_date: format(level2.start_date, 'dd-MM-yyyy'),
		end_date: format(level2.end_date, 'dd-MM-yyyy'),
		city: level2.city?.map((item: any) => item.value),
		platform: level2.platform?.map((item: any) => item.value),
		device: level2.device?.map((item: any) => item.value),
		adds_video_and_reels: level2.adds_video_and_reels?.map(
			(item: any) => item.value
		),
		story_reels: level2.story_reels?.map((item: any) => item.value),
		messages: level2.messages?.map((item: any) => item.value),
		apps_and_sites: level2.apps_and_sites?.map((item: any) => item.value),
		feeds: level2.feeds?.map((item: any) => item.value),
		search_result: level2.search_result?.map((item: any) => item.value),
	};

	return data;
};
