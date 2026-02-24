'use client';

import {
	Pagination as PaginationComponent,
	PaginationContent,
	PaginationItem,
	PaginationLink,
} from '@/components/ui/pagination';
import { cn } from '@/lib';
import { iPagination } from '@/types';
import { useRouter, useSearchParams } from 'next/navigation';

interface Props {
	pagination: iPagination<any>;
}

export function Pagination2({ pagination }: Props) {
	const router = useRouter();
	const searchParams = useSearchParams();

	if (!pagination) return null;

	const handlePageChange = (page: number) => {
		const params = new URLSearchParams(searchParams.toString());
		params.set('page', page.toString());

		router.push(`?${params.toString()}`, { scroll: true });
	};

	return (
		<div className="flex items-center justify-center gap-2 xl:justify-between mt-4 flex-wrap flex-col sm:flex-row">
			<p className="text-sm text-muted-foreground">
				Showing {pagination?.from} to {pagination?.to} of {pagination?.total}{' '}
				items
			</p>

			<PaginationComponent className="justify-end w-auto ml-auto mx-0">
				<PaginationContent className="flex-wrap justify-center">
					{pagination?.links?.map((link, index) => {
						const isEllipsis = link.label === '...';
						const isPrevious = link.label.includes('Previous');
						const isNext = link.label.includes('Next');

						let pageNumber: number | null = null;

						if (link.url) {
							const match = link.url.match(/page=(\d+)/);
							if (match) {
								pageNumber = parseInt(match[1]);
							}
						}

						return (
							<PaginationItem key={index}>
								<PaginationLink
									href="#"
									onClick={(e) => {
										e.preventDefault();
										if (!isEllipsis && pageNumber) {
											handlePageChange(pageNumber);
										}
									}}
									isActive={link.active}
									aria-disabled={!pageNumber || isEllipsis}
									className={cn(
										`size-7 xl:size-9 ${
											!pageNumber || isEllipsis
												? 'opacity-50 pointer-events-none'
												: ''
										}`,
									)}
								>
									{isPrevious ? '←' : isNext ? '→' : link.label}
								</PaginationLink>
							</PaginationItem>
						);
					})}
				</PaginationContent>
			</PaginationComponent>
		</div>
	);
}
