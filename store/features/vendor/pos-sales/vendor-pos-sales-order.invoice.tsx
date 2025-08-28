'use client';

import { Container1 } from '@/components/dashboard';
import { CardTitle } from '@/components/ui/card';
import { timeFormat } from '@/lib';
import { useParams } from 'next/navigation';
import { useVendorPosSalesOrderShowQuery } from './vendor-pos-sales.api-slice';
import { iVendorPosSalesOrderShow } from './vendor-pos-sales.type';

function VendorPosSalesInvoice({ data }: { data: iVendorPosSalesOrderShow }) {
	const { logo, data: saleData } = data;

	// Format sale date
	const saleDate = saleData.sale_date;
	const invoiceTime = saleData.sale_date ? timeFormat(saleData.sale_date) : '';

	// Calculate totals
	const totalQty = saleData.total_qty || 0;
	const totalPrice = parseFloat(saleData.total_price) || 0;
	const discount = parseFloat(saleData.sale_discount) || 0;
	const paidAmount = parseFloat(saleData.paid_amount) || 0;
	const dueAmount = parseFloat(saleData.due_amount) || 0;
	const grandTotal = totalPrice - discount;

	return (
		<div className="max-w-4xl mx-auto border border-gray-300 rounded-lg p-4 bg-white print:p-0">
			{/* Header */}
			<div className="text-center border-b-2 border-gray-300 pb-4 mb-6">
				<div className="flex justify-between items-start mb-4">
					<div className="text-left">
						<h1 className="text-2xl font-bold text-gray-800">SALES INVOICE</h1>
						<p className="text-lg font-semibold text-blue-600">
							#{saleData.barcode}
						</p>
					</div>
					<div className="text-right">
						<p className="text-sm text-gray-600">Invoice Time:</p>
						<p className="font-medium">{invoiceTime}</p>
						<p className="text-sm text-gray-600 mt-2">Sale Date:</p>
						<p className="font-medium">{saleDate}</p>
					</div>
				</div>
			</div>

			{/* Bill Information */}
			<div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
				{/* Bill From */}
				<div className="border border-gray-300 rounded p-4">
					<h3 className="text-lg font-semibold text-gray-800 mb-3">
						Bill From:
					</h3>
					<div className="space-y-1">
						<p className="font-medium text-gray-900">
							{logo?.shop_name || 'Shop Name'}
						</p>
						<p className="text-gray-700">{logo?.address || 'Address'}</p>
						<p className="text-gray-700">{logo?.phone || 'Phone'}</p>
						<p className="text-gray-700">{logo?.email || 'Email'}</p>
					</div>
				</div>

				{/* Bill To */}
				<div className="border border-gray-300 rounded p-4">
					<h3 className="text-lg font-semibold text-gray-800 mb-3">Bill To:</h3>
					<div className="space-y-1">
						<p className="font-medium text-gray-900">
							{saleData.customer.customer_name}
						</p>
						<p className="text-gray-700">{saleData.customer.address}</p>
						<p className="text-gray-700">{saleData.customer.phone}</p>
						<p className="text-gray-700">{saleData.customer.email}</p>
					</div>
				</div>
			</div>

			{/* Products Table */}
			<div className="mb-6">
				<table className="w-full border-collapse border border-gray-300">
					<thead>
						<tr className="bg-gray-100">
							<th className="border border-gray-300 px-3 py-2 text-left font-semibold text-gray-800">
								Product Name
							</th>
							<th className="border border-gray-300 px-3 py-2 text-left font-semibold text-gray-800">
								Unit
							</th>
							<th className="border border-gray-300 px-3 py-2 text-left font-semibold text-gray-800">
								Size
							</th>
							<th className="border border-gray-300 px-3 py-2 text-left font-semibold text-gray-800">
								Qty
							</th>
							<th className="border border-gray-300 px-3 py-2 text-left font-semibold text-gray-800">
								Rate
							</th>
							<th className="border border-gray-300 px-3 py-2 text-left font-semibold text-gray-800">
								Subtotal
							</th>
						</tr>
					</thead>
					<tbody>
						{saleData.sale_details.map((item, index) => (
							<tr
								key={item.id}
								className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
							>
								<td className="border border-gray-300 px-3 py-2 font-medium">
									{item.product.name}
								</td>
								<td className="border border-gray-300 px-3 py-2">
									{item.unit.unit_name}
								</td>
								<td className="border border-gray-300 px-3 py-2">
									{item.size?.name || '-'}
								</td>
								<td className="border border-gray-300 px-3 py-2">{item.qty}</td>
								<td className="border border-gray-300 px-3 py-2">
									৳{parseFloat(item.rate).toFixed(2)}
								</td>
								<td className="border border-gray-300 px-3 py-2">
									৳{parseFloat(item.sub_total).toFixed(2)}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>

			{/* Summary Section */}
			<div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
				{/* Left side - Thank you message */}
				<div className="flex items-center">
					<p className="text-lg font-medium text-gray-700">
						Thank you for shopping with us
					</p>
				</div>

				{/* Right side - Totals */}
				<div className="space-y-2">
					<div className="flex justify-between items-center">
						<span className="font-medium text-gray-700">Total Qty:</span>
						<span className="font-semibold">{totalQty}</span>
					</div>
					<div className="flex justify-between items-center">
						<span className="font-medium text-gray-700">Total Price:</span>
						<span className="font-semibold">৳{totalPrice.toFixed(2)}</span>
					</div>
					<div className="flex justify-between items-center">
						<span className="font-medium text-gray-700">Discount:</span>
						<span className="font-semibold text-green-600">
							৳{discount.toFixed(2)}
						</span>
					</div>
					<hr className="border-gray-300" />
					<div className="flex justify-between items-center">
						<span className="text-lg font-semibold text-gray-800">
							Grand Total:
						</span>
						<span className="text-lg font-bold text-blue-600">
							৳{grandTotal.toFixed(2)}
						</span>
					</div>
					<div className="flex justify-between items-center">
						<span className="font-medium text-gray-700">Paid:</span>
						<span className="font-semibold text-green-600">
							৳{paidAmount.toFixed(2)}
						</span>
					</div>
					<div className="flex justify-between items-center">
						<span className="font-medium text-gray-700">Due Amount:</span>
						<span className="font-semibold text-red-600">
							৳{dueAmount.toFixed(2)}
						</span>
					</div>
				</div>
			</div>

			{/* Footer Section */}
			<div className="border-t-2 border-gray-300 pt-6">
				<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
					<div className="text-center">
						<p className="text-sm text-gray-600 mb-2">Sold by</p>
						<div className="h-16 border-2 border-dashed border-gray-400 rounded flex items-center justify-center">
							<span className="text-sm font-medium">{saleData.user.name}</span>
						</div>
					</div>
					<div className="text-center">
						<p className="text-sm text-gray-600 mb-2">Customer Signature</p>
						<div className="h-16 border-2 border-dashed border-gray-400 rounded"></div>
					</div>
					<div className="text-center">
						<p className="text-sm text-gray-600 mb-2">Invoice Number</p>
						<p className="font-semibold text-lg">{saleData.barcode}</p>
					</div>
				</div>

				{/* Powered by footer */}
				<div className="text-center pt-4 border-t border-gray-300">
					<p className="text-sm text-gray-500">
						Powered by startownstartup.net
					</p>
				</div>
			</div>

			{/* Print Styles */}
			<style jsx>{`
				@media print {
					body {
						margin: 0;
					}
					.print\\:p-0 {
						padding: 0 !important;
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
	// Fetch
	const { data, isLoading, isError } = useVendorPosSalesOrderShowQuery(
		{
			id: id?.toString() || '',
		},
		{
			skip: !id,
		}
	);

	return (
		<>
			<Container1
				isError={isError}
				isLoading={isLoading}
				header={<CardTitle>Sales Invoice</CardTitle>}
			>
				{data?.status && <VendorPosSalesInvoice data={data} />}
			</Container1>
		</>
	);
}
