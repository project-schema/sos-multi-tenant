import { apiSlice } from '../../api/apiSlice';
import { iAdminManager } from './admin.manager.type';

const api = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		//  get manager
		getAdminManger: builder.query<iAdminManager[], undefined>({
			query: () => ({
				url: `/admin/all-manager-list`,
				method: 'GET',
			}),
		}),
	}),
});

export const { useGetAdminMangerQuery } = api;
