import { iPagination } from '@/types/pagination.type';
import { iServiceType } from '@/types/services.type';
import { apiSlice } from '../../api/apiSlice';
import { iVendorServicesPurchaseOrder } from './type';

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
			providesTags: ['AdminServiceOrder'],
		}),

		VendorServicesPurchaseSingle: builder.query<iServiceType, { id: string }>({
			query: ({ id }) => `/tenant-service/myorders/${id}`,
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

		/* status update 
			"service_order_id": 22,
    		"status": "cancel_request",
    		"reason": "Test"
		*/
		ServiceOrderStatusCancelReq: builder.mutation<
			{ message: string; status: number; data: 'success' },
			{
				service_order_id: number | string;
				reason?: string;
				status: 'cancel_request';
			}
		>({
			query: (body) => ({
				url: `/tenant-service/status`,
				method: 'POST',
				body,
			}),
			invalidatesTags: ['AdminServiceOrder'],
		}),
		ServiceOrderStatus: builder.mutation<
			{ message: string; status: number; data: 'success' },
			{
				service_order_id: number | string;
				reason?: string;
				status: string;
				order_delivery_id?: number | string;
			}
		>({
			query: (body) => ({
				url: `/tenant-service/status`,
				method: 'POST',
				body,
			}),
			invalidatesTags: ['AdminServiceOrder'],
		}),

		// rating store
		ServiceRating: builder.mutation<
			{ message: string; status: number; data: 'success' },
			{
				service_order_id: number | string;
				rating: number;
				comment: string;
				vendor_service_id: number | string;
			}
		>({
			query: ({ service_order_id, rating, comment, vendor_service_id }) => ({
				url: `/service-rating`,
				method: 'POST',
				body: {
					service_order_id,
					rating,
					comment,
					vendor_service_id,
				},
			}),
			invalidatesTags: ['AdminService'],
		}),
	}),
});

export const {
	useVendorServicesPurchaseQuery,
	useServiceCategoryQuery,
	useVendorServicesPurchaseSingleQuery,
	useVendorServicesPurchaseCountQuery,
	useVendorServicesPurchaseOrderQuery,
	useVendorServiceOrderMutation,
	useServiceOrderStatusCancelReqMutation,
	useServiceOrderStatusMutation,
	useServiceRatingMutation,
} = api;
