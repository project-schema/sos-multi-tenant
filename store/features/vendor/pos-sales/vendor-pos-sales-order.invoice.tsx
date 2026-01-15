'use client';

import { Container1 } from '@/components/dashboard';
import { Button } from '@/components/ui/button';
import { CardTitle } from '@/components/ui/card';
import { sign, timeFormat } from '@/lib';
import { Printer } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { useVendorPosSalesOrderShowQuery } from './vendor-pos-sales.api-slice';
import { iVendorPosSalesOrderShow } from './vendor-pos-sales.type';

// Thermal Print Component - Optimized for 58mm thermal printers
function VendorPosSalesThermalInvoice({
	data,
}: {
	data: iVendorPosSalesOrderShow;
}) {
	const { logo, data: saleData } = data;

	// Format sale date
	const saleDate = saleData.sale_date;
	const invoiceTime = saleData.sale_date ? timeFormat(saleData.sale_date) : '';

	// Calculate totals
	const totalQty = saleData.total_qty || 0;
	const totalPrice =
		saleData?.sale_details?.reduce(
			(sum, item) => sum + parseFloat(item.sub_total),
			0
		) || 0;
	const discount = parseFloat(saleData.sale_discount) || 0;
	const paidAmount = parseFloat(saleData.paid_amount) || 0;
	const dueAmount = parseFloat(saleData.due_amount) || 0;
	const grandTotal = totalPrice - discount;

	return (
		<div className="w-[58mm] mx-auto bg-white text-black font-mono text-xs leading-tight p-2">
			{/* Header */}
			<div className="text-center border-b border-black pb-2 mb-2">
				<div className="text-center">
					<h1 className="text-sm font-bold">SALES INVOICE</h1>
					<p className="text-xs font-semibold">#{saleData.barcode}</p>
					<p className="text-xs">{invoiceTime}</p>
					<p className="text-xs">{saleDate}</p>
				</div>
			</div>

			{/* Shop Info */}
			<div className="mb-2">
				<p className="font-bold text-xs">{logo?.shop_name || 'Shop Name'}</p>
				<p className="text-xs">{logo?.address || 'Address'}</p>
				<p className="text-xs">{logo?.phone || 'Phone'}</p>
				<p className="text-xs">{logo?.email || 'Email'}</p>
			</div>

			{/* Customer Info */}
			<div className="mb-2">
				<p className="font-bold text-xs">Bill To:</p>
				<p className="text-xs">{saleData.customer.customer_name}</p>
				<p className="text-xs">{saleData.customer.address}</p>
				<p className="text-xs">{saleData.customer.phone}</p>
				<p className="text-xs">{saleData.customer.email}</p>
			</div>

			{/* Products Table */}
			<div className="mb-2">
				<table className="w-full text-xs">
					<thead>
						<tr className="border-b border-black">
							<th className="text-left py-1 text-xs">Item</th>
							<th className="text-right py-1 text-xs">Qty</th>
							<th className="text-right py-1 text-xs">Rate</th>
							<th className="text-right py-1 text-xs">Total</th>
						</tr>
					</thead>
					<tbody>
						{saleData.sale_details.map((item, index) => (
							<tr key={item.id} className="border-b border-gray-300">
								<td className="py-1 text-xs">
									<div className="font-medium">{item.product.name}</div>
									<div className="text-xs text-gray-600">
										{item.unit.unit_name}{' '}
										{item.size?.name && `(${item.size.name})`}
									</div>
								</td>
								<td className="py-1 text-right text-xs">{item.qty}</td>
								<td className="py-1 text-right text-xs">
									{parseFloat(item.rate).toFixed(2)}
								</td>
								<td className="py-1 text-right text-xs">
									{parseFloat(item.sub_total).toFixed(2)}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>

			{/* Summary */}
			<div className="border-t border-black pt-2">
				<div className="space-y-1">
					<div className="flex justify-between text-xs">
						<span>Total Qty:</span>
						<span className="font-bold">{totalQty}</span>
					</div>
					<div className="flex justify-between text-xs">
						<span>Total Price:</span>
						<span>
							{totalPrice.toFixed(2)} {sign.tk}
						</span>
					</div>
					<div className="flex justify-between text-xs">
						<span>Discount:</span>
						<span className="text-green-600">
							{discount.toFixed(2)} {sign.percent}
						</span>
					</div>
					<div className="border-t border-black pt-1">
						<div className="flex justify-between font-bold text-xs">
							<span>Grand Total:</span>
							<span>
								{saleData?.total_price || 0} {sign.tk}
							</span>
						</div>
					</div>
					<div className="flex justify-between text-xs">
						<span>Paid:</span>
						<span className="text-green-600">
							{paidAmount.toFixed(2)} {sign.tk}
						</span>
					</div>
					<div className="flex justify-between text-xs">
						<span>Due Amount:</span>
						<span className="text-red-600">
							{dueAmount.toFixed(2)} {sign.tk}
						</span>
					</div>
					{saleData?.change_amount && (
						<div className="flex justify-between text-xs">
							<span>Change Amount:</span>
							<span className="text-green-600">
								{saleData?.change_amount || 0} {sign.tk}
							</span>
						</div>
					)}
				</div>
			</div>

			{/* Thank you message */}
			<div className="text-center mt-2 pb-2 border-t border-black pt-2">
				<p className="text-xs font-bold">Thank you for shopping with us</p>
				<p className="text-xs mt-1">Sold by: {saleData.user.name}</p>
			</div>

			{/* Footer */}
			<div className="text-center mt-2 pt-2 border-t border-black">
				<p className="text-xs text-gray-600">Powered by startownstartup.net</p>
			</div>

			{/* Thermal Print Styles */}
			<style jsx>{`
				@media print {
					@page {
						size: 58mm auto;
						margin: 0;
					}
					body {
						margin: 0;
						padding: 0;
					}
					.w-\\[58mm\\] {
						width: 58mm !important;
						max-width: 58mm !important;
					}
				}
			`}</style>
		</div>
	);
}

function VendorPosSalesInvoice({ data }: { data: iVendorPosSalesOrderShow }) {
	const { logo, data: saleData } = data;

	// Format sale date
	const saleDate = saleData.sale_date;
	const invoiceTime = saleData.sale_date ? timeFormat(saleData.sale_date) : '';

	// Calculate totals
	const totalQty = saleData.total_qty || 0;
	const totalPrice =
		saleData?.sale_details?.reduce(
			(sum, item) => sum + parseFloat(item.sub_total),
			0
		) || 0;
	const discount = parseFloat(saleData.sale_discount) || 0;
	const paidAmount = parseFloat(saleData.paid_amount) || 0;
	const dueAmount = parseFloat(saleData.due_amount) || 0;
	const grandTotal = totalPrice - discount;

	return (
		<div className="max-w-4xl mx-auto border   border-gray-300 rounded-lg p-4 bg-white print:p-0 print:max-w-none print:w-auto print:border-none">
			{/* Header */}
			<div className="text-center border-b-2 border-gray-300 pb-4 mb-6 print:text-center print:pb-2 print:mb-4">
				<div className="flex justify-between items-start mb-4 print:block print:mb-2">
					<div className="text-left print:text-center">
						<h1 className="text-2xl font-bold text-gray-800 print:text-lg">
							SALES INVOICE
						</h1>
						<p className="text-lg font-semibold text-blue-600 print:text-sm">
							#{saleData.barcode}
						</p>
					</div>
					<div className="text-right print:text-center print:mt-1">
						<p className="text-sm text-gray-600 print:text-xs">Invoice Time:</p>
						<p className="font-medium print:text-xs">{invoiceTime}</p>
						<p className="text-sm text-gray-600 mt-2 print:text-xs print:mt-0">
							Sale Date:
						</p>
						<p className="font-medium print:text-xs">{saleDate}</p>
					</div>
				</div>
			</div>

			{/* Bill Information */}
			<div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 print:block print:space-y-4 print:mb-4 print:gap-0">
				{/* Bill From */}
				<div className="border border-gray-300 rounded p-4 print:border-none print:p-2 print:rounded-none">
					<h3 className="text-lg font-semibold text-gray-800 mb-3 print:text-sm print:mb-1">
						Bill From:
					</h3>
					<div className="space-y-1 print:space-y-0">
						<p className="font-medium text-gray-900 print:text-xs">
							{logo?.shop_name || 'Shop Name'}
						</p>
						<p className="text-gray-700 print:text-xs">
							{logo?.address || 'Address'}
						</p>
						<p className="text-gray-700 print:text-xs">
							{logo?.phone || 'Phone'}
						</p>
						<p className="text-gray-700 print:text-xs">
							{logo?.email || 'Email'}
						</p>
					</div>
				</div>

				{/* Bill To */}
				<div className="border border-gray-300 rounded p-4 print:border-none print:p-2 print:rounded-none">
					<h3 className="text-lg font-semibold text-gray-800 mb-3 print:text-sm print:mb-1">
						Bill To:
					</h3>
					<div className="space-y-1 print:space-y-0">
						<p className="font-medium text-gray-900 print:text-xs">
							{saleData.customer.customer_name}
						</p>
						<p className="text-gray-700 print:text-xs">
							{saleData.customer.address}
						</p>
						<p className="text-gray-700 print:text-xs">
							{saleData.customer.phone}
						</p>
						<p className="text-gray-700 print:text-xs">
							{saleData.customer.email}
						</p>
					</div>
				</div>
			</div>

			{/* Products Table */}
			<div className="mb-6 print:mb-4">
				<table className="w-full border-collapse border border-gray-300 print:border-gray-600 print:text-xs">
					<thead>
						<tr className="bg-gray-100 print:bg-white">
							<th className="border border-gray-300 px-3 py-2 text-left font-semibold text-gray-800 print:px-1 print:py-1 print:text-xs print:border-gray-600">
								Product
							</th>
							<th className="border border-gray-300 px-3 py-2 text-left font-semibold text-gray-800 print:px-1 print:py-1 print:text-xs print:border-gray-600">
								Unit
							</th>
							<th className="border border-gray-300 px-3 py-2 text-left font-semibold text-gray-800 print:px-1 print:py-1 print:text-xs print:border-gray-600">
								Size
							</th>
							<th className="border border-gray-300 px-3 py-2 text-left font-semibold text-gray-800 print:px-1 print:py-1 print:text-xs print:border-gray-600">
								Qty
							</th>
							<th className="border border-gray-300 px-3 py-2 text-left font-semibold text-gray-800 print:px-1 print:py-1 print:text-xs print:border-gray-600">
								Rate
							</th>
							<th className="border border-gray-300 px-3 py-2 text-left font-semibold text-gray-800 print:px-1 print:py-1 print:text-xs print:border-gray-600">
								Total
							</th>
						</tr>
					</thead>
					<tbody>
						{saleData.sale_details.map((item, index) => (
							<tr
								key={item.id}
								className={
									index % 2 === 0 ? 'bg-white' : 'bg-gray-50 print:bg-white'
								}
							>
								<td className="border border-gray-300 px-3 py-2 font-medium print:px-1 print:py-1 print:text-xs print:border-gray-600">
									{item.product.name}
								</td>
								<td className="border border-gray-300 px-3 py-2 print:px-1 print:py-1 print:text-xs print:border-gray-600">
									{item.unit.unit_name}
								</td>
								<td className="border border-gray-300 px-3 py-2 print:px-1 print:py-1 print:text-xs print:border-gray-600">
									{item.size?.name || '-'}
								</td>
								<td className="border border-gray-300 px-3 py-2 print:px-1 print:py-1 print:text-xs print:border-gray-600">
									{item.qty}
								</td>
								<td className="border border-gray-300 px-3 py-2 print:px-1 print:py-1 print:text-xs print:border-gray-600">
									{parseFloat(item.rate).toFixed(2)}
								</td>
								<td className="border border-gray-300 px-3 py-2 print:px-1 print:py-1 print:text-xs print:border-gray-600">
									{parseFloat(item.sub_total).toFixed(2)}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>

			{/* Summary Section */}
			<div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 print:block print:space-y-2 print:mb-4 print:gap-0">
				{/* Left side - Thank you message */}
				<div className="flex items-center print:justify-center print:mb-2">
					<p className="text-lg font-medium text-gray-700 print:text-sm">
						Thank you for shopping with us
					</p>
				</div>

				{/* Right side - Totals */}
				<div className="space-y-2 print:space-y-1">
					<div className="flex justify-between items-center">
						<span className="font-medium text-gray-700 print:text-xs">
							Total Qty:
						</span>
						<span className="font-semibold print:text-xs">{totalQty}</span>
					</div>
					<div className="flex justify-between items-center">
						<span className="font-medium text-gray-700 print:text-xs">
							Total Price:
						</span>
						<span className="font-semibold print:text-xs">
							{totalPrice.toFixed(2)} {sign.tk}
						</span>
					</div>
					<div className="flex justify-between items-center">
						<span className="font-medium text-gray-700 print:text-xs">
							Discount:
						</span>
						<span className="font-semibold text-green-600 print:text-xs">
							{discount.toFixed(2)} {sign.percent}
						</span>
					</div>
					<hr className="border-gray-300 print:border-gray-600" />
					<div className="flex justify-between items-center">
						<span className="text-lg font-semibold text-gray-800 print:text-sm">
							Grand Total:
						</span>
						<span className="text-lg font-bold text-blue-600 print:text-sm">
							{saleData?.total_price || 0} {sign.tk}
						</span>
					</div>
					<div className="flex justify-between items-center">
						<span className="font-medium text-gray-700 print:text-xs">
							Paid:
						</span>
						<span className="font-semibold text-green-600 print:text-xs">
							{paidAmount.toFixed(2)} {sign.tk}
						</span>
					</div>
					<div className="flex justify-between items-center">
						<span className="font-medium text-gray-700 print:text-xs">
							Due Amount:
						</span>
						<span className="font-semibold text-red-600 print:text-xs">
							{dueAmount.toFixed(2)} {sign.tk}
						</span>
					</div>
					{saleData?.change_amount && (
						<div className="flex justify-between items-center">
							<span className="font-medium text-gray-700 print:text-xs">
								Change Amount:
							</span>
							<span className="font-semibold text-green-600 print:text-xs">
								{saleData?.change_amount || 0} {sign.tk}
							</span>
						</div>
					)}
				</div>
			</div>

			{/* Footer Section */}
			<div className="border-t-2 border-gray-300 pt-6 print:border-t print:pt-2 print:border-gray-600">
				<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6 print:block print:space-y-2 print:mb-2 print:gap-0">
					<div className="text-center print:text-left">
						<p className="text-sm text-gray-600 mb-2 print:text-xs print:mb-1">
							Sold by
						</p>
						<div className="h-16 border-2 border-dashed border-gray-400 rounded flex items-center justify-center print:h-8 print:border print:text-xs">
							<span className="text-sm font-medium print:text-xs">
								{saleData.user.name}
							</span>
						</div>
					</div>
					<div className="text-center print:text-left">
						<p className="text-sm text-gray-600 mb-2 print:text-xs print:mb-1">
							Customer Signature
						</p>
						<div className="h-16 border-2 border-dashed border-gray-400 rounded print:h-8 print:border"></div>
					</div>
					<div className="text-center print:text-left">
						<p className="text-sm text-gray-600 mb-2 print:text-xs print:mb-1">
							Invoice Number
						</p>
						<p className="font-semibold text-lg print:text-sm">
							{saleData.barcode}
						</p>
					</div>
				</div>

				{/* Powered by footer */}
				<div className="text-center pt-4 border-t border-gray-300 print:pt-2 print:border-t print:border-gray-600">
					<p className="text-sm text-gray-500 print:text-xs">
						Powered by startownstartup.net
					</p>
				</div>
			</div>

			{/* Print Styles */}
			<style jsx>{`
				@media print {
					body {
						margin: 0;
						font-family: 'Courier New', monospace;
					}
					.print\\:p-0 {
						padding: 0 !important;
					}

					/* POS 58mm thermal printer styles */
					@media (max-width: 58mm) {
						.max-w-4xl {
							max-width: 58mm !important;
							width: 58mm !important;
						}

						/* Header adjustments */
						.text-2xl {
							font-size: 12px !important;
						}
						.text-lg {
							font-size: 10px !important;
						}
						.text-sm {
							font-size: 8px !important;
						}
						.text-xs {
							font-size: 7px !important;
						}

						/* Grid to single column */
						.grid-cols-1.md\\:grid-cols-2 {
							display: block !important;
						}
						.grid-cols-1.md\\:grid-cols-3 {
							display: block !important;
						}

						/* Compact spacing */
						.mb-4,
						.mb-6,
						.mb-8 {
							margin-bottom: 4px !important;
						}
						.pb-4 {
							padding-bottom: 4px !important;
						}
						.pt-6 {
							padding-top: 4px !important;
						}
						.space-y-1 > * + * {
							margin-top: 2px !important;
						}
						.space-y-2 > * + * {
							margin-top: 2px !important;
						}
						.gap-8 {
							gap: 4px !important;
						}
						.gap-6 {
							gap: 4px !important;
						}

						/* Table adjustments for narrow width */
						table {
							font-size: 8px !important;
							width: 100% !important;
							page-break-inside: avoid;
						}
						th,
						td {
							padding: 2px 4px !important;
							font-size: 7px !important;
						}

						/* Border adjustments */
						.border-2 {
							border-width: 1px !important;
						}
						.border-t-2,
						.border-b-2 {
							border-width: 1px !important;
						}

						/* Hide unnecessary elements for POS */
						.print\\:hidden {
							display: none !important;
						}
					}

					table {
						page-break-inside: avoid;
					}
					tr {
						page-break-inside: avoid;
						page-break-after: auto;
					}
					thead {
						display: table-header-group;
					}
					tfoot {
						display: table-footer-group;
					}
				}
			`}</style>
		</div>
	);
}

export function VendorPosSalesOrderInvoicePage() {
	const { id } = useParams();
	const [isThermalPrint, setIsThermalPrint] = useState(false);

	// Fetch
	const { data, isLoading, isError } = useVendorPosSalesOrderShowQuery(
		{
			id: id?.toString() || '',
		},
		{
			skip: !id,
		}
	);

	const handleThermalPrint = () => {
		setIsThermalPrint(true);
		// Use setTimeout to ensure state update before printing
		setTimeout(() => {
			window.print();
			setIsThermalPrint(false);
		}, 100);
	};

	const handleWebPrint = () => {
		window.print();
	};

	// If thermal printing, show only the thermal component
	if (isThermalPrint) {
		return (
			<div className="min-h-screen bg-white p-4">
				{data?.status && <VendorPosSalesThermalInvoice data={data} />}
			</div>
		);
	}

	return (
		<>
			<Container1
				isError={isError}
				isLoading={isLoading}
				header={
					<div className="flex justify-between items-center">
						<CardTitle>Sales Invoice</CardTitle>
						{data?.status && (
							<div className="flex gap-2">
								<Button
									onClick={handleWebPrint}
									variant="outline"
									size="sm"
									className="flex items-center gap-2 print:hidden"
								>
									<Printer className="w-4 h-4" />
									Web Print
								</Button>
								<Button
									onClick={handleThermalPrint}
									variant="default"
									size="sm"
									className="flex items-center gap-2 print:hidden"
								>
									<Printer className="w-4 h-4" />
									Thermal Print
								</Button>
							</div>
						)}
					</div>
				}
			>
				{data?.status && <VendorPosSalesInvoice data={data} />}
			</Container1>
		</>
	);
}
