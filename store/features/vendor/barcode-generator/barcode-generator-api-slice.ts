import { apiSlice } from '../../api/apiSlice';
import { iBarcodeManageResponse, iBarcodeResponse } from './type';

const api = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		// generate barcode
		VendorBarcodeGenerate: builder.mutation<
			iBarcodeResponse,
			{ bar_qty: number[]; variant_id: number[] }
		>({
			query: (data) => {
				return {
					url: `/tenant-barcode/generate`,
					method: 'POST',
					body: data,
				};
			},
			invalidatesTags: ['VendorBarcodeGenerator'],
		}),

		// regenerate barcode
		VendorBarcodeRegenerate: builder.query<
			iBarcodeResponse,
			{ bar_qty: number[]; variant_id: number[] }
		>({
			query: (data) => {
				return {
					url: `/tenant-barcode/re-generate`,
					method: 'POST',
					body: data,
				};
			},
			providesTags: ['VendorBarcodeGenerator'],
		}),

		// manage
		VendorBarcodeManage: builder.query<
			iBarcodeManageResponse,
			{ page: number | string; searchTerm: string }
		>({
			query: ({ page, searchTerm }) => {
				return {
					url: `/tenant-barcode/manage?page=${page || 1}&search=${
						searchTerm || ''
					}`,
					method: 'GET',
				};
			},
			providesTags: ['VendorBarcodeGenerator'],
		}),
	}),
});

export const {
	useVendorBarcodeGenerateMutation,
	useVendorBarcodeRegenerateQuery,
	useVendorBarcodeManageQuery,
} = api;
