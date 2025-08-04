import { apiSlice } from '../../api/apiSlice';
import { iAdminBankResponse } from './admin.bank.type';

const api = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		//  get all
		adminAdminBank: builder.query<iAdminBankResponse, undefined>({
			query: () => {
				return {
					url: `/admin/bank/all`,
					method: 'GET',
				};
			},
		}),
	}),
});

export const { useAdminAdminBankQuery } = api;
