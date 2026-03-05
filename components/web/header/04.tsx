import { getApiDataWithSubdomain } from '@/lib';
import { webSocialLinks } from '@/lib/icon/social-icon';
import { iCategory } from '@/store/features/admin/category';
import { iTenantFrontend } from '@/types/tenant-frontend';
import Image from 'next/image';
import Link from 'next/link';
import { MainHeader4 } from './_ctx/main-header-4';
import { TopPromotionalBar } from './_ctx/top-promotional-bar';
export default async function Header04() {
	const settings = await getApiDataWithSubdomain<iTenantFrontend>(
		'/tenant-frontend/cms',
	);

	const categories = await getApiDataWithSubdomain<iCategory[]>(
		'/tenant-frontend/categories',
	);

	return (
		<>
			<header className="w-full bg-white ">
				<div className="bg-primary3 text-white py-2.5 hidden lg:block">
					<div className="max-w-[1520px] mx-auto pr-4 sm:pr-6 lg:pr-8">
						<div className="flex items-center justify-between flex-wrap gap-4 text-xs sm:text-sm">
							{/* Contact Information */}
							<div className="max-w-md">
								{settings?.offers && settings?.offers?.length > 0 && (
									<TopPromotionalBar offers={settings?.offers ?? []} />
								)}
							</div>
							{/* Social Media Icons */}
							<div className="flex items-center gap-2">
								{webSocialLinks?.map((social) => {
									const url =
										settings?.cms?.[social.key as keyof typeof settings.cms];

									if (!url) return null;

									return (
										<Link
											key={social.key}
											href={url as string}
											className="w-4 h-4  rounded-full flex items-center justify-center  transition-all duration-200"
											aria-label={social.label}
											prefetch={false}
										>
											<Image
												src={social.icon}
												width={1000}
												height={1000}
												alt={social.label}
												className="w-4 h-4 object-contain hover:scale-110 transition-all"
											/>
										</Link>
									);
								})}
							</div>
						</div>
					</div>
				</div>

				{/* Main Header Section */}

				<MainHeader4 cms={settings?.cms ?? null} categories={categories} />
			</header>
		</>
	);
}
