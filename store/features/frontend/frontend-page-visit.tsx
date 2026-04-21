'use client';

import { iTenantFrontend } from '@/types/tenant-frontend';
import { useSession } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useFrontendVisitPageMutation } from './frontend-api-slice';

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';

export function FrontendPageVisit({
	settings,
}: {
	settings: iTenantFrontend | null;
}) {
	const pathname = usePathname();
	const { data: session } = useSession();
	const [trackVisit] = useFrontendVisitPageMutation();
	const router = useRouter();

	const [open, setOpen] = useState(false);
	// if (!settings?.cms?.theme) {
	// 	toast.error('Theme not found');
	// }

	// if (settings?.has_website === 'no') {
	// 	toast.error('Website not found');
	// }
	useEffect(() => {
		const handleVisit = async () => {
			if (!pathname.startsWith('/account') && settings?.has_website === 'yes') {
				try {
					const result = await trackVisit().unwrap();

					// 👉 check limit
					// if (true) {
					if (
						result.already_visits >= result.website_visits &&
						pathname !== '/auth'
					) {
						setOpen(true);
					}
				} catch (error) {
					console.error('Visit tracking failed:', error);
				}
			}
		};

		if (pathname === '/auth') {
			setOpen(false);
		}

		handleVisit();
	}, [trackVisit, pathname, settings?.has_website]);

	return (
		<>
			<Dialog open={open} onOpenChange={() => {}}>
				<DialogContent
					onInteractOutside={(e) => e.preventDefault()} // ❌ prevent click outside close
					onEscapeKeyDown={(e) => e.preventDefault()} // ❌ prevent ESC close
				>
					<DialogHeader>
						<DialogTitle>Visit Limit Reached</DialogTitle>
						<DialogDescription>
							You have exceeded the maximum number of visits allowed.
						</DialogDescription>
					</DialogHeader>

					<div className="flex justify-end">
						<button
							className="mt-4  rounded-md bg-primary px-4 py-2 text-white"
							onClick={() => {
								if (session) {
									if (session.user.role_type === 'admin') {
										router.push('/dashboard/membership');
									} else {
										router.push('/account');
									}
								} else {
									router.push('/auth');
								}
							}}
						>
							{session ? 'Go to Dashboard' : 'Login to Continue'}
						</button>
					</div>
				</DialogContent>
			</Dialog>
		</>
	);
}
