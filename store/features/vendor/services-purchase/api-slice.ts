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
				if (status === 'all') {
					status = '';
				}
				if (service_category_id === 'all') {
					service_category_id = '';
				}
				return {
					url: `/all-services?page=${page}&search=${search}&status=${status}&service_category_id=${service_category_id}`,
					method: 'GET',
				};
			},
		}),

		VendorServicesPurchaseSingle: builder.query<iServiceType, { id: string }>({
			query: ({ id }) => `/services-view/${id}`,
		}),

		// service-buy-count
		VendorServicesPurchaseCount: builder.query<
			{
				all: number;
				success: number;
				delivered: number;
				revision: number;
				pending: number;
				canceled: number;
				progress: number;
			},
			void
		>({
			query: () => '/service-buy-count',
		}),

		// service order lists
		VendorServicesPurchaseOrder: builder.query<
			iPagination<iServiceType>,
			{
				page: number | string;
				search: string;
			}
		>({
			query: ({ page, search }) =>
				`/service/orders?page=${page}&search=${search}`,
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

export const {
	useVendorServicesPurchaseQuery,
	useServiceCategoryQuery,
	useVendorServicesPurchaseSingleQuery,
	useVendorServicesPurchaseCountQuery,
	useVendorServicesPurchaseOrderQuery,
} = api;
