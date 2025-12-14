import { iPagination } from '@/types';
import { apiSlice } from '../../api/apiSlice';
import { iNote, iUser, iVendorProfile } from './vendor-profile-type';

const api = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		VendorProfileInfo: builder.query<
			{ status: 200; user: iVendorProfile },
			undefined
		>({
			query: () => ({
				url: `/tenant-profile`,
				method: 'GET',
			}),
		}),

		// note
		VendorProfileNote: builder.query<
			{ status: 200; notes: iPagination<iNote> },
			{ page: number }
		>({
			query: ({ page }) => ({
				url: `/my-note`,
				method: 'GET',
				params: { page },
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

				body.append('_method', 'POST');

				return {
					url: `/tenant-profile/update`,
					method: 'POST',
					body,
					formData: true,
				};
			},
		}),

		// shop update
		VendorProfileShopUpdate: builder.mutation<
			{ status: 200; user: iUser },
			any
		>({
			query: (data: any) => {
				const body = new FormData();
				Object.entries(data).forEach(([key, value]) => {
					if (value) {
						body.append(key, value as string);
					}
				});

				return {
					url: `/info-settings/update`,
					method: 'POST',
					body,
					formData: true,
				};
			},
		}),
	}),
});

export const {
	useVendorProfileInfoQuery,
	useVendorProfileUpdateMutation,
	useVendorProfileNoteQuery,
	useVendorProfileShopUpdateMutation,
} = api;
