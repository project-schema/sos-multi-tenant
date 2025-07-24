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
				url: '/profile-data',
				method: 'GET',
			}),
			providesTags: ['UserProfile'],
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
					url: '/user/update/profile',
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
				url: '/recharge',
				method: 'POST',
				body: data,
			}),
			invalidatesTags: ['UserProfile'],
		}),

		allBanks: builder.query<iBankResponse, undefined>({
			query: () => ({
				url: '/all/banks',
				method: 'GET',
			}),
		}),
		// user withdraw
		userWithdraw: builder.mutation<
			{ status: 200; message: string },
			Partial<WithdrawFormValues>
		>({
			query: (data) => ({
				url: '/withdraw-money',
				method: 'POST',
				body: data,
			}),
		}),
	}),
});

export const {
	useProfileDataQuery,
	useUserUpdateProfileMutation,
	useUserRechargeMutation,
	useAllBanksQuery,
	useUserWithdrawMutation,
} = api;
