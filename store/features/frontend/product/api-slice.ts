import { iPagination } from '@/types';
import { iSize } from '../../admin/merchant-product';
import { iSubCategory } from '../../admin/sub-category';
import { apiSlice } from '../../api/apiSlice';
import { iVendorBrand } from '../../vendor/brand';
import { iVendorCategory } from '../../vendor/category/vendor-category-type';
import { iVendorColor } from '../../vendor/color';
import {
	iVendorProduct,
	iVendorProductView,
} from '../../vendor/product/vendor-product-type';

const api = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		//  get tenant frontend products
		TenantFrontendProducts: builder.query<
			iPagination<iVendorProduct>,
			undefined
		>({
			query: () => ({
				url: `/tenant-frontend/products`,
				method: 'GET',
			}),
		}),

		// get by id
		TenantFrontendProductBySlug: builder.query<
			{ product: iVendorProductView; related_products: iVendorProduct[] },
			{ slug: string }
		>({
			query: ({ slug }) => ({
				url: `/tenant-frontend/product/${slug}`,
				method: 'GET',
			}),
		}),

		// brands
		FrontendBrands: builder.query<{ brands: iVendorBrand[] }, void>({
			query: () => ({
				url: `/tenant-frontend/brands`,
				method: 'GET',
			}),
		}),

		// subcategories
		FrontendSubcategories: builder.query<iSubCategory[], void>({
			query: () => ({
				url: `/tenant-frontend/subcategories`,
				method: 'GET',
			}),
		}),

		// search Product
		FrontendSearch: builder.query<
			iVendorProduct[],
			{ search: string; category_id: string }
		>({
			query: ({
				search,
				category_id,
			}: {
				search: string;
				category_id: string;
			}) => {
				let url = `/tenant-frontend/search/item/${search}`;
				if (category_id) {
					url += `/${category_id}`;
				}
				return {
					url,
					method: 'GET',
				};
			},
		}),

		// categories
		FrontendCategories: builder.query<iVendorCategory[], void>({
			query: () => ({
				url: `/tenant-frontend/categories`,
				method: 'GET',
			}),
		}),

		// colors
		FrontendColors: builder.query<iVendorColor[], void>({
			query: () => ({
				url: `/tenant-frontend/colors`,
				method: 'GET',
			}),
		}),

		// size
		FrontendSizes: builder.query<iSize[], void>({
			query: () => ({
				url: `/tenant-frontend/size`,
				method: 'GET',
			}),
		}),
	}),
});

export const {
	useTenantFrontendProductsQuery,
	useFrontendBrandsQuery,
	useFrontendSubcategoriesQuery,
	useFrontendCategoriesQuery,
	useFrontendSearchQuery,
	useTenantFrontendProductBySlugQuery,
	useFrontendColorsQuery,
	useFrontendSizesQuery,
} = api;
