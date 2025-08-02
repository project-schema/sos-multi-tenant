import { iPagination } from '@/types';

export type iCrmITService = {
	id: number;
	icon: string;
	title: string;
	description: string;
	deleted_at: null | string;
	created_at: null | string;
	updated_at: null | string;
};
export type iCrmITServiceResponse = {
	status: 200;
	data: iPagination<iCrmITService>;
};
