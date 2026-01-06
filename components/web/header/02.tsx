'use client';

import * as React from 'react';
import { ContactInfo } from './_ctx/contact-info';
import { Logo } from './_ctx/logo';
import { MainNavigation } from './_ctx/main-navigation';
import { MobileMenu } from './_ctx/mobile-menu';
import { MobileSearch } from './_ctx/mobile-search';
import { SearchBar } from './_ctx/search-bar';
import { TopPromotionalBar } from './_ctx/top-promotional-bar';
import { UserAccount } from './_ctx/user-account';

export default function Header02() {
	const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
	const [mobileSearchOpen, setMobileSearchOpen] = React.useState(false);

	return (
		<header className="w-full bg-white">
			{/* Top Promotional Bar */}
			<TopPromotionalBar />

			{/* Main Header Section */}
			<div className="bg-white border-b border-gray-200">
				<div className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex items-center justify-between gap-4 py-4">
						{/* Logo */}
						<Logo />

						{/* Search Bar - Desktop */}
						<div className="flex-1 max-w-2xl mx-4 hidden md:flex">
							<SearchBar variant="desktop" />
						</div>

						{/* Mobile Search */}
						<MobileSearch
							onToggle={() => setMobileSearchOpen(!mobileSearchOpen)}
						/>

						{/* Right Side Actions */}
						<div className="flex items-center gap-2 sm:gap-4 lg:gap-6 flex-shrink-0">
							<ContactInfo />
							<UserAccount />
							<MobileMenu
								open={mobileMenuOpen}
								onOpenChange={setMobileMenuOpen}
							/>
						</div>
					</div>

					{/* Mobile Search Bar */}
					{mobileSearchOpen && (
						<div className="md:hidden pb-4">
							<SearchBar variant="desktop" />
						</div>
					)}
				</div>
			</div>

			{/* Main Navigation Bar */}
			<MainNavigation />
		</header>
	);
}
