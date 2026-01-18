import { Session } from 'next-auth';
export const profileLink = (role: Session['tenant_type']) => {
	if (role === 'admin') {
		return '/admin/profile';
	}
	if (role === 'user') {
		return '/user/profile';
	}
	return '#';
};
