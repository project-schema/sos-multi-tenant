'use client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

export const useQueryParams = () => {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	// Get a parameter value
	const getParam = useCallback(
		(key: string): string | null => {
			return searchParams.get(key);
		},
		[searchParams]
	);

	// Set or update a parameter value
	const setParam = useCallback(
		(key: string, value: string) => {
			const params = new URLSearchParams(searchParams.toString());
			params.set(key, value);

			router.push(`${pathname}?${params.toString()}`);
		},
		[router, pathname, searchParams]
	);

	// Delete a parameter
	const deleteParam = useCallback(
		(key: string) => {
			const params = new URLSearchParams(searchParams.toString());
			params.delete(key);

			router.push(`${pathname}?${params.toString()}`);
		},
		[router, pathname, searchParams]
	);

	return { getParam, setParam, deleteParam };
};

/*
'use client';

import { useQueryParams } from './hooks/useQueryParams';

export default function Page() {
  const { getParam, setParam, deleteParam } = useQueryParams();

  const handleSortAsc = () => setParam('sort', 'asc');
  const handleClearSort = () => deleteParam('sort');
  const page = getParam('page');

  return (
    <div>
      <p>Current page: {page}</p>
      <button onClick={handleSortAsc}>Sort Ascending</button>
      <button onClick={handleClearSort}>Clear Sort</button>
    </div>
  );
}

*/
