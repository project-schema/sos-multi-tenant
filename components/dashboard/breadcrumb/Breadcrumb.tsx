// components/Breadcrumb.tsx

import React from 'react';
import {
	Breadcrumb,
	BreadcrumbList,
	BreadcrumbItem,
	BreadcrumbSeparator,
	BreadcrumbPage,
} from '@/components/ui/breadcrumb';
import Link from 'next/link';

export type Crumb = {
	name: string;
	path?: string; // optional because the last item won't have a link
};

export type DBBreadcrumbProps = {
	items: Crumb[];
};

export const DbBreadcrumb: React.FC<DBBreadcrumbProps> = ({ items }) => {
	return (
		<Breadcrumb>
			<BreadcrumbList>
				{items.map((item, index) => {
					const isLast = index === items.length - 1;

					return (
						<React.Fragment key={item.name}>
							<BreadcrumbItem className={index !== 0 ? 'hidden md:block' : ''}>
								{isLast ? (
									<BreadcrumbPage>{item.name}</BreadcrumbPage>
								) : (
									<Link href={item.path || '#'}>{item.name}</Link>
								)}
							</BreadcrumbItem>

							{!isLast && <BreadcrumbSeparator className="hidden md:block" />}
						</React.Fragment>
					);
				})}
			</BreadcrumbList>
		</Breadcrumb>
	);
};
