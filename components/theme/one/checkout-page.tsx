'use client';

import Footer01 from '@/components/web/footer/01';
import Header01 from '@/components/web/header/01';
import { useMemo, useState } from 'react';
import Checkout from '../common/checkout';

const orderItems = [
	{
		id: 1,
		title: 'Premium 100% Cotton Panjabi – Navy Blue',
		qty: 2,
		price: 507,
	},
	{
		id: 2,
		title: 'Premium 100% Cotton Panjabi – Navy Blue',
		qty: 2,
		price: 507,
	},
];

export default function ThemeOneCheckoutPage() {
	const [form, setForm] = useState({
		name: '',
		phone: '',
		address: '',
		notes: '',
	});
	const [agree, setAgree] = useState(false);
	const [shipping] = useState(80);
	const [discount] = useState(50);

	const subtotal = useMemo(
		() => orderItems.reduce((s, it) => s + it.price, 0),
		[]
	);
	const total = subtotal - discount + shipping;

	return (
		<>
			<Header01 />
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
				<Checkout />
			</div>
			<Footer01 />
		</>
	);
}
