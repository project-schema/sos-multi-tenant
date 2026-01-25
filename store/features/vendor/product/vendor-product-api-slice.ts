import { apiSlice } from '../../api/apiSlice';
import {
	iVendorMarketPlaceUtility,
	iVendorProductCreateType,
	iVendorProductResponse,
	iVendorProductView,
} from './vendor-product-type';

const api = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		// get all
		VendorProductAll: builder.query<
			iVendorProductResponse,
			{ page: number | string; search: string; status: string }
		>({
			query: ({ page, search = '', status = '' }) => {
				let url = ``;
				if (status === 'all') {
					url = `/tenant-product?page=${page}&search=${search}`;
				} else {
					if (
						status === '/active' ||
						status === '/pending' ||
						status === '/rejected' ||
						status === '/edited'
					) {
						url = `/tenant-product${status}?page=${page}&search=${search}`;
					} else {
						url = `/tenant-product?page=${page}&search=${search}`;
					}
				}
				return {
					url: url,
					method: 'GET',
				};
			},
			providesTags: ['VendorProduct'],
		}),

		// product count
		VendorProductCount: builder.query<
			{
				status: 200;
				count: {
					total: number;
					active: number;
					pending: number;
					rejected: number;
					edited: number;
				};
			},
			undefined
		>({
			query: () => ({
				url: `/tenant-product/count-data`,
				method: 'GET',
			}),
			providesTags: ['VendorProduct'],
		}),

		// get by id
		VendorProductById: builder.query<
			{ product: iVendorProductView; status: 200 },
			{ id: string }
		>({
			query: ({ id }) => ({
				url: `/tenant-product/edit/${id}`,
				method: 'GET',
			}),
			providesTags: ['VendorProduct'],
		}),

		//  get create data
		VendorProductCreateData: builder.query<iVendorProductCreateType, undefined>(
			{
				query: () => ({
					url: `/tenant-product/create`,
					method: 'GET',
				}),
				providesTags: ['VendorProductCreateData'],
			}
		),

		// store
		VendorProductStore: builder.mutation<{ status: 200; message: string }, any>(
			{
				query: (data) => {
					const body = new FormData();
					Object?.entries(data as any)?.forEach(([key, value]) => {
						if (key === 'images') {
							(value as any[])?.forEach((item: any, index: number) => {
								body.append(`images[${index}]`, item);
							});
						} else if (key === 'specification') {
							(value as any[])?.forEach((item: any, index: number) => {
								body.append(`specification[]`, item);
							});
						} else if (key === 'specification_ans') {
							(value as any[])?.forEach((item: any, index: number) => {
								body.append(`specification_ans[]`, item);
							});
						} else if (key === 'selling_details') {
							(value as any[])?.forEach((item: any, index: number) => {
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
				Object.entries(data as any).forEach(([key, value]) => {
					if (key === 'images') {
						(value as any[])?.forEach((item: any, index: number) => {
							if (item) {
								body.append(`images[${index}]`, item);
							}
						});
					} else if (key === 'specification') {
						(value as any[])?.forEach((item: any, index: number) => {
							body.append(`specification[]`, item);
						});
					} else if (key === 'specification_ans') {
						(value as any[])?.forEach((item: any, index: number) => {
							body.append(`specification_ans[]`, item);
						});
					} else if (key === 'selling_details') {
						(value as any[])?.forEach((item: any, index: number) => {
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
						if (value) {
							body.append(key, value as string);
						}
					}
				});

				return {
					url: `/tenant-product/update/${data.id}`,
					method: 'POST',
					body,
					formData: true,
				};
			},
			invalidatesTags: ['VendorProduct'],
		}),

		// delete image
		VendorProductImageDelete: builder.mutation<
			{ status: 200; message: string },
			{ id: string | number }
		>({
			query: (data) => ({
				url: `/tenant-product/delete-image/${data.id}`,
				method: 'DELETE',
			}),
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

		// market place
		VendorMarketPlaceUtility: builder.query<iVendorMarketPlaceUtility, void>({
			query: () => ({
				url: `/tenant-marketplace/utilities`,
				method: 'GET',
			}),
		}),
	}),
});

export const {
	useVendorProductAllQuery,
	useVendorProductCountQuery,
	useVendorProductByIdQuery,
	useVendorProductStoreMutation,
	useVendorProductDeleteMutation,
	useVendorProductUpdateMutation,
	useVendorProductCreateDataQuery,
	useVendorProductImageDeleteMutation,
	useVendorMarketPlaceUtilityQuery,
} = api;
