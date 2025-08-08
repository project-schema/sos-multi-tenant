import { apiSlice } from '../../api/apiSlice';

const api = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		// get all
		adminGetDollarPrice: builder.query<
			{
				data: 'success';
				status: 200;
				message: {
					amount: number;
					id: number;
				};
			},
			undefined
		>({
			query: () => ({
				url: `/admin/doller-price`,
				method: 'GET',
			}),
		}),

		// update
		adminUpdateDollarPrice: builder.mutation<
			{ status: 200; message: string },
			{ amount: number | string }
		>({
			query: (data) => {
				const body = new FormData();
				Object.entries(data).forEach(([key, value]) => {
					if (value) {
						body.append(key, value as string);
					}
				});

				return {
					url: `/admin/doller-price-store`,
					method: 'POST',
					body,
					formData: true,
				};
			},
		}),
	}),
});

export const {
	useAdminGetDollarPriceQuery,
	useAdminUpdateDollarPriceMutation,
} = api;
