import { iPagination } from '@/types';
import { apiSlice } from '../../api/apiSlice';
import { iVendorRechargeHistory } from './type';

const api = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		vendorRecharge: builder.mutation<
			{ status: 200; message: string; payment_url: string },
			{ amount: number | string; getwaya: 'aamarpay' }
		>({
			query: (data) => ({
				url: '/recharge',
				method: 'POST',
				body: data,
			}),
		}),
		vendorRechargeHistory: builder.query<
			iPagination<iVendorRechargeHistory>,
			{ page: number | string }
		>({
			query: ({ page }) => ({
				url: `/transition-history?page=${page}`,
				method: 'GET',
			}),
		}),
	}),
});

export const { useVendorRechargeMutation, useVendorRechargeHistoryQuery } = api;
