import { IAuthInfo, IParent, LoginResponseType, ResponseType } from '@/types';
import { apiSlice } from '../../api/apiSlice';
import { OtpVerifyParentResponse, SignUpParentResponse } from './_type';
import { TypedUseQueryStateOptions } from '@reduxjs/toolkit/query/react';

const api = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		signUpParent: builder.mutation<SignUpParentResponse, any>({
			query: (data) => ({
				url: 'parent-registration',
				method: 'POST',
				body: data,
			}),
		}),

		login: builder.mutation<
			ResponseType<LoginResponseType>,
			{ email: string; password: string }
		>({
			query: (data) => ({
				url: 'auth/login',
				method: 'POST',
				body: data,
			}),
		}),

		authInfo: builder.query<ResponseType<IAuthInfo>, any>({
			query: () => ({
				url: 'auth/info',
			}),
		}),
	}),
});

export const { useLoginMutation, useAuthInfoQuery } = api;
