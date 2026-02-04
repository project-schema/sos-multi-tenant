import { Session } from 'next-auth';
export const accountLink = (role: Session): string => {
	if (role.user.role_type === 'admin') {
		return '/dashboard';
	}
	return '/account';
};
