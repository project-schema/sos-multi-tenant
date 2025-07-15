export type AppAction =
	| { type: 'INPUT_L1'; payload: any }
	| { type: 'INPUT_L2'; payload: any }
	| { type: 'INPUT_L3'; payload: any }
	| { type: 'INPUT_L3_NUMBER'; payload: any }
	| { type: 'INPUT_CARD'; payload: any }
	| {
			type: 'FILE';
			payload: {
				name: i_file;
				value: any;
				url: i_file;
				id: number;
			};
	  }
	| { type: 'CARD_CREATE'; payload: any }
	| { type: 'CARD_REMOVE'; payload: any }
	| { type: 'SELECT_COUNTRY'; payload: any }
	| { type: 'VALIDATION_RES'; payload: any }
	| { type: 'CLEAR_VALIDATION_RES'; payload: any }
	| { type: 'CLEAR_VALIDATION_ERROR'; payload: any }
	| { type: 'SELECT_PAYMENT_METHOD'; payload: any }
	| { type: 'INPUT_L2_PLACEMENT'; payload: any }
	| { type: 'DATE_CREATE'; payload: any }
	| {
			type: 'DELETE_IMAGE';
			payload: {
				id: number;
				url: i_file;
				name: i_file;
			};
	  };

export type Card = {
	id: number;
	primary_text: string;
	format: string;
	media: string;
	heading: string;
	description: string;
	call_to_action: string;
};
export type i_file =
	| 'location_files_url'
	| 'location_files'
	| 'advertise_audience_files'
	| 'advertise_audience_files_url';

export type i_img = {
	id: number;
	url: any;
};

export type OnlyInputType =
	| 'INPUT_L1'
	| 'INPUT_L2'
	| 'INPUT_L3'
	| 'INPUT_L3_NUMBER'
	| 'INPUT_CARD';

export type i_input = {
	name: string;
	value: string;
};
export interface AppState {
	level1: {
		campaign_objective: string;
		complete: boolean;
		selected: string;
	};
	level2: {
		campaign_name: string;
		conversion_location: string;
		performance_goal: string;
		budget: string;
		budget_amount: string;
		start_date: Date | null;
		start_date_view: Date | null;
		end_date: Date | null;
		end_date_view: Date | null;
		audience: string;
		age: string;
		ageto: string;
		gender: string;
		apps_and_sites: string;
		detail_targeting: string;
		advertise_audience_files: i_img[];
		advertise_audience_files_url: i_img[];
		country: string;
		countryID: string | number;
		stateid: string | number;
		city: string;
		location_files: i_img[];
		location_files_url: i_img[];
		device: string;
		platform: string;
		placements: string;
		inventory: string;
		feeds: string;
		story_reels: string;
		adds_video_and_reels: string;
		search_result: string;
		messages: string;
	};
	level3: {
		destination: string;
		tracking: string;
		format: string;
		postid: string;
		url_perimeter: string;
		number: string;
		last_description: string;
		status: string;
	};
	cardsCreate: {
		init: {
			format: string;
			id: number;
			primary_text: string;
			media: string;
			heading: string;
			description: string;
			call_to_action: string;
		};
		cards: Card[];
	};
	apiResponse: {
		campaign_objective: null;
		campaign_name: null;
		conversion_location: null;
		performance_goal: null;
		platforms: null;
		ad_creative: null;
		budget: null;
		budget_amount: null;
		start_date: null;
		end_date: null;
		age: null;
		ageto: null;
		gender: null;
		detail_targeting: null;
		country: null;
		city: null;
		device: null;
		platform: null;
		inventory: null;
		format: null;
		destination: null;
		tracking: null;
		url_perimeter: null;
		number: null;
		last_description: null;
		status: null;
		advertise_audience_files: null;
		location_files: null;
		paymethod: null;
		placements: null;
	};
	errorMessage: {
		errorL2: boolean;
		errorL3: boolean;
		errorL4: boolean;
	};
	checkout: {
		paymethod: 'aamarpay' | 'my-wallet';
	};
}

export type AppDispatch = React.Dispatch<AppAction>;
