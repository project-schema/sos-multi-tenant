// import Footer from '@/components/frontend/footer/Footer';
// import Nav from '@/components/frontend/nav';
import { MainWebFooter } from '@/components/main-web/footer';
import { MainWebHeader } from '@/components/main-web/header';
import { getApiData } from '@/lib';
import { iSettingsType } from '@/types/settings.type';
import { notFound } from 'next/navigation';
import React from 'react';

export default async function Layout({
	children,
}: {
	children: React.ReactNode;
}) {
	const settings = await getApiData<iSettingsType>('/settings');

	if (settings?.status !== 200) {
		return notFound();
	}

	return (
		<div className="web">
			<div className="antialiased bg-white text-secondary font-poppins">
				{/* <!-- Navbar --> */}
				<MainWebHeader settings={settings ?? null} />
				{/* <!-- / Navbar --> */}

				{/* <!-- Offcanvas Sidebar --> */}
				{/* <MainWebOffCanvas /> */}
				{/* <!-- / Offcanvas Sidebar --> */}

				<main className="pt-0">
					{children}
					{/* <!-- footer section --> */}
					<MainWebFooter settings={settings ?? null} />
					{/* <!-- /footer section --> */}
				</main>
			</div>
		</div>
	);
}
