import { convertDate } from '@/components/actions/action';
import { AppAction, AppState, i_img } from './type';

export const initialState: AppState = {
	level1: {
		campaign_objective: '',
		complete: false,
		selected: '',
	},
	level2: {
		campaign_name: '',
		conversion_location: '',
		performance_goal: '',
		budget: 'Daily Budget',
		budget_amount: '',
		start_date: null,
		start_date_view: new Date(),
		end_date: null,
		end_date_view: new Date(),
		audience: '',
		age: '',
		ageto: '',
		gender: 'Male',
		detail_targeting: '',
		advertise_audience_files: [],
		advertise_audience_files_url: [],
		country: '',
		countryID: 0,
		city: '',
		stateid: 0,
		location_files: [],
		location_files_url: [],
		device: '',
		platform: '',
		inventory: 'Expanded Inventory',
		feeds: '',
		story_reels: '',
		adds_video_and_reels: '',
		search_result: '',
		messages: '',
		apps_and_sites: '',
		placements: '',
	},
	level3: {
		destination: '',
		format: 'Existing Add',
		tracking: '',
		url_perimeter: '',
		number: '',
		last_description: '',
		status: 'pending',
		postid: '',
	},
	cardsCreate: {
		init: {
			format: '',
			primary_text: '',
			media: '',
			heading: '',
			description: '',
			call_to_action: '',
			id: 0,
		},
		cards: [],
	},
	apiResponse: {
		campaign_objective: null,
		campaign_name: null,
		conversion_location: null,
		performance_goal: null,
		platforms: null,
		ad_creative: null,
		budget: null,
		budget_amount: null,
		start_date: null,
		end_date: null,
		age: null,
		ageto: null,
		gender: null,
		detail_targeting: null,
		country: null,
		city: null,
		device: null,
		platform: null,
		inventory: null,
		format: null,
		destination: null,
		tracking: null,
		url_perimeter: null,
		number: null,
		last_description: null,
		status: null,
		advertise_audience_files: null,
		location_files: null,
		paymethod: null,
		placements: null,
	},
	errorMessage: {
		errorL2: false,
		errorL3: false,
		errorL4: false,
	},
	checkout: {
		paymethod: 'aamarpay',
	},
};

