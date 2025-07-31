export const tableSrCount = (page: number | string, i: number) => {
	if (!page) {
		page = 1;
	}
	if (!i) {
		i = 0;
	}
	if (typeof page === 'string') {
		page = Number(page);
	}

	return ((page - 1) * 10 + i + 1).toString().padStart(2, '0');
};

/*
export const TableSr = ({ page, i }) => {
	return page === null || parseInt(page) === 1
		? (i + 1).toString().padStart(2, '0')
		: (parseInt(page) - 1) * 10 + i + 1;
};
*/
