'use client';

import { Pagination1 } from '@/components/dashboard/pagination/pagination-1';
import { getApiData } from '@/lib';
import { iPagination } from '@/types';
import { useEffect, useState } from 'react';
import RattingCardSD from './ratting-card';
import { iServiceRatingType } from './type';

type ServiceRatingResponse = {
	status: number;
	data: string;
	message: iPagination<iServiceRatingType>;
};

export default function ServiceRatting({ service }: { service: any }) {
	const [page, setPage] = useState(1);
	const [pagination, setPagination] =
		useState<iPagination<iServiceRatingType> | null>(null);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setPage(1);
	}, [service?.id]);

	useEffect(() => {
		if (!service?.id) return;
		let active = true;
		const fetchRatings = async () => {
			setLoading(true);
			const res = await getApiData<ServiceRatingResponse>(
				`/services-rating/${service?.id}?page=${page}`
			);

			if (!active) return;

			if (res?.status === 200 && res?.message) {
				setPagination(res.message);
			} else {
				setPagination(null);
			}
			setLoading(false);
		};

		fetchRatings();

		return () => {
			active = false;
		};
	}, [page, service?.id]);

	const ratings = pagination?.data || [];

	return (
		<div>
			{loading && (
				<p className="text-sm text-muted-foreground">Loading reviews...</p>
			)}

			{!loading && ratings.length === 0 && (
				<p className="text-sm text-muted-foreground">No reviews yet.</p>
			)}

			{ratings.map((rating) => (
				<RattingCardSD key={rating.id} rating={rating} />
			))}

			{pagination && pagination.total > pagination.per_page && (
				<Pagination1 pagination={pagination} setPage={setPage} />
			)}
		</div>
	);
}
