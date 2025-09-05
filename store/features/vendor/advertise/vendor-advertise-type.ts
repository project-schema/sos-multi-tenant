import { iPagination } from '@/types';

export type iVendorAdvertise = {};
export type iVendorAdvertiseResponse = {
	status: number;
	data: 'success';
	message: iPagination<iVendorAdvertise>;
};
