import { iPagination } from '@/types/pagination.type';
import { iVendorServicesPurchaseOrder } from '@/store/features/vendor/services-purchase/type';
import { apiSlice } from '../../api/apiSlice';
import { iService } from '../type';

const api = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		VendorServicesPurchase: builder.query<
			iPagination<iService>,
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
			providesTags: ['AdminServiceOrder'],
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

		// /tenant-service/order
		VendorServiceOrder: builder.mutation<
			{ errors: any; data: 'success'; message: string; status: number },
			any
		>({
			query: (data) => {
				return {
					url: `/tenant-service/order`,
					method: 'POST',
					body: data,
					formData: true,
				};
			},
			invalidatesTags: ['AdminServiceOrder'],
		}),

		// service order lists
		VendorServicesPurchaseOrder: builder.query<
			{ data: iPagination<iVendorServicesPurchaseOrder>; message: string },
			{
				page: number | string;
				search: string;
			}
		>({
			query: ({ page, search }) =>
				`/tenant-service/order?page=${page}&search=${search}`,

			providesTags: ['AdminServiceOrder'],
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
			query: () => '/tenant-service/buy-count',
			providesTags: ['AdminServiceOrder'],
		}),
	}),
});

export const {
	useVendorServicesPurchaseQuery,
	useServiceCategoryQuery,
	useVendorServiceOrderMutation,
	useVendorServicesPurchaseOrderQuery,
	useVendorServicesPurchaseCountQuery,
} = api;
