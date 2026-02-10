'use client';
import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { useFrontendVisitPageMutation } from './frontend-api-slice';

export function FrontendPageVisit() {
	const pathname = usePathname();
	const { data: session } = useSession();
	const [trackVisit] = useFrontendVisitPageMutation();

	useEffect(() => {
		if (!pathname.startsWith('/account') && session?.user?.usersubscription) {
			trackVisit();
		}
	}, [trackVisit, pathname]);

	return null;
}
