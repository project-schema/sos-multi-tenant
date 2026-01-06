'use client';

import Footer01 from '@/components/web/footer/01';
import Header01 from '@/components/web/header/01';
import { useState } from 'react';
import CommonWishList from '../common/wish-list';

type WishItem = {
	id: number;
	title: string;
	price: number;
	compareAt?: number;
	image: string;
};

const initialItems: WishItem[] = [1, 2, 3].map((i) => ({
	id: i,
	title: 'Premium 100% Cotton Panjabi – Navy Blue',
	price: 1242,
	compareAt: 1775,
	image:
		'https://images.unsplash.com/photo-1542060748-10c28b62716f?q=80&w=800&auto=format&fit=crop',
}));

export default function ThemeOneWishListPage() {
	const [items, setItems] = useState<WishItem[]>(initialItems);

	const removeItem = (id: number) =>
		setItems((prev) => prev.filter((it) => it.id !== id));

	return (
		<>
			<Header01 />
			<CommonWishList />
			<Footer01 />
		</>
	);
}
