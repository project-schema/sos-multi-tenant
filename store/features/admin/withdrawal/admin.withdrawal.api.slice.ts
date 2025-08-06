import { apiSlice } from '../../api/apiSlice';
import { iAdminWithdrawalResponse } from './admin.withdrawal.type';

const api = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		// get all
		/*
			page=""
			search =""
			from = 06-08-2025
			to = 06-08-2025
			status = all success pending  
			type = all vendor  affiliator user
		*/
		adminWithdrawal: builder.query<
			iAdminWithdrawalResponse,
			{
				page: number | string;
				search: string;
				from: string;
				to: string;
				status: 'all' | 'success' | 'pending';
				type: 'all' | 'vendor' | 'affiliator' | 'user';
			}
		>({
			query: ({
				page = '',
				search = '',
				from = '',
				to = '',
				status = 'all',
				type = 'all',
			}) => {
				return {
					url: `/admin/all-withdraw?page=${page}&search=${search}&from=${from}&to=${to}&status=${status}&type=${type}`,
					method: 'GET',
				};
			},
			providesTags: ['AdminWithdrawal'],
		}),

		// new withdraw
		adminNewWithdrawal: builder.mutation<{ status: 200; message: string }, any>(
			{
				query: (data) => {
					const body = new FormData();
					Object.entries(data).forEach(([key, value]) => {
						body.append(key, value as string);
					});
					return {
						url: `/admin/withdraw-paid/${data.id}`,
						method: 'POST',
						body,
						formData: true,
					};
				},
				invalidatesTags: ['AdminWithdrawal'],
			}
		),
		//  withdrawal cancel
		adminWithdrawalCancel: builder.mutation<
			{ status: 200; message: string; data: 'success' },
			any
		>({
			query: (data) => {
				const body = new FormData();
				body.append('reason', data.reason);
				body.append('status', 'rejected');
				return {
					url: `/admin/withdraw-cancel/${data.id}`,
					method: 'POST',
					body,
					formData: true,
				};
			},
			invalidatesTags: ['AdminWithdrawal'],
		}),
	}),
});

export const {
	useAdminWithdrawalQuery,
	useAdminNewWithdrawalMutation,
	useAdminWithdrawalCancelMutation,
} = api;
