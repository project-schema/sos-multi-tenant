import { apiSlice } from '../../api/apiSlice';
import { iVendorWithdrawResponse } from './vendor-withdraw-type';

const api = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		// get all
		VendorWithdrawAll: builder.query<
			iVendorWithdrawResponse,
			{ page: number | string; status: string }
		>({
			query: ({ page, status = '' }) => {
				let url = ``;
				if (status === 'all') {
					url = `/tenant-withdraw-history?page=${page}`;
				} else {
					if (status === 'success' || status === 'pending') {
						url = `/tenant-withdraw-history/${status}?page=${page}`;
					} else {
						url = `/tenant-withdraw-history?page=${page}`;
					}
				}
				return {
					url: url,
					method: 'GET',
				};
			},
			providesTags: ['Withdraw'],
		}),
	}),
});

export const { useVendorWithdrawAllQuery } = api;
