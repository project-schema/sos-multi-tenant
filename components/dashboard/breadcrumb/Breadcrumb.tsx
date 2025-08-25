// components/Breadcrumb.tsx

import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import Link from 'next/link';
import React from 'react';

export type Crumb = {
	name: string;
	path?: string;
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
						<React.Fragment key={index}>
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
