'use client';

import { DbHeader } from '@/components/dashboard';
import { Button } from '@/components/ui/button';
import { SessionProvider } from '@/provider';
import { Printer } from 'lucide-react';
import { useMemo, useState } from 'react';

const breadcrumbItems = [
	{ name: 'Dashboard', path: '/dashboard' },
	{ name: 'Invoice Generate' },
];

/** Defaults — adjust as needed */
const BUSINESS = {
	name: 'Your business name',
	address: 'Street, City',
	phone: 'Phone number',
	email: 'email@example.com',
};

const INVOICE_META = {
	number: `INV-${new Date().getFullYear()}-1001`,
	date: new Date().toISOString().slice(0, 10),
	dueDate: '',
};

const BILL_TO = {
	name: 'Client name',
	details: 'Address / contact details',
};

const DISCOUNT_TK = 0;
const TAX_PERCENT = 0;
const NOTES = 'Thank you for your business.';

type Line = {
	id: string;
	description: string;
	qty: number;
	rate: number;
};

function createLine(): Line {
	return {
		id:
			typeof crypto !== 'undefined' && crypto.randomUUID
				? crypto.randomUUID()
				: `line-${Date.now()}-${Math.random().toString(36).slice(2)}`,
		description: '',
		qty: 1,
		rate: 0,
	};
}

export default function Page() {
	return (
		<SessionProvider>
			<DbHeader breadcrumb={breadcrumbItems} />
			<div className="px-4">
				<InvoiceGenerator />
			</div>
		</SessionProvider>
	);
}

