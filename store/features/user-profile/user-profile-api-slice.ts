import { apiSlice } from '../api/apiSlice';
import { PasswordFormValues } from './user-password';
import { iBankResponse, iUserProfile } from './user-profile.type';
import { WithdrawFormValues } from './user-withdraw-modal';
type updateType = PasswordFormValues & Partial<iUserProfile>;
const api = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		// profile
		profileData: builder.query<{ status: 200; user: iUserProfile }, undefined>({
			query: () => ({
				url: '/user/profile-data',
				method: 'GET',
			}),
			providesTags: ['UserProfile'],
		}),

		// user history
		UserTransitionHistory: builder.query<any, { page: number | string }>({
			query: ({ page }) => ({
				url: `/user/transition-history?page=${page}`,
				method: 'GET',
			}),
		}),

		// user update profile
		userUpdateProfile: builder.mutation<
			{ status: 200; message: string },
			Partial<updateType>
		>({
			query: (data) => {
				const body = new FormData();
				Object.entries(data).forEach(([key, value]) => {
					if (value) {
						body.append(key, value as string);
					}
				});

				return {
					url: '/profile-data-update',
					method: 'POST',
					body,
					formData: true,
				};
			},
			invalidatesTags: ['UserProfile'],
		}),

		// user recharge
		userRecharge: builder.mutation<
			{ result: 'true'; payment_url: string },
			{ amount: number | string; getwaya: 'aamarpay' }
		>({
			query: (data) => ({
				url: '/user/recharge',
				method: 'POST',
				body: data,
			}),
			invalidatesTags: ['UserProfile'],
		}),

		allBanks: builder.query<iBankResponse, undefined>({
			query: () => ({
				url: '/user/all/banks',
				method: 'GET',
			}),
		}),

		// all-withdraw/history
		allWithdrawHistory: builder.query<
			any,
			{ status: string; page: number | string }
		>({
			query: ({ status, page }) => ({
				url: `/user/all-withdraw/history?status=${status}&page=${page}`,
				method: 'GET',
			}),
			providesTags: ['Withdraw'],
		}),

		// user withdraw
		userWithdraw: builder.mutation<
			{ status: 200; message: string },
			Partial<WithdrawFormValues>
		>({
			query: (data) => ({
				url: '/user/withdraw-money',
				method: 'POST',
				body: data,
			}),
			invalidatesTags: ['Withdraw'],
		}),
	}),
});

export const {
	useProfileDataQuery,
	useUserUpdateProfileMutation,
	useUserRechargeMutation,
	useAllBanksQuery,
	useUserWithdrawMutation,
	useAllWithdrawHistoryQuery,
	useUserTransitionHistoryQuery,
} = api;
