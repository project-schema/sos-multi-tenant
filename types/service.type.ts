import { iService } from '@/store/features/admin/cms/service/admin-service.type';

export interface iServicesType {
	status: 200;
	data: 'success';
	message: iService[];
}
