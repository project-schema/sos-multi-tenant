import { apiSlice } from '@/store/features/api/apiSlice';
import {
	iVendorServiceCategoryAndSubCategoryResponse,
	iVendorServices,
	iVendorServicesResponse,
} from './vendor-services-type';

const api = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		// create
		VendorServicesCreate: builder.mutation<any, any>({
			query: (data: any) => {
				const body = new FormData();
				Object.entries(data).forEach(([key, val]) => {
					if (key === 'tags' && Array.isArray(val)) {
						val.forEach((tag) => body.append('tags[]', tag));
					} else if (key === 'images' && Array.isArray(val)) {
						val.forEach(
							(file) => file && body.append('images[]', file as File)
						);
					} else if (key === 'image' && val) {
						body.append('image', val as File);
					} else if (key === 'time' && Array.isArray(val)) {
						val.forEach((time) => body.append('time[]', time));
					} else if (key === 'revision_max_time' && Array.isArray(val)) {
						val.forEach((revision_max_time) =>
							body.append('revision_max_time[]', revision_max_time)
						);
					} else if (key === 'package_description' && Array.isArray(val)) {
						val.forEach((package_description) =>
							body.append('package_description[]', package_description)
						);
					} else if (key === 'package_title' && Array.isArray(val)) {
						val.forEach((package_title) =>
							body.append('package_title[]', package_title)
						);
					} else if (key === 'price' && Array.isArray(val)) {
						val.forEach((price) => body.append('price[]', price));
					} else if (val !== undefined && val !== null) {
						body.append(key, String(val));
					}
				});

				return {
					url: `/tenant-service`,
					method: 'POST',
					body,
					formData: true,
				};
			},
			invalidatesTags: ['VendorService'],
		}),

		// update
		VendorServicesUpdate: builder.mutation<any, any>({
			query: (data: any) => {
				const body = new FormData();
				Object.entries(data).forEach(([key, val]) => {
					if (key === 'id') return; // use id in URL
					if (key === 'tags' && Array.isArray(val)) {
						val.forEach((tag) => body.append('tags[]', tag));
					} else if (key === 'images' && Array.isArray(val)) {
						val.forEach(
							(file) => file && body.append('images[]', file as File)
						);
					} else if (key === 'image' && val) {
						body.append('image', val as File);
					} else if (key === 'time' && Array.isArray(val)) {
						val.forEach((time) => body.append('time[]', time));
					} else if (key === 'revision_max_time' && Array.isArray(val)) {
						val.forEach((revision_max_time) =>
							body.append('revision_max_time[]', revision_max_time)
						);
					} else if (key === 'package_description' && Array.isArray(val)) {
						val.forEach((package_description) =>
							body.append('package_description[]', package_description)
						);
					} else if (key === 'package_title' && Array.isArray(val)) {
						val.forEach((package_title) =>
							body.append('package_title[]', package_title)
						);
					} else if (key === 'price' && Array.isArray(val)) {
						val.forEach((price) => body.append('price[]', price));
					} else if (val !== undefined && val !== null && val !== '') {
						body.append(key, String(val));
					}
				});

				return {
					url: `/tenant-service/update/${data.id}`,
					method: 'POST',
					body,
					formData: true,
				};
			},
			invalidatesTags: ['VendorService'],
		}),

		VendorServices: builder.query<iVendorServicesResponse, void>({
			query: () => '/tenant-service',
			providesTags: ['VendorService'],
		}),

		// single vendor service
		VendorServicesSingle: builder.query<iVendorServices, { id: string }>({
			query: ({ id }) => `/tenant-service/${id}`,
			providesTags: ['VendorService'],
		}),

		// count
		VendorServicesCount: builder.query<iVendorServices, void>({
			query: () => '/tenant-service/count',
			providesTags: ['VendorService'],
		}),

		// view
		VendorServicesView: builder.query<iVendorServices, { id: string }>({
			query: ({ id }) => `/tenant-service/${id}`,
			providesTags: ['VendorService'],
		}),

		VendorServiceCategoryAndSubCategory: builder.query<
			iVendorServiceCategoryAndSubCategoryResponse,
			void
		>({
			query: () => '/tenant-service/category-subcategory',
			providesTags: ['VendorService'],
		}),
	}),
});

export const {
	useVendorServicesQuery,
	useVendorServicesCountQuery,
	useVendorServicesViewQuery,
	useVendorServicesCreateMutation,
	useVendorServicesSingleQuery,
	useVendorServiceCategoryAndSubCategoryQuery,
	useVendorServicesUpdateMutation,
} = api;
