import { iServiceCategory } from '@/store/features/admin/service-category';
import { iServiceSubCategory } from '@/store/features/admin/service-sub-category';
import { iPagination } from '@/types';
import { iService } from '../../type';

export type iTenantServicesResponse = {
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

export type iTCatSubCatResponse = Omit<
	iServiceCategory,
	'servicesub_categories'
> &
	{
		servicesub_categories: iServiceSubCategory[];
	}[];
