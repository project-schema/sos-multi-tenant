'use client';

import { useDebounce } from '@/hooks/use-debounce';

import { useEffect, useState } from 'react';

export function VendorServicesOrderPage() {
	const [toggleFilter, setToggleFilter] = useState(true);
	const [searchTerm, setSearchTerm] = useState('');
	const [page, setPage] = useState(1);

	// Debounced version of searchTerm
	const debouncedSearchTerm = useDebounce(searchTerm, 500);

	useEffect(() => {
		setPage(1);
	}, [debouncedSearchTerm]);

	return <></>;
}
