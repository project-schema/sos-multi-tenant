import { apiSlice } from '../../api/apiSlice';

const api = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		vendorRecharge: builder.mutation<
			{ status: 200; message: string; payment_url: string },
			{ amount: number | string; getwaya: 'aamarpay' }
		>({
			query: (data) => ({
				url: '/tenant-recharge',
				method: 'POST',
				body: data,
			}),
		}),
	}),
});

export const { useVendorRechargeMutation } = api;
