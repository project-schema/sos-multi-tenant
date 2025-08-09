import {
	iCampaignCategory,
	iConversionLocation,
	iPerformanceGoal,
} from '../../admin/advertise-utilities';
import { apiSlice } from '../../api/apiSlice';
const dat = {
	id: 1,
	code: 'AF',
	name: 'Afghanistan',
	phonecode: 93,
	deleted_at: null,
	created_at: null,
	updated_at: null,
};
const api = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		// get front-campaign-category
		frontendCampaignCategory: builder.query<
			{ data: 'success'; status: 200; message: iCampaignCategory[] },
			undefined
		>({
			query: () => ({
				url: `/front-campaign-category`,
				method: 'GET',
			}),
		}),

		// get country
		frontendCountry: builder.query<
			{
				id: number;
				code: string;
				name: string;
				phonecode: number;
				deleted_at: null;
				created_at: null;
				updated_at: null;
			}[],
			undefined
		>({
			query: () => ({
				url: `/countries`,
				method: 'GET',
			}),
		}),

		// get city by country id
		frontendCity: builder.query<
			{
				id: number;
				code: string;
				name: string;
				phonecode: number;
				deleted_at: null;
				created_at: null;
				updated_at: null;
			}[],
			{ id: number | string }
		>({
			query: ({ id }) => ({
				url: `/cities/${id}`,
				method: 'GET',
			}),
		}),

		// get /front-dynamic-data/
		frontendAdvDyData: builder.query<
			{ data: 'success'; status: 200; message: any },
			{
				api:
					| 'audience_age'
					| 'audience_age_to'
					| 'device'
					| 'platform'
					| 'feed'
					| 'store_reel'
					| 'video_reel'
					| 'search_reel'
					| 'messages_reel'
					| 'apps_web'
					| 'call_to_action';
			}
		>({
			query: ({ api }) => ({
				url: `/front-dynamic-data/${api}`,
				method: 'GET',
			}),
		}),

		// get front-campaign-converstion-location/id
		frontendCampaignConversionLocation: builder.query<
			{ data: 'success'; status: 200; message: iConversionLocation[] },
			{ id: number }
		>({
			query: ({ id }) => ({
				url: `/front-campaign-converstion-location/${id}`,
				method: 'GET',
			}),
		}),

		// get front-campaign-performance-goal/id
		frontendCampaignPerformanceGoal: builder.query<
			{ data: 'success'; status: 200; message: iPerformanceGoal[] },
			{ id: number }
		>({
			query: ({ id }) => ({
				url: `/front-campaign-performance-goal/${id}`,
				method: 'GET',
			}),
		}),

		// create-advertise
		frontendCreateAdvertise: builder.mutation<
			{ errors: any; data: 'success'; message: string; status: number },
			any
		>({
			query: (data) => {
				const body = new FormData();
				Object.entries(data).forEach(([key, value]) => {
					body.append(key, value as string);
				});
				return {
					url: `/create-advertise`,
					method: 'POST',
					body,
				};
			},
		}),
	}),
});

export const {
	useFrontendCreateAdvertiseMutation,
	useFrontendCampaignCategoryQuery,
	useFrontendCampaignConversionLocationQuery,
	useFrontendCampaignPerformanceGoalQuery,
	useFrontendAdvDyDataQuery,
	useFrontendCountryQuery,
	useFrontendCityQuery,
} = api;
