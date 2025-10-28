'use client';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import Footer01 from '@/components/web/footer/01';
import Header01 from '@/components/web/header/01';
import { useMemo, useState } from 'react';

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

export default function CheckoutPage() {
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
			<section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
				<h1 className="text-3xl font-bold mb-6">Checkout</h1>
				<div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
					{/* Billing Details */}
					<div className="lg:col-span-8">
						<div className="border rounded-md p-5">
							<h2 className="text-lg font-bold mb-4">BILLING DETAILS</h2>
							<div className="space-y-5">
								<div>
									<label className="block text-sm font-medium mb-1">
										Full Name*
									</label>
									<Input
										placeholder="Your Name"
										value={form.name}
										onChange={(e) => setForm({ ...form, name: e.target.value })}
									/>
								</div>
								<div>
									<label className="block text-sm font-medium mb-1">
										Number*
									</label>
									<Input
										placeholder="01XXXXXXXXX"
										value={form.phone}
										onChange={(e) =>
											setForm({ ...form, phone: e.target.value })
										}
									/>
								</div>
								<div>
									<label className="block text-sm font-medium mb-1">
										Address*
									</label>
									<Input
										placeholder="Street address"
										value={form.address}
										onChange={(e) =>
											setForm({ ...form, address: e.target.value })
										}
									/>
								</div>
								<div>
									<label className="block text-sm font-medium mb-1">
										Order Notes
									</label>
									<Input
										placeholder="Notes about your order, e.g. special notes for delivery."
										value={form.notes}
										onChange={(e) =>
											setForm({ ...form, notes: e.target.value })
										}
									/>
								</div>
							</div>
						</div>
					</div>

					{/* Order Summary */}
					<aside className="lg:col-span-4">
						<div className="border rounded-md p-5 sticky top-4 space-y-4">
							<h2 className="text-lg font-bold">YOUR ORDER</h2>
							<div className="divide-y">
								{orderItems.map((it) => (
									<div
										key={it.id}
										className="py-3 flex items-start justify-between gap-3"
									>
										<div>
											<p className="text-sm font-medium leading-5">
												{it.title}
											</p>
											<p className="text-xs text-gray-500">Blue x {it.qty}</p>
										</div>
										<div className="text-sm font-semibold">{it.price}৳</div>
									</div>
								))}
							</div>
							<hr />
							<div className="space-y-2 text-sm">
								<div className="flex items-center justify-between">
									<span className="text-gray-600">Subtotal</span>
									<span className="font-semibold">{subtotal}৳</span>
								</div>
								<div className="flex items-center justify-between">
									<span className="text-gray-600">Discount</span>
									<span className="font-semibold">{discount}৳</span>
								</div>
								<div className="flex items-start justify-between">
									<span className="text-gray-600">Shipping</span>
									<div className="text-right">
										<div className="font-semibold">{shipping}৳</div>
										<div className="text-xs text-gray-500">
											Shipping to Dhaka
										</div>
										<button className="text-xs underline mt-1">
											Change Address
										</button>
									</div>
								</div>
								<hr />
								<div className="flex items-center justify-between text-base">
									<span className="font-semibold">Total</span>
									<span className="font-bold">{total}৳</span>
								</div>
								<div>
									<h3 className="text-sm font-semibold mb-2">Payment Method</h3>
									<div className="border rounded-md p-3 bg-gray-50 text-sm">
										Cash On Delivery
									</div>
								</div>
								<label className="flex items-center gap-2 text-sm">
									<Checkbox
										checked={agree}
										onCheckedChange={(v) => setAgree(Boolean(v))}
									/>
									<span>Accept Terms & Conditions</span>
								</label>
								<Button
									disabled={!agree}
									className="w-full h-11 bg-black text-white"
								>
									Place Order
								</Button>
							</div>
						</div>
					</aside>
				</div>
			</section>
			<Footer01 />
		</>
	);
}
