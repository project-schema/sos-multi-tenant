'use client';
import {
	Pagination as PaginationComponent,
	PaginationContent,
	PaginationItem,
	PaginationLink,
} from '@/components/ui/pagination';
import { cn } from '@/lib';
import { iPagination } from '@/types';

interface Props {
	pagination: iPagination<any>;
	setPage: (page: number) => void;
}

export function Pagination1({ pagination, setPage }: Props) {
	if (!pagination) return null;

	const handlePageChange = (url: string | null) => {
		if (!url) return;

		const match = url.match(/page=(\d+)/);
		if (match) {
			const pageNum = parseInt(match[1]);
			if (!isNaN(pageNum)) setPage(pageNum);
		}
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

						return (
							<PaginationItem key={index}>
								<PaginationLink
									href="#"
									onClick={(e) => {
										e.preventDefault();
										if (!isEllipsis && link.url) {
											handlePageChange(link.url);
										}
									}}
									isActive={link.active}
									aria-disabled={!link.url || isEllipsis}
									className={cn(
										`size-5 sm:size-7 xl:size-9 ${
											!link.url || isEllipsis
												? 'opacity-50 pointer-events-none select-none'
												: ''
										}`
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
