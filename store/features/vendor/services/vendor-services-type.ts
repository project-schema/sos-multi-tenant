import { iPagination } from '@/types';

export type iVendorServices = {};
export type iVendorServicesResponse = {
	status: number;
	data: 'success';
	message: iPagination<iVendorServices>;
};
