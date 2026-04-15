import { apiSlice } from '../../../api/apiSlice';
import { iSystemResponse } from './type';

const api = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		// get all
		System: builder.query<iSystemResponse, void>({
			query: () => ({
				url: `/tenant/cms`,
				method: 'GET',
			}),
		}),

		// update
		UpdateSystem: builder.mutation<{ status: 200; message: string }, any>({
			query: (data) => {
				const body = new FormData();
				Object.entries(data).forEach(([key, value]) => {
					if (value) {
						body.append(key, value as string);
					}
				});

				return {
					url: `/tenant/cms`,
					method: 'POST',
					body,
					formData: true,
				};
			},
		}),

		// Update dummy data
		UpdateDummyData: builder.mutation<
			{ success: boolean; message: string },
			{ theme: 'one' | 'two' | 'three' | 'four' }
		>({
			query: (data) => {
				return {
					url: `/import/theme-${data.theme}`,
					method: 'GET',
				};
			},
		}),
	}),
});

export const {
	useSystemQuery,
	useUpdateSystemMutation,
	useUpdateDummyDataMutation,
} = api;