export const reducer = (state = initialState, action: AppAction): AppState => {
	switch (action.type) {
		case 'INPUT_L1':
			let complete = false;
			if (action.payload.value === '') {
				complete = false;
			} else {
				complete = true;
			}
			return {
				...state,
				level1: {
					...state.level1,
					[action.payload.name]: action.payload.value,
					selected: action.payload.selected,
					complete: complete,
				},
			};
		case 'INPUT_L2':
 			return {
				...state,
				level2: {
					...state.level2,
					[action.payload.name]: action.payload.value,
				},
				apiResponse: {
					...state.apiResponse,
					[action.payload.name]: null,
				},
			};
		case 'INPUT_L2_PLACEMENT':
			return {
				...state,
				level2: {
					...state.level2,
					[action.payload.name]: action.payload.value,
				},
				apiResponse: {
					...state.apiResponse,
					placements: null,
				},
			};
		case 'SELECT_COUNTRY':
			return {
				...state,
				level2: {
					...state.level2,
					[action.payload.name]: action.payload.value,
					[action.payload.countryID_field]: action.payload.countryID,
				},
				apiResponse: {
					...state.apiResponse,
					[action.payload.name]: null,
				},
			};
		case 'INPUT_L3':
			return {
				...state,
				level3: {
					...state.level3,
					[action.payload.name]: action.payload.value,
				},
				apiResponse: {
					...state.apiResponse,
					[action.payload.name]: null,
				},
			};
		case 'INPUT_L3_NUMBER':
			const data = parseInt(action.payload.value);

			if (isNaN(data)) {
			} else {
			}
			return {
				...state,
				level3: {
					...state.level3,
					[action.payload.name]: data,
				},
				apiResponse: {
					...state.apiResponse,
					[action.payload.name]: null,
				},
			};
		case 'INPUT_CARD':
			return {
				...state,
				cardsCreate: {
					...state.cardsCreate,
					init: {
						...state.cardsCreate.init,
						[action.payload.name]: action.payload.value,
					},
				},
			};
		case 'CARD_CREATE':
			return {
				...state,
				cardsCreate: {
					...state.cardsCreate,
					cards: [
						...state.cardsCreate.cards,
						{ ...state.cardsCreate.init, id: action.payload.id },
					],
					init: {
						id: 0,
						primary_text: '',
						media: '',
						heading: '',
						description: '',
						call_to_action: '',
						format: '',
					},
					// [action.payload.name]: action.payload.value,
				},
				apiResponse: {
					...state.apiResponse,
					ad_creative: null,
				},
			};
		case 'CARD_REMOVE':
			return {
				...state,
				cardsCreate: {
					...state.cardsCreate,
					cards: state.cardsCreate.cards.filter((e) => e.id !== action.payload),
				},
			};
		case 'DATE_CREATE':
			return {
				...state,
				level2: {
					...state.level2,
					[action.payload.name]: convertDate(action.payload.value),
					[action.payload.view]: action.payload.value,
				},
				apiResponse: {
					...state.apiResponse,
					[action.payload.name]: null,
				},
			};
		case 'FILE':
			let imgFile = [];
			let imgUrl = [];
			for (let i = 0; i < action.payload.value.length; i++) {
				imgFile.push({
					id: action.payload.id + i || 0 + i,
					url: action.payload.value[i] as i_img,
				});
				imgUrl.push({
					// id: state.level2[action.payload.name]?.length + i || 0 + i,
					id: action.payload.id + i || 0 + i,
					url: URL.createObjectURL(action.payload.value[i]) as unknown as i_img,
				});
			}
			return {
				...state,
				level2: {
					...state.level2,
					[action.payload.url]: [
						...state?.level2?.[action.payload.url],
						...imgUrl,
					],
					[action.payload.name]: [
						...state.level2[action.payload.name],
						...imgFile,
					],
					// [action.payload.url]: action.payload.value
					// 	? URL.createObjectURL(action.payload.value)
					// 	: '',
					// [action.payload.name]: [action.payload.value] || null,
				},
				apiResponse: {
					...state.apiResponse,
					[action.payload.name]: null,
				},
			};

		case 'DELETE_IMAGE':
			return {
				...state,
				level2: {
					...state.level2,
					[action.payload.url]: state.level2[action.payload.url].filter(
						(item) => item.id !== action.payload.id
					),
					[action.payload.name]: state.level2[action.payload.name].filter(
						(item) => item.id !== action.payload.id
					),
				},
			};

		case 'VALIDATION_RES':
			return {
				...state,
				apiResponse: action.payload.data,
				errorMessage: {
					...action.payload.error,

					// errorL2: true,
				},
			};

		case 'CLEAR_VALIDATION_ERROR':
			return {
				...state,
				errorMessage: {
					...action.payload,

					// errorL2: false,
				},
			};
		case 'CLEAR_VALIDATION_RES':
			const convertObjectValuesToNullImmutable = (obj: any) => {
				return Object.assign(
					{},
					obj,
					...Object.keys(obj).map((key) => ({ [key]: null }))
				);
			};

			return {
				...state,
				apiResponse: convertObjectValuesToNullImmutable(state.apiResponse),
			};

		case 'SELECT_PAYMENT_METHOD':
			return {
				...state,
				checkout: {
					paymethod: action.payload,
				},
			};
		default:
			return state;
	}
};

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
const data = {
	campaign_name: ['The campaign name field is required.'],
	conversion_location: ['The conversion location field is required.'],
	performance_goal: ['The performance goal field is required.'],
	budget: ['The budget field is required.'],
	budget_amount: ['The budget amount field is required.'],
	start_date: ['The start date field is required.'],
	end_date: ['The end date field is required.'],
	age: ['The age field is required.'],
	gender: ['The gender field is required.'],
	detail_targeting: ['The detail targeting field is required.'],
	country: ['The country field is required.'],
	city: ['The city field is required.'],
	location_files: ['The location files field is required.'],
	device: ['The device field is required.'],
	platform: ['The platform field is required.'],
	inventory: ['The inventory field is required.'],

	campaign_objective: ['The campaign objective field is required.'],
	platforms: ['The platforms field is required.'],
	ad_creative: ['The ad creative field is required.'],
	format: ['The format field is required.'],
	destination: ['The destination field is required.'],
	tracking: ['The tracking field is required.'],
	url_perimeter: ['The url perimeter field is required.'],
	number: ['The number field is required.'],
	last_description: ['The last description field is required.'],
	status: ['The status field is required.'],
	advertise_audience_files: ['The advertise audience files field is required.'],
	paymethod: ['The paymethod field is required.'],
};
