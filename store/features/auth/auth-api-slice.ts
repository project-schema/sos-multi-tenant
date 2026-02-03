import { apiSlice } from '../api/apiSlice';
import {
	iAuthLoginResponse,
	iAuthRegister,
	iAuthRegisterResponse,
	iTenantRegisterResponse,
} from './auth-type';

const api = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		// register tenant and user
		TenantRegister: builder.mutation<iTenantRegisterResponse, any>({
			query: (data) => {
				const isUser = data.type === 'user';

				const userData = {
					role: 4,
					email: data.email,
					password: data.password,
					name: data.owner_name,
					number: data.number,
				};
				const regAPI = isUser ? '/register' : '/tenants/register';

				return {
					url: regAPI,
					method: 'POST',
					body: isUser ? userData : data,
					formData: true,
				};
			},
		}),

		// auth/register
		AuthRegister: builder.mutation<iAuthRegisterResponse, iAuthRegister>({
			query: (data) => ({
				url: `/auth/register`,
				method: 'POST',
				body: data,
			}),
		}),

		// auth/login
		AuthLogin: builder.mutation<iAuthLoginResponse, any>({
			query: (data) => ({
				url: `/auth/login`,
				method: 'POST',
				body: data,
			}),
		}),
		// auth/login
		AdminLogin: builder.mutation<iAuthLoginResponse, any>({
			query: (data) => ({
				url: `/login`,
				method: 'POST',
				body: data,
			}),
		}),
	}),
});

export const {
	useTenantRegisterMutation,
	useAuthRegisterMutation,
	useAuthLoginMutation,
	useAdminLoginMutation,
} = api;
