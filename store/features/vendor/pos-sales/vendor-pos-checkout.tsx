'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { SelectSearch } from '@/components/ui/searchable-select';
import { sign } from '@/lib';
import { useState } from 'react';
import { useCreateSaleMutation } from './vendor-pos-sales.api-slice';
import { usePosSales } from './vendor-pos-sales.hook';
import { iVendorPosSalesResponse } from './vendor-pos-sales.type';

interface CheckoutProps {
	isOpen: boolean;
	onClose: () => void;
	data?: iVendorPosSalesResponse;
}

export function VendorPosCheckout({ isOpen, onClose, data }: CheckoutProps) {
	const [selectedCustomer, setSelectedCustomer] = useState<any>(null);
	const [orderSource, setOrderSource] = useState<string>('');
	const [paymentMethod, setPaymentMethod] = useState<string>('');
	const [paymentAmount, setPaymentAmount] = useState(0);

	const {
		cart,
		customer,
		subtotal,
		discount,
		tax,
		total,
		setCustomer,
		setPayment,
		resetPosSales,
		setDiscount,
	} = usePosSales();

	const [createSale, { isLoading: isCreatingSale }] = useCreateSaleMutation();

	// Calculate totals
	const totalQty = cart.reduce((sum, item) => sum + (item.quantity || 0), 0);
	const totalPrice = subtotal;
	const grandTotal = total < 0 ? 0 : total;
	const dueAmount = Math.max(0, grandTotal - paymentAmount);
	const changeAmount = Math.max(0, paymentAmount - grandTotal);

	const handleCustomerSelect = (customerId: string) => {
		setSelectedCustomer(customerId);
		setCustomer(customerId as any);
	};

	const handleCheckout = async () => {
		if (cart.length === 0) {
			alert('Cart is empty');
			return;
		}

		if (!selectedCustomer) {
			alert('Please select a customer');
			return;
		}

		if (paymentAmount < grandTotal) {
			alert('Payment amount must be equal to or greater than grand total');
			return;
		}

		try {
			const saleData = {
				customer: selectedCustomer,
				orderSource,
				items: cart,
				payment: {
					method: paymentMethod,
					amount: paymentAmount,
				},
				invoice: {
					date: new Date().toISOString().split('T')[0],
				},
				subtotal,
				discount,
				tax,
				total: grandTotal,
				totalQty,
				dueAmount,
				changeAmount,
			};

			const result = await createSale(saleData).unwrap();

			// Reset the POS state after successful sale
			resetPosSales();

			// Close the checkout modal
			onClose();

			// Show success message
			alert(`Sale completed successfully! Invoice: ${result.data.invoice_no}`);
		} catch (error) {
			console.error('Error creating sale:', error);
			alert('Failed to create sale. Please try again.');
		}
	};

	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 bg-black/75 bg-opacity-50 flex items-center justify-center z-50">
			<Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
				<CardContent className="p-6 space-y-6">
					<div className="flex justify-between items-center">
						<CardTitle>Checkout</CardTitle>
						<Button variant="outline" onClick={onClose}>
							Close
						</Button>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						{/* Customer Selection */}
						<div className="space-y-2">
							<Label>Customer</Label>
							<SelectSearch
								value={selectedCustomer}
								options={
									data?.data?.customer?.map((customer) => ({
										label: customer.customer_name,
										value: customer.id.toString(),
									})) ?? []
								}
								placeholder="Select Customer"
								onSelectorClick={(value) => {
									handleCustomerSelect(value.value);
								}}
							/>
						</div>

						{/* Order Source */}
						<div className="space-y-2">
							<Label>Order Source</Label>
							<SelectSearch
								value={orderSource}
								options={
									data?.data?.resource?.map((item) => ({
										label: item.name,
										value: item.id.toString(),
									})) ?? []
								}
								placeholder="Select Order Source"
								onSelectorClick={(value) => {
									setOrderSource(value.value);
								}}
							/>
						</div>

						{/* Payment Method */}
						<div className="space-y-2">
							<Label>Payment Method</Label>
							<SelectSearch
								value={paymentMethod}
								options={
									data?.data?.payment_methods?.map((item) => ({
										label: item.payment_method_name,
										value: item.id.toString(),
									})) ?? []
								}
								placeholder="Select Payment Method"
								onSelectorClick={(value) => {
									setPaymentMethod(value.value);
								}}
							/>
						</div>

						{/* Sale Discount */}
						<div className="space-y-2">
							<Label>Sale Discount</Label>
							<Input
								type="number"
								value={discount}
								onChange={(e) => setDiscount(parseFloat(e.target.value) || 0)}
								placeholder="Enter sale discount"
								className="pr-3"
								onWheel={(e) => {
									(e.target as HTMLInputElement).blur();
								}}
							/>
						</div>

						{/* Payment Amount */}
						<div className="space-y-2">
							<Label>Paid Amount</Label>
							<Input
								type="number"
								value={paymentAmount}
								onChange={(e) =>
									setPaymentAmount(parseFloat(e.target.value) || 0)
								}
								placeholder="Enter paid amount"
								className="pr-3"
								onWheel={(e) => {
									(e.target as HTMLInputElement).blur();
								}}
							/>
						</div>
					</div>

					{/* Order Summary */}
					<div className="space-y-2 border-t pt-4">
						<h3 className="font-medium">Order Summary</h3>
						<div className="space-y-1 text-sm">
							<div className="flex justify-between border-b pb-2">
								<span>Total Qty:</span>
								<span>{totalQty}</span>
							</div>
							<div className="flex justify-between border-b pb-2">
								<span>Total Price:</span>
								<span>
									{sign.tk} {totalPrice.toFixed(2)}
								</span>
							</div>
							<div className="flex justify-between border-b pb-2">
								<span>Sale Discount ({discount}%):</span>
								<span>
									-{sign.tk} {((subtotal * discount) / 100).toFixed(2)}
								</span>
							</div>
							{/* <  */}
							<div className="flex justify-between font-bold text-lg">
								<span>Grand Total:</span>
								<span>
									{sign.tk} {grandTotal.toFixed(2)}
								</span>
							</div>
							<div className="flex justify-between border-b pb-2">
								<span>Paid Amount:</span>
								<span>
									{sign.tk} {paymentAmount.toFixed(2)}
								</span>
							</div>
							<div className="flex justify-between border-b pb-2">
								<span>Due Amount:</span>
								<span>
									{sign.tk} {dueAmount.toFixed(2)}
								</span>
							</div>
							<div className="flex justify-between	">
								<span>Change Amount:</span>
								<span>
									{sign.tk} {changeAmount.toFixed(2)}
								</span>
							</div>
						</div>
					</div>

					{/* Action Buttons */}
					<div className="flex space-x-2">
						<Button variant="outline" onClick={onClose} className="flex-1">
							Cancel
						</Button>
						<Button
							onClick={handleCheckout}
							disabled={
								isCreatingSale || cart.length === 0 || !selectedCustomer
							}
							className="flex-1"
						>
							{isCreatingSale ? 'Processing...' : 'Complete Sale'}
						</Button>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
