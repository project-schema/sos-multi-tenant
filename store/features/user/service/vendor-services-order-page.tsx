'use client';

import { useDebounce } from '@/hooks/use-debounce';

import { useEffect, useState } from 'react';
import { useVendorServicesQuery } from './vendor-services-api-slice';

export function VendorServicesOrderPage() {
	const [toggleFilter, setToggleFilter] = useState(true);
	const [searchTerm, setSearchTerm] = useState('');
	const [page, setPage] = useState(1);

	// Debounced version of searchTerm
	const debouncedSearchTerm = useDebounce(searchTerm, 500);

	const { data, isLoading, isError, isFetching } = useVendorServicesQuery();

	useEffect(() => {
		setPage(1);
	}, [debouncedSearchTerm]);

	return <></>;
}
