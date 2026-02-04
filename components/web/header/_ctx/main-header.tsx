'use client';
import { iCategory } from '@/store/features/admin/category';
import { iSystem } from '@/store/features/vendor/cms/system/type';
import { useState } from 'react';
import { ContactInfo } from './contact-info';
import { Logo } from './logo';
import { MobileMenu } from './mobile-menu';
import { MobileSearch } from './mobile-search';
import { SearchBar } from './search-bar';
import { UserAccount } from './user-account';

export function MainHeader({
	cms,
	categories,
}: {
	cms: iSystem | null;
	categories: iCategory[] | null;
}) {
	const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
	return (
		<div className="bg-white border-b border-gray-200">
			<div className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex items-center justify-between gap-4 py-4">
					{/* Logo */}
					<Logo logo={cms?.logo ?? ''} />

					{/* Search Bar - Desktop */}
					<div className="flex-1 max-w-2xl mx-4 hidden md:flex">
						{categories && (
							<SearchBar variant="desktop" categories={categories} />
						)}
					</div>

					{/* Mobile Search */}
					<MobileSearch
						onToggle={() => setMobileSearchOpen(!mobileSearchOpen)}
					/>

					{/* Right Side Actions */}
					<div className="flex items-center gap-2 sm:gap-4 lg:gap-6 flex-shrink-0">
						<ContactInfo settings={cms ?? null} />
						<UserAccount />
						<MobileMenu />
					</div>
				</div>

				{/* Mobile Search Bar */}
				{mobileSearchOpen && (
					<div className="md:hidden pb-4">
						{categories && (
							<SearchBar variant="desktop" categories={categories} />
						)}
					</div>
				)}
			</div>
		</div>
	);
}
