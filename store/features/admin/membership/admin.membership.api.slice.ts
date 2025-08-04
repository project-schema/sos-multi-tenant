import { iPagination } from '@/types';
import { apiSlice } from '../../api/apiSlice';
import { iMembershipType } from './admin.membership.type';

const api = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		// get all
		adminMembership: builder.query<
			iPagination<iMembershipType>,
			{
				page: number | string;
				status: 'affiliate' | 'vendor';
			}
		>({
			query: ({ page, status }) => {
				return {
					url: `/admin/membership-details/${status}?page=${page}`,
					method: 'GET',
				};
			},
			providesTags: ['AdminProductRequest'],
		}),
	}),
});

export const { useAdminMembershipQuery } = api;
