import { iPagination } from '@/types';
import { apiSlice } from '../../api/apiSlice';
import {
	iNote,
	iUser,
	iVendorProfile,
	iVendorShopInfo,
} from './vendor-profile-type';

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

		// shop-info
		VendorShopInfo: builder.query<
			{ status: 200; shop_info: iVendorShopInfo },
			undefined
		>({
			query: () => ({
				url: `/shop-info`,
				method: 'GET',
			}),
			providesTags: ['VendorShopInfo'],
		}),

		// shop-info-update
		VendorShopInfoUpdate: builder.mutation<
			{ status: 200; user: iVendorShopInfo },
			any
		>({
			query: (data) => {
				const body = new FormData();
				Object.entries(data).forEach(([key, value]) => {
					if (value) {
						body.append(key, value as string);
					}
				});
				return {
					url: `/shop-info-update`,
					method: 'POST',
					body,
					formData: true,
				};
			},
			invalidatesTags: ['VendorShopInfo'],
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
	useVendorShopInfoQuery,
	useVendorShopInfoUpdateMutation,
} = api;
