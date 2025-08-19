import { apiSlice } from '../../api/apiSlice';
import { iVendorProductCreateType } from './vendor-product-type';

const api = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		// get all
		VendorProductAll: builder.query<any, { page: number | string }>({
			query: ({ page }) => ({
				url: `/tenant-sub-category?page=${page}`,
				method: 'GET',
			}),
			providesTags: ['VendorProduct'],
		}),

		//  create data
		VendorProductCreateData: builder.query<iVendorProductCreateType, undefined>(
			{
				query: () => ({
					url: `/tenant-product/create`,
					method: 'GET',
				}),
				providesTags: ['VendorProduct'],
			}
		),

		// store
		VendorProductStore: builder.mutation<{ status: 200; message: string }, any>(
			{
				query: (data) => {
					const body = new FormData();
					Object.entries(data as any).forEach(([key, value]) => {
						if (key === 'images') {
							body.append('images[]', value as string);
						} else if (key === 'specification') {
							value.forEach((item: any, index: number) => {
								body.append(`specification[]`, item);
							});
						} else if (key === 'specification_ans') {
							value.forEach((item: any, index: number) => {
								body.append(`specification_ans[]`, item);
							});
						} else if (key === 'selling_details') {
							value.forEach((item: any, index: number) => {
								console.log(item);
								body.append(
									`selling_details[${index}][advance_payment]`,
									item.advance_payment
								);
								body.append(
									`selling_details[${index}][advance_payment_type]`,
									item.advance_payment_type
								);
								body.append(
									`selling_details[${index}][bulk_commission]`,
									item.bulk_commission
								);
								body.append(
									`selling_details[${index}][bulk_commission_type]`,
									item.bulk_commission_type
								);
								body.append(
									`selling_details[${index}][min_bulk_qty]`,
									item.min_bulk_qty
								);
								body.append(
									`selling_details[${index}][min_bulk_price]`,
									item.min_bulk_price
								);
							});
						} else {
							body.append(key, value as string);
						}
					});

					return {
						url: `/tenant-product/store`,
						method: 'POST',
						body,
						formData: true,
					};
				},
				invalidatesTags: ['VendorProduct'],
			}
		),

		// update
		VendorProductUpdate: builder.mutation<
			{ status: 200; message: string },
			any
		>({
			query: (data) => {
				const body = new FormData();
				Object.entries(data).forEach(([key, value]) => {
					if (value) {
						body.append(key, value as string);
					}
				});

				body.append('_method', 'PUT');

				return {
					url: `/tenant-sub-category/update/${data.id}`,
					method: 'POST',
					body,
					formData: true,
				};
			},
			invalidatesTags: ['VendorProduct'],
		}),

		// delete
		VendorProductDelete: builder.mutation<
			{ status: 200; message: string },
			{ id: string | number }
		>({
			query: (data) => ({
				url: `/tenant-sub-category/delete/${data.id}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['VendorProduct'],
		}),
	}),
});

export const {
	useVendorProductAllQuery,
	useVendorProductStoreMutation,
	useVendorProductDeleteMutation,
	useVendorProductUpdateMutation,
	useVendorProductCreateDataQuery,
} = api;
