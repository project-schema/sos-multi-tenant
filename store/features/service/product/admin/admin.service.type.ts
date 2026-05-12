import { iPagination } from '@/types';
import { iService } from '../../type';

/** Alias for vendor service rows returned by admin vendor-services APIs. */
export type iAdminService = iService;

export type iAdminServiceResponse = {
	status: number;
	data: 'success';
	message: iPagination<iService>;
};

export type iAdminServiceStatistics = {
	status: number;
	data: 'success';
	message: {
		totalservice: number;
		totalactiveservice: number;
		totalpendingservice: number;
		totalrejectedservice: number;
	};
};
