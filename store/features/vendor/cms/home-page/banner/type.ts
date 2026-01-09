import { iPagination } from '@/types';

export type iBanner = {
	id: number;
	title: string;
	subtitle: string;
	image: string | null;
	link: string | null;
	status: 'active' | 'inactive';
	order: number;
	created_at: string;
	updated_at: string | null;
	deleted_at: string | null;
};

export type iBannerResponse = {
	status: number;
	banners: iPagination<iBanner>;
};

export type iBannerSingleResponse = {
	status: number;
	banner: iBanner;
};
