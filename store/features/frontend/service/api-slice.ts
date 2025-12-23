import { apiSlice } from '../../api/apiSlice';

const api = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		// create-advertise
		FrontendServiceOrder: builder.mutation<
			{ errors: any; data: 'success'; message: string; status: number },
			any
		>({
			query: (data) => {
				return {
					url: `/service/order`,
					method: 'POST',
					body: data,
					formData: true,
				};
			},
		}),
	}),
});

export const { useFrontendServiceOrderMutation } = api;
