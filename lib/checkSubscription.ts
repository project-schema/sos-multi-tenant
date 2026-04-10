import { iSubscription } from '@/store/features/vendor/profile';
import { isBefore, parseISO } from 'date-fns';

export const checkSubscription = (subscription: iSubscription): boolean => {
	const expireDate = parseISO(subscription.expire_date);
	const now = new Date();

	return isBefore(expireDate, now);
};
