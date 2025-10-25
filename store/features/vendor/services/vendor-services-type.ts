import { iPagination } from '@/types';
import { iUser } from '../profile';

export type iVendorServices = {
	id: number;
	uniqueid: string;
	user_id: number;
	service_category_id: number;
	service_sub_category_id: number;
	rating: number;
	title: string;
	description: string;
	tags: string[];
	contract: string;
	status: 'active' | 'pending' | 'rejected';
	commission: number;
	commission_type: string;
	image: string;
	created_at: string;
	updated_at: string;
	deleted_at: null | string;
	reason: null | string;
	tenant_id: string;
	servicepackages: {
		id: number;
		vendor_service_id: number;
		time: string;
		package_title: string;
		package_description: string;
		price: number;
		revision_max_time: number;
		deleted_at: null | string;
		created_at: string;
		updated_at: string;
	}[];
	serviceimages: {
		id: number;
		vendor_service_id: number;
		images: string;
		deleted_at: null | string;
		created_at: string;
		updated_at: string;
	}[];
	user: iUser;
};
export type iVendorServicesResponse = {
	status: number;
	data: 'success';
	message: iPagination<iVendorServices>;
};

export type iVendorServiceCategory = {
	id: number;
	user_id: number;
	name: string;
	slug: string;
	status: 'active' | 'pending';
	deleted_at: null;
	created_at: string;
	updated_at: string;
	servicesub_categories: iVendorServiceSubCategory[];
};
export type iVendorServiceSubCategory = {
	id: number;
	user_id: number;
	service_category_id: number;
	name: string;
	status: 'active' | 'pending';
	deleted_at: null;
	created_at: string;
	updated_at: string;
};
export type iVendorServiceCategoryAndSubCategoryResponse = {
	status: number;
	data: 'success';
	message: iVendorServiceCategory[];
};

const data = {
	id: 13,
	uniqueid: '68f8d701987c3',
	user_id: 1,
	service_category_id: 1,
	service_sub_category_id: 1,
	rating: 0,
	title: 'Tets',
	description: 'sdfsdf',
	tags: ['asdf'],
	contract: 'asdasd',
	status: 'pending',
	commission: 12,
	commission_type: 'flat',
	image: 'uploads/vendor/68f8d700b22d9-1761138432.jpg',
	created_at: '2025-10-22T13:07:13.000000Z',
	updated_at: '2025-10-22T13:07:13.000000Z',
	deleted_at: null,
	reason: null,
	tenant_id: 'testcompany',
	servicepackages: [
		{
			id: 37,
			vendor_service_id: 13,
			time: '123',
			package_title: '21212',
			package_description: '1231',
			price: 12,
			revision_max_time: 123,
			deleted_at: null,
			created_at: '2025-10-22T13:07:13.000000Z',
			updated_at: '2025-10-22T13:07:13.000000Z',
		},
		{
			id: 38,
			vendor_service_id: 13,
			time: '123',
			package_title: '123',
			package_description: '23123123',
			price: 23,
			revision_max_time: 123,
			deleted_at: null,
			created_at: '2025-10-22T13:07:13.000000Z',
			updated_at: '2025-10-22T13:07:13.000000Z',
		},
		{
			id: 39,
			vendor_service_id: 13,
			time: '123',
			package_title: '123123',
			package_description: '132132',
			price: 123,
			revision_max_time: 123,
			deleted_at: null,
			created_at: '2025-10-22T13:07:13.000000Z',
			updated_at: '2025-10-22T13:07:13.000000Z',
		},
	],
	serviceimages: [
		{
			id: 16,
			vendor_service_id: 13,
			images: 'uploads/vendor/68f8d701a1e09-1761138433.jpg',
			deleted_at: null,
			created_at: '2025-10-22T13:07:13.000000Z',
			updated_at: '2025-10-22T13:07:13.000000Z',
		},
		{
			id: 17,
			vendor_service_id: 13,
			images: 'uploads/vendor/68f8d701c2146-1761138433.jpg',
			deleted_at: null,
			created_at: '2025-10-22T13:07:13.000000Z',
			updated_at: '2025-10-22T13:07:13.000000Z',
		},
	],
};
