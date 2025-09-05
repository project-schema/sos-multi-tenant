import { apiSlice } from '../../api/apiSlice';
import {
	iTopRepeatCustomerReportResponse,
	iVendorByProductIdResponse,
	iVendorDailySalesResponse,
	iVendorDueSalesReportResponse,
	iVendorPurchaseReportResponse,
	iVendorSalesReportResponse,
	iVendorStockReportResponse,
	iVendorStockShortageReportResponse,
	iVendorWarehouseReportResponse,
} from './vendor-report-type';

const api = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		VendorStockReport: builder.query<
			iVendorStockReportResponse,
			{
				start_date: string;
				end_date: string;
				page: number | string;
			}
		>({
			query: ({ start_date, end_date, page }) => ({
				url: `/tenant-report/stock?start_date=${start_date}&end_date=${end_date}&page=${page}`,
				method: 'GET',
			}),
		}),
		VendorSalesReport: builder.query<
			iVendorSalesReportResponse,
			{
				start_date: string;
				end_date: string;
				page: number | string;
			}
		>({
			query: ({ start_date, end_date, page }) => ({
				url: `/tenant-report/sales?start_date=${start_date}&end_date=${end_date}&page=${page}`,
				method: 'GET',
			}),
		}),
		VendorDueSalesReport: builder.query<
			iVendorDueSalesReportResponse,
			{
				start_date: string;
				end_date: string;
				page: number | string;
			}
		>({
			query: ({ start_date, end_date, page }) => ({
				url: `/tenant-report/due-sales?start_date=${start_date}&end_date=${end_date}&page=${page}`,
				method: 'GET',
			}),
		}),
		VendorPurchaseReport: builder.query<
			iVendorPurchaseReportResponse,
			{
				start_date: string;
				end_date: string;
				page: number | string;
			}
		>({
			query: ({ start_date, end_date, page }) => ({
				url: `/tenant-report/purchase?start_date=${start_date}&end_date=${end_date}&page=${page}`,
				method: 'GET',
			}),
		}),
		VendorWarehouseReport: builder.query<
			iVendorWarehouseReportResponse,
			{
				start_date: string;
				end_date: string;
				page: number | string;
			}
		>({
			query: ({ start_date, end_date, page }) => ({
				url: `/tenant-report/warehouse?start_date=${start_date}&end_date=${end_date}&page=${page}`,
				method: 'GET',
			}),
		}),
		VendorStockShortageReport: builder.query<
			iVendorStockShortageReportResponse,
			{
				start_date: string;
				end_date: string;
				page: number | string;
			}
		>({
			query: ({ start_date, end_date, page }) => ({
				url: `/tenant-report/stock-shortage?start_date=${start_date}&end_date=${end_date}&page=${page}`,
				method: 'GET',
			}),
		}),
		topRepeatCustomer: builder.query<
			iTopRepeatCustomerReportResponse,
			{
				page: number | string;
			}
		>({
			query: ({ page }) => ({
				url: `/tenant-report/top-repeat-customer?page=${page}`,
				method: 'GET',
			}),
		}),

		VendorSalesReportVariant: builder.query<any, void>({
			query: () => '/tenant-report/sales-report-variant',
		}),
		getProductIdsFromSalesDetails: builder.query<
			iVendorByProductIdResponse,
			void
		>({
			query: () => '/tenant-report/sales-report-product-id',
		}),
		VendorSalesReportDailyProductWise: builder.query<
			iVendorDailySalesResponse,
			{
				start_date: string;
				end_date: string;
				product_id: string;
				page: number | string;
				status: string;
			}
		>({
			query: ({ start_date, end_date, product_id, page, status }) => ({
				url: `/tenant-report/sales-report-daily-product-wise?start_date=${start_date}&end_date=${end_date}&product_id=${product_id}&page=${page}&status=${status}`,
				method: 'GET',
			}),
		}),
	}),
});

export const {
	useVendorStockReportQuery,
	useVendorStockShortageReportQuery,
	useVendorSalesReportQuery,
	useVendorDueSalesReportQuery,
	useVendorPurchaseReportQuery,
	useVendorWarehouseReportQuery,
	useTopRepeatCustomerQuery,
	useVendorSalesReportVariantQuery,
	useGetProductIdsFromSalesDetailsQuery,
	useVendorSalesReportDailyProductWiseQuery,
} = api;
