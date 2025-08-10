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
	cards: any;
	paymethod: 'aamarpay' | 'my-wallet';
};

// Define the initial state using that type
const initialState: AdvertiseFormState = {
	step: 1,
	level1: null,
	level2: {},
	level3: {},
	cards: [],
	paymethod: 'aamarpay',
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
			state.cards = action.payload;
		},
		updatePaymentMethod(
			state,
			action: PayloadAction<'aamarpay' | 'my-wallet'>
		) {
			state.paymethod = action.payload;
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
	updatePaymentMethod,
} = advertiseForm.actions;

// Other code such as selectors can use the imported `RootState` type
export const advertiseStep = (state: RootState) => state.advertiseForm.step;

export default advertiseForm.reducer;

export const level2Format = (level2: any) => {
	const data = {
		campaign_name: level2.campaign_name || null,
		age: level2.age || null,
		ageto: level2.ageto || null,
		conversion_location: level2.conversion_location || null,
		performance_goal: level2.performance_goal || null,
		budget: level2.budget || null,
		gender: level2.gender || null,
		detail_targeting: level2.detail_targeting || null,
		budget_amount: level2.budget_amount || null,
		country: level2.country || null,
		inventory: level2.inventory || null,
		start_date: level2.start_date && format(level2.start_date, 'dd-MM-yyyy'),
		end_date: level2.end_date && format(level2.end_date, 'dd-MM-yyyy'),

		advertise_audience_files: level2.advertise_audience_files,
		location_files: level2.location_files,

		city: level2.city?.map((item: any) => item.value),

		platform: level2.platform?.map((item: any) => item.value),
		device: level2.device?.map((item: any) => item.value),

		placements: [
			{ feeds: level2.feeds?.map((item: any) => item.value) },
			{
				story_reels: level2.story_reels?.map((item: any) => item.value),
			},
			{
				adds_video_and_reels: level2.adds_video_and_reels?.map(
					(item: any) => item.value
				),
			},
			{
				search_result: level2.search_result?.map((item: any) => item.value),
			},
			{
				messages: level2.messages?.map((item: any) => item.value),
			},
			{
				apps_and_sites: level2.apps_and_sites?.map((item: any) => item.value),
			},
		],
	};

	return data;
};

export const level3Format = (level3: any) => {
	const data = {
		...level3,
		ad_creative: level3?.cards,
	};
	delete data?.cards;
	return data;
};

export const level2SubmitFormat = (data: any) => {
	const body = new FormData();

	const appendFormData = (formData: FormData, key: string, value: any) => {
		if (value instanceof File) {
			formData.append(key, value);
		} else if (Array.isArray(value)) {
			value.forEach((v, i) => {
				// Check if the key ends with "[]"
				if (key.endsWith('[]')) {
					formData.append(key, v);
				} else {
					appendFormData(formData, `${key}[${i}]`, v);
				}
			});
		} else if (typeof value === 'object' && value !== null) {
			Object.entries(value).forEach(([k, v]) => {
				appendFormData(formData, `${key}[${k}]`, v);
			});
		} else if (value !== undefined && value !== null) {
			formData.append(key, value);
		}
	};

	Object.entries(data).forEach(([key, value]) => {
		if (
			key === 'city' ||
			key === 'advertise_audience_files' ||
			key === 'location_files'
		) {
			appendFormData(body, `${key}[]`, value);
		} else {
			appendFormData(body, key, value);
		}
		if (key === 'postid') {
			body.append(`ad_creative[0][postid]`, value as string);
		}
	});

	return body;
};

/*
ad_creative[0][format] : value
ad_creative[0][primary_text] : value
ad_creative[0][media] : value
ad_creative[0][heading] : value
ad_creative[0][description] : value
ad_creative[0][call_to_action] : value
ad_creative[0][id] : value
*/

export const L2_RequitedField = [
	'campaign_name',
	'conversion_location',
	'performance_goal',
	'budget',
	'budget_amount',
	'start_date',
	'end_date',
	'age',
	'ageto',
	'gender',
	'detail_targeting',
	'country',
	'city',
	'location_files',
	'device',
	'platform',
	'inventory',
	'placements',
];
export const L3_RequitedField = [
	'platforms',
	'ad_creative',
	'format',
	'url_perimeter',
	'number',
	'last_description',
];
export const payment = ['paymethod', 'budget_amount'];
