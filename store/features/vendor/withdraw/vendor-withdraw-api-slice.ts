import { apiSlice } from '../../api/apiSlice';
import { WithdrawFormValues } from './vendor-withdraw-modal';
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

		TenantWithdrawMoney: builder.mutation<
			{ status: 200; message: string },
			Partial<WithdrawFormValues>
		>({
			query: (data) => ({
				url: '/tenant-withdraw-money',
				method: 'POST',
				body: data,
			}),
			invalidatesTags: ['Withdraw'],
		}),
		// tenant-all-banks
		TenantAllBanks: builder.query<any, void>({
			query: () => ({ url: '/tenant-all-banks', method: 'GET' }),
		}),
	}),
});

export const {
	useVendorWithdrawAllQuery,
	useTenantWithdrawMoneyMutation,
	useTenantAllBanksQuery,
} = api;
