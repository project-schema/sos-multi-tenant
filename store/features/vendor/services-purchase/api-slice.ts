import { iPagination } from '@/types/pagination.type';
import { iServiceType } from '@/types/services.type';
import { apiSlice } from '../../api/apiSlice';

const api = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		VendorServicesPurchase: builder.query<
			iPagination<iServiceType>,
			{
				page: number | string;
				search: string;
				status: string;
				service_category_id: string;
			}
		>({
			query: ({ page, search, status, service_category_id }) => {
				return {
					url: `/all-services?page=${page}&search=${search}&status=${status}&service_category_id=${service_category_id}`,
					method: 'GET',
				};
			},
		}),

		// /service-category
		ServiceCategory: builder.query<
			{
				status: number;
				data: 'success';
				message: { id: number; name: string; slug: string; status: string }[];
			},
			void
		>({
			query: () => '/service-category',
		}),
	}),
});

export const { useVendorServicesPurchaseQuery, useServiceCategoryQuery } = api;
