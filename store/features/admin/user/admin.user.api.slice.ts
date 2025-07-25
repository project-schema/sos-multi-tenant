import { apiSlice } from '../../api/apiSlice';
import {
	AdminUserStatisticType,
	iAllUserResponse,
	statusType,
	userType,
} from './type';
import { EditProfileFormData } from './user.edit.profile';

const api = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		adminUserStatistics: builder.query<AdminUserStatisticType, any>({
			query: () => ({
				url: '/admin/user-statistics',
				method: 'GET',
			}),
			providesTags: ['AdminUserStatistics'],
		}),

		adminAllUser: builder.query<
			iAllUserResponse,
			{
				status?: statusType;
				userType?: userType;
				page?: number;
				search?: string;
			}
		>({
			query: (params) => ({
				url: `/all/user/${params.status}?type=${params.userType}&page=${params.page}&email=${params.search}`,
				method: 'GET',
				params,
			}),
			providesTags: ['AdminAllUser'],
		}),

		// user update profile
		adminUpdateUserProfile: builder.mutation<
			{ status: 200; message: string },
			Partial<EditProfileFormData> & {
				role_as: string | number;
				id: string | number;
			}
		>({
			query: (data) => {
				console.log(data);
				const body = new FormData();
				Object.entries(data).forEach(([key, value]) => {
					if (value) {
						body.append(key, value as string);
					}
				});

				/*
					update-vendor
					update-user
					update-affiliator
				*/
				const url = () => {
					if (typeof data.role_as === 'string') {
						data.role_as = Number(data.role_as);
						switch (data.role_as) {
							case 2:
								return 'vendor/';
							case 3:
								return 'affiliator/';
							default:
								return 'user/';
						}
					}
				};

				return {
					url: `/update-${url()}${data.id}`,
					method: 'POST',
					body,
					formData: true,
				};
			},
			invalidatesTags: ['AdminAllUser', 'AdminUserStatistics'],
		}),

		// usr edit balance
		/*
		admin/add-user-balance
		admin/edit-user-balance
		admin/remove-user-balance
		*/
		adminEditUserBalance: builder.mutation<
			{ status: 200; message: string },
			{ id: string | number; amount: string; type: 'add' | 'edit' | 'remove' }
		>({
			query: (data) => {
				return {
					url: `/admin/${data.type}-user-balance/${data.id}`,
					method: 'POST',
					body: { amount: data.amount },
				};
			},
			invalidatesTags: ['AdminAllUser'],
		}),
	}),
});

export const {
	useAdminUserStatisticsQuery,
	useAdminAllUserQuery,
	useAdminUpdateUserProfileMutation,
	useAdminEditUserBalanceMutation,
} = api;
