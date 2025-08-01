import { iPagination } from '@/types';

export type iDropShipReq = {
	id: number;
	product_id: number;
	user_id: number;
	vendor_id: number;
	status: number;
	created_at: string;
	updated_at: string;
	reason: null | string;
	uniqid: string;
	vendor: {
		id: number;
		name: string;
	};
	affiliator: {
		id: number;
		name: string;
	};
	product: {
		id: number;
		name: string;
		image: string;
		discount_rate: string;
	};
};
export type iDropShipReqResponse = {
	status: number;
	product: iPagination<iDropShipReq>;
};

export type iDropShipReqStatistics = {
	status: number;
	data: string;
	message: {
		totalrequest: number;
		totalactiverequest: number;
		totalpendingrequest: number;
		totalrejectedrequest: number;
	};
};
