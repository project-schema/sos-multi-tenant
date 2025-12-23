import { Session } from 'next-auth';
export const dashboardLink = (role: Session['user']['tenant_type']): string => {
	if (role === 'admin') {
		return '/admin';
	}
	if (role === 'user') {
		return '/user';
	}
	return '/';
};
