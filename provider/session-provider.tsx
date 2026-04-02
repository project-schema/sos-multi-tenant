'use client';

import { Loader9 } from '@/components/dashboard';
import { useVendorProfileInfoQuery } from '@/store/features/vendor/profile';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { toast } from 'sonner';

const SessionProvider = ({ children }: { children: React.ReactNode }) => {
	const { data: session, status } = useSession();
	const { data, isLoading, isError } = useVendorProfileInfoQuery(undefined, {
		skip:
			!session ||
			(session.tenant_type !== 'merchant' &&
				session.tenant_type !== 'dropshipper'),
	});
	const router = useRouter();

	useEffect(() => {
		if (status === 'unauthenticated') {
			router.replace('/auth');
			return;
		}

		if (status === 'authenticated' && session && !isLoading && !isError) {
			const role = session.user?.role_type;

			// Redirect tenant users first
			if (role === 'tenant_user') {
				router.replace('/account');
				return;
			}

			// Check subscription (only for specific tenant types)
			const isRestrictedTenant =
				session.tenant_type === 'dropshipper' ||
				session.tenant_type === 'merchant';

			if (isRestrictedTenant) {
				const subscription = data?.usersubscription;

				console.log(!subscription);

				// No subscription
				if (!subscription) {
					router.replace('/dashboard/membership');
					return;
				}

				// Expired subscription
				const expireDate = new Date(subscription.expire_date);
				const now = new Date();

				console.log(expireDate <= now);

				// {
				//     "expireDate": "2026-05-01T10:51:51.000Z",
				//     "now": "2026-04-02T04:27:22.321Z"
				// }

				if (expireDate <= now) {
					toast.warning(
						'Your subscription has expired. Please renew your subscription to continue using our services.',
					);
					router.replace('/dashboard/membership');
					return;
				}
			}
		}
	}, [status, session, data, router, isLoading]);

	// useEffect(() => {
	// 	if (status === 'unauthenticated') {
	// 		router.replace('/auth');
	// 	}

	// 	if (
	// 		status === 'authenticated' &&
	// 		data &&
	// 		!data.usersubscription &&
	// 		(session?.tenant_type === 'dropshipper' ||
	// 			session?.tenant_type === 'merchant')
	// 	) {
	// 		router.replace('/dashboard/membership');
	// 	}

	// 	if (session?.user.role_type === 'tenant_user') {
	// 		router.replace('/account');
	// 	}
	// }, [status, session, data, router]);

	if (status === 'loading' || isLoading) {
		return <Loader9 />;
	}

	return <>{children}</>;
};

export default SessionProvider;
