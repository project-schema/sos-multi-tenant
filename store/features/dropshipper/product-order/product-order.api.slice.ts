import { apiSlice } from '../../api/apiSlice';

const api = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		// get all
		DropshipperProductOrder: builder.query<
			any,
			{ page: number | string; search: string; status: string }
		>({
			query: ({ page, search, status }) => {
				/*
				tenant-dropshipper/all-orders

				api/admin/hold-orders?page=null&search=
				api/admin/pending-orders?page=null&search=
				api/admin/received-orders?page=null&search=
				api/admin/progress-orders?page=null&search=
				api/admin/delivered-orders?page=null&search=
				api/admin/cancel-orders?page=null&search=

 
				*/
				if (!status) {
					status = 'all';
				}

				return {
					url: `/tenant-dropshipper/all-orders?page=${page}&search=${search}`,
					method: 'GET',
				};
			},
			providesTags: ['DropshipperProductOrder'],
		}),
	}),
});

export const { useDropshipperProductOrderQuery } = api;
