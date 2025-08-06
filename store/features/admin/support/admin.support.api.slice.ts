import { apiSlice } from '../../api/apiSlice';
import { iAdminSupportResponse } from './admin.support.type';

const api = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		// get all
		/*
			page=""
			search =""
			start_date = 07-08-2025
			end_date = 14-08-2025
			status = pending  close answer
			category = 4
		*/
		adminSupport: builder.query<
			iAdminSupportResponse,
			{
				page: number | string;
				search: string;
				start_date: string;
				end_date: string;
				category: string;
				status: 'answer' | 'close' | 'pending' | 'all';
			}
		>({
			query: ({
				page = '',
				search = '',
				category = '',
				status = 'all',
				start_date = '',
				end_date = '',
			}) => {
				if (status === 'all' || !status) {
					status = '' as any;
				}
				const query = `?page=${page}${search ? `&search=${search}` : ''}${
					start_date ? `&start_date=${start_date}` : ''
				}${end_date ? `&end_date=${end_date}` : ''}${
					status ? `&status=${status}` : ''
				}${category ? `&category=${category}` : ''}`;
				return {
					url: `/admin/supportbox${query}`,
					method: 'GET',
				};
			},
			providesTags: ['AdminSupport'],
		}),

		// new withdraw
		adminNewSupport: builder.mutation<{ status: 200; message: string }, any>({
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
			invalidatesTags: ['AdminSupport'],
		}),

		// new withdraw
		adminSupportCancel: builder.mutation<{ status: 200; message: string }, any>(
			{
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
				invalidatesTags: ['AdminSupport'],
			}
		),

		// delete
		adminSupportDelete: builder.mutation<{ status: 200; message: string }, any>(
			{
				query: (data) => ({
					url: `/admin/supportbox/${data.id}`,
					method: 'DELETE',
				}),
				invalidatesTags: ['AdminSupport'],
			}
		),
		// close
		adminSupportClose: builder.mutation<{ status: 200; message: string }, any>({
			query: (data) => ({
				url: `/admin/close-support-box/${data.id}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['AdminSupport'],
		}),

		//support assign
		adminSupportAssign: builder.mutation<
			{ success: boolean; message: string },
			{ user_id: string | number; support_box_id: string | number }
		>({
			query: (data) => ({
				url: `/admin/assign-ticket`,
				method: 'POST',
				body: data,
			}),
		}),
	}),
});

export const {
	useAdminSupportQuery,
	useAdminNewSupportMutation,
	useAdminSupportDeleteMutation,
	useAdminSupportCloseMutation,
	useAdminSupportAssignMutation,
	useAdminSupportCancelMutation,
} = api;
