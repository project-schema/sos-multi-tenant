export type iService = {
	id: number;
	title: string;
	description: string;
	icon: string | null;
	status: 'active' | 'inactive';
	order: number;
	created_at: string;
	updated_at: string | null;
	deleted_at: string | null;
};

export type iServiceResponse = iService[];

export type iServiceSingleResponse = {
	status: number;
	service: iService;
};