function InvoiceGenerator() {
	const [lines, setLines] = useState<Line[]>(() => [createLine()]);

	const { subtotal, taxAmount, total } = useMemo(() => {
		const sub = lines.reduce((s, line) => s + line.qty * line.rate, 0);
		const afterDisc = Math.max(0, sub - DISCOUNT_TK);
		const tax = (afterDisc * TAX_PERCENT) / 100;
		return {
			subtotal: sub,
			taxAmount: tax,
			total: afterDisc + tax,
		};
	}, [lines]);

	const pruneTrailingEmptyDuplicate = (rows: Line[]): Line[] => {
		if (rows.length <= 1) return rows;
		let next = [...rows];
		while (
			next.length > 1 &&
			next[next.length - 1]?.description.trim() === '' &&
			next[next.length - 2]?.description.trim() === ''
		) {
			next = next.slice(0, -1);
		}
		return next;
	};

	const updateRow = (
		index: number,
		field: keyof Pick<Line, 'description' | 'qty' | 'rate'>,
		value: string | number
	) => {
		setLines((prev) => {
			const beforeDesc = prev[index]?.description.trim() ?? '';
			const row = { ...prev[index], [field]: value } as Line;
			let next = [...prev.slice(0, index), row, ...prev.slice(index + 1)];

			const typingIntoLastRow = index === prev.length - 1;
			const afterDesc =
				field === 'description' ? String(value).trim() : beforeDesc;
			const becameFilled =
				field === 'description' && beforeDesc === '' && afterDesc !== '';

			if (typingIntoLastRow && becameFilled) {
				next = [...next, createLine()];
			}

			if (field === 'description') {
				next = pruneTrailingEmptyDuplicate(next);
			}

			return next.length ? next : [createLine()];
		});
	};

	const removeRow = (index: number) => {
		setLines((prev) => {
			if (prev.length <= 1) return prev;
			const next = prev.filter((_, i) => i !== index);
			return next.length ? next : [createLine()];
		});
	};

	const handlePrint = () => window.print();

	return (
		<div className="pb-10">
			<div className="mb-6 flex justify-end print:hidden">
				<Button type="button" onClick={handlePrint}>
					<Printer className="size-4" />
					Print
				</Button>
			</div>

			<div
				id="invoice-print-area"
				className="max-w-4xl mx-auto rounded-lg border border-gray-300 bg-white p-6 shadow-sm print:mx-0 print:max-w-none print:border-0 print:p-4 print:shadow-none"
			>
				<div className="border-b-2 border-gray-300 pb-6 mb-6 print:border-gray-400">
					<div className="flex gap-6 justify-between items-start">
						<div className="min-w-0 flex-1 space-y-2">
							<p className="text-2xl font-bold text-gray-900">
								{BUSINESS.name}
							</p>
							<p className="whitespace-pre-wrap text-gray-700">
								{BUSINESS.address}
							</p>
							<p className="text-gray-700">{BUSINESS.phone}</p>
							<p className="text-gray-700">{BUSINESS.email}</p>
						</div>
						<div className="text-right space-y-3 md:min-w-[220px]">
							<h2 className="text-xl font-bold tracking-wide text-gray-800">
								INVOICE
							</h2>
							<div className="space-y-2 text-sm">
								<div className="flex flex-col items-end gap-0.5">
									<span className="text-gray-500">Invoice #</span>
									<span className="font-semibold">{INVOICE_META.number}</span>
								</div>
								<div className="flex flex-col items-end gap-0.5">
									<span className="text-gray-500">Date</span>
									<span>{INVOICE_META.date}</span>
								</div>
								{INVOICE_META.dueDate ? (
									<div className="flex flex-col items-end gap-0.5">
										<span className="text-gray-500">Due date</span>
										<span>{INVOICE_META.dueDate}</span>
									</div>
								) : null}
							</div>
						</div>
					</div>
				</div>

				<div className="mb-8 rounded border border-gray-300 p-4">
					<h3 className="mb-2 text-lg font-semibold text-gray-800">Bill to</h3>
					<p className="font-medium text-gray-900">{BILL_TO.name}</p>
					<p className="mt-2 whitespace-pre-wrap text-gray-700">
						{BILL_TO.details}
					</p>
				</div>

				<div className="mb-6 overflow-x-auto">
					<table className="w-full border-collapse border border-gray-300 text-sm">
						<thead>
							<tr className="bg-gray-100">
								<th className="border border-gray-300 px-2 py-2 text-center font-semibold w-12">
									#
								</th>
								<th className="border border-gray-300 px-3 py-2 text-left font-semibold">
									Description
								</th>
								<th className="border border-gray-300 px-3 py-2 text-right font-semibold w-24">
									Qty
								</th>
								<th className="border border-gray-300 px-3 py-2 text-right font-semibold w-28">
									Rate (৳)
								</th>
								<th className="border border-gray-300 px-3 py-2 text-right font-semibold w-32">
									Amount (৳)
								</th>
								<th className="border border-gray-300 px-2 py-2 w-[88px] print:hidden" />
							</tr>
						</thead>
						<tbody>
							{lines.map((line, index) => (
								<tr
									key={line.id}
									className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
								>
									<td className="border border-gray-300 px-2 py-2 text-center text-muted-foreground tabular-nums">
										{index + 1}
									</td>
									<td className="border border-gray-300 px-3 py-2">
										<input
											type="text"
											value={line.description}
											onChange={(e) =>
												updateRow(index, 'description', e.target.value)
											}
											className="w-full border-0 bg-transparent outline-none focus-visible:ring-1 focus-visible:ring-ring rounded px-0.5"
											placeholder="Description"
											contentEditable={true}
										/>
									</td>
									<td className="border border-gray-300 px-3 py-2">
										<input
											type="number"
											min={0}
											step={1}
											value={Number.isFinite(line.qty) ? line.qty : 0}
											onChange={(e) =>
												updateRow(index, 'qty', Number(e.target.value) || 0)
											}
											className="w-full border-0 bg-transparent text-right outline-none focus-visible:ring-1 focus-visible:ring-ring rounded px-0.5 tabular-nums"
										/>
									</td>
									<td className="border border-gray-300 px-3 py-2">
										<input
											type="number"
											min={0}
											step={0.01}
											value={Number.isFinite(line.rate) ? line.rate : 0}
											onChange={(e) =>
												updateRow(index, 'rate', Number(e.target.value) || 0)
											}
											className="w-full border-0 bg-transparent text-right outline-none focus-visible:ring-1 focus-visible:ring-ring rounded px-0.5 tabular-nums"
										/>
									</td>
									<td className="border border-gray-300 px-3 py-2 text-right font-medium tabular-nums">
										৳{(line.qty * line.rate).toFixed(2)}
									</td>
									<td className="border border-gray-300 px-2 py-2 text-center print:hidden">
										<Button
											type="button"
											variant="destructive"
											size="sm"
											onClick={() => removeRow(index)}
											disabled={lines.length <= 1}
										>
											Delete
										</Button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>

				<div className="mb-8 grid gap-8 md:grid-cols-2 print:grid-cols-1">
					<div className="space-y-2 print:hidden">
						<p className="text-sm font-medium">Notes</p>
						<p className="min-h-[100px] whitespace-pre-wrap rounded-md border border-dashed border-muted-foreground/30 p-3 text-sm text-muted-foreground">
							{NOTES}
						</p>
					</div>
					<div className="space-y-3 w-full max-w-sm md:justify-self-end md:col-start-2 print:max-w-none print:justify-self-stretch">
						<div className="flex justify-between gap-4 text-sm">
							<span className="text-gray-600">Subtotal</span>
							<span className="font-medium tabular-nums">
								৳{subtotal.toFixed(2)}
							</span>
						</div>
						<div className="flex justify-between gap-4 text-sm">
							<span className="text-gray-600">Discount</span>
							<span className="tabular-nums">৳{DISCOUNT_TK.toFixed(2)}</span>
						</div>
						<div className="flex justify-between gap-4 text-sm">
							<span className="text-gray-600">
								Tax ({TAX_PERCENT.toFixed(2)}%)
							</span>
							<span className="tabular-nums">৳{taxAmount.toFixed(2)}</span>
						</div>
						<hr className="border-gray-300" />
						<div className="flex justify-between items-center text-lg font-bold">
							<span>Total due</span>
							<span className="text-blue-600 tabular-nums">
								৳{total.toFixed(2)}
							</span>
						</div>
					</div>
				</div>

				<div className="hidden print:block border-t border-gray-300 pt-4 text-sm text-gray-700 whitespace-pre-wrap">
					{NOTES}
				</div>
			</div>

			<style jsx global>{`
				@media print {
					body {
						background: white !important;
					}
					@page {
						margin: 12mm;
					}
				}
			`}</style>
		</div>
	);
}
