import {
	updateLevel1,
	updateLevel2,
	updateLevel3,
} from './advertiser-form-slice';

// Dummy data
const dummyData = {
	step: 1,
	level1: {
		id: 26,
		name: 'Awareness',
		icon: 'FaRocketchat',
		deleted_at: null,
		created_at: '2023-11-16T13:11:04.000000Z',
		updated_at: '2023-11-16T13:11:04.000000Z',
	},
	level2: {
		campaign_name: 'Rfc',
		age: '21',
		ageto: '66',
		country: 'American Samoa',
		city: [
			{ label: 'Alao', value: 'Alao' },
			{ label: 'Amouli', value: 'Amouli' },
		],
		platform: [
			{ label: 'Facebook', value: 'Facebook' },
			{ label: 'Instagram', value: 'Instagram' },
		],
		feeds: [
			{
				label: 'Facebook Business Explore',
				value: 'Facebook Business Explore',
			},
			{
				label: 'Instagram Explore home',
				value: 'Instagram Explore home',
			},
		],
		story_reels: [
			{ label: 'Reel', value: 'Reel' },
			{ label: 'Store Reel 2', value: 'Store Reel 2' },
		],
		adds_video_and_reels: [
			{ label: 'Video Reel 3', value: 'Video Reel 3' },
			{ label: 'Video Reel 2', value: 'Video Reel 2' },
		],
		search_result: [
			{ label: 'Search Reel 3', value: 'Search Reel 3' },
			{ label: 'Search Reel 1', value: 'Search Reel 1' },
		],
		messages: [
			{ label: 'admin', value: 'admin' },
			{ label: 'Messages Reel 2', value: 'Messages Reel 2' },
		],
		apps_and_sites: [
			{ label: 'Apps Web 3', value: 'Apps Web 3' },
			{ label: 'Apps Web', value: 'Apps Web' },
		],
		device: [
			{ label: 'Pc / Laptop', value: 'Pc / Laptop' },
			{ label: 'Android', value: 'Android' },
		],
		conversion_location: 'Facebook Page',
		performance_goal: 'Maximise reach of ads',
		budget: 'Daily Budget',
		budget_amount: 5,
		start_date: new Date('2026-05-01'),
		end_date: new Date('2026-05-05'),
		gender: 'All',
		inventory: 'Expanded Inventory',
		detail_targeting: 'Details Trageting',
		location_files: [],
		advertise_audience_files: [],
	},
	level3: {
		format: 'New Add',
		destination: 'Destination Text',
		tracking: 'Tracking Text',
		url_perimeter: 'http://me5.localhost:3090/dashboard/advertise/create',
		number: '21432314234',
		last_description: 'Description Text',
		cards: [
			{
				format: 'Carousel',
				primary_text: '2323',
				media: '23232',
				heading: '2323',
				description: '2323',
				call_to_action: 'Book now',
			},
		],
	},
	paymethod: '',
};

export const fillAdvertiseDummyData = (dispatch: any) => () => {
	dispatch(updateLevel1(dummyData.level1));
	dispatch(updateLevel2(dummyData.level2));
	dispatch(updateLevel3(dummyData.level3));
};
