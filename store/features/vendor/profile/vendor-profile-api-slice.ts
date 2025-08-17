import { apiSlice } from '../../api/apiSlice';
import { iUser } from './vendor-profile-type';

const api = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		VendorProfileInfo: builder.query<{ status: 200; user: iUser }, undefined>({
			query: () => ({
				url: `/vendor/profile`,
				method: 'GET',
			}),
		}),

		VendorProfileUpdate: builder.mutation<{ status: 200; user: iUser }, any>({
			query: (data) => {
				const body = new FormData();
				Object.entries(data).forEach(([key, value]) => {
					if (value) {
						body.append(key, value as string);
					}
				});

				body.append('_method', 'PUT');

				return {
					url: `/vendor/update/profile`,
					method: 'POST',
					body,
					formData: true,
				};
			},
		}),
	}),
});

export const { useVendorProfileInfoQuery, useVendorProfileUpdateMutation } =
	api;
