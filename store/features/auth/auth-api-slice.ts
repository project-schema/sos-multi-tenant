import { apiSlice } from '../api/apiSlice';
import {
	iAuthRegister,
	iTenantRegister,
	iTenantRegisterResponse,
} from './auth-type';

const api = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		// register tenant
		tenantRegister: builder.mutation<iTenantRegisterResponse, iTenantRegister>({
			query: (data) => {
				const body = new FormData();
				Object.entries(data).forEach(([key, value]) => {
					if (value) {
						body.append(key, value as string);
					}
				});

				return {
					url: `/tenants/register`,
					method: 'POST',
					body,
					formData: true,
				};
			},
		}),

		// auth/register
		authRegister: builder.mutation<iAuthRegisterResponse, iAuthRegister>({
			query: (data) => ({
				url: `/auth/register`,
				method: 'POST',
				body: data,
			}),
		}),
	}),
});

export const { useTenantRegisterMutation, useAuthRegisterMutation } = api;
