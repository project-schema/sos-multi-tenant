'use client';

import { Loader9 } from '@/components/dashboard';
import { checkSubscription } from '@/lib';
import { useVendorProfileInfoQuery } from '@/store/features/vendor/profile';
import { useSession } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

const SessionProvider = ({ children }: { children: React.ReactNode }) => {
	const { data: session, status } = useSession();
	const router = useRouter();
	const pathname = usePathname();

	const isVendor =
		session?.tenant_type === 'merchant' ||
		session?.tenant_type === 'dropshipper';

	const { data, isLoading, isError } = useVendorProfileInfoQuery(undefined, {
		skip: !session || !isVendor,
	});

	// ✅ Only true once ALL checks pass — children never render prematurely
	const [isResolved, setIsResolved] = useState(false);

	useEffect(() => {
		if (status === 'loading') return;

		if (
			['/auth', '/dashboard/cms/system', '/dashboard/membership'].some((p) =>
				pathname.startsWith(p),
			)
		) {
			setIsResolved(true);
			return;
		}

		if (status === 'unauthenticated') {
			router.replace('/auth');
			return; // stay null until redirect completes
		}

		if (status === 'authenticated' && session) {
			const role = session.user?.role_type;

			if (role === 'tenant_user') {
				router.replace('/account');
				return;
			}

			if (isVendor) {
				if (isLoading) return; // wait for vendor data

				if (isError) {
					router.replace('/dashboard/membership');
					return;
				}

				const subscription = data?.usersubscription;

				if (!subscription) {
					router.replace('/dashboard/membership');
					return;
				}

				if (checkSubscription(subscription)) {
					toast.warning(
						'Your subscription has expired. Please renew your subscription.',
					);
					router.replace('/dashboard/membership');
					return;
				}

				if (
					data?.usersubscription?.has_website === 'yes' &&
					!data?.cms_setting?.theme
				) {
					router.replace('/dashboard/cms/system?tab=theme');
					return;
				}
			}

			// ✅ All checks passed — safe to render
			setIsResolved(true);
		}
	}, [status, session, data, isLoading, isError, isVendor, router]);

	// ✅ Return null (blank) until resolved — no flash of wrong content
	// if (!isResolved) return null;

	if (status === 'loading' || (isVendor && isLoading) || !isResolved) {
		return <Loader9 />;
	}

	return <>{children}</>;
};

export default SessionProvider;
