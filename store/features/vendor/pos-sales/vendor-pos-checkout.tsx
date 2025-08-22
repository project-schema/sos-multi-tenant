'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { sign } from '@/lib';
import { useState } from 'react';
import {
	useCreateSaleMutation,
	useSearchCustomersQuery,
} from './vendor-pos-sales.api-slice';
import { usePosSales } from './vendor-pos-sales.hook';

interface CheckoutProps {
	isOpen: boolean;
	onClose: () => void;
}

export function VendorPosCheckout({ isOpen, onClose }: CheckoutProps) {
	const [customerSearch, setCustomerSearch] = useState('');
	const [selectedCustomer, setSelectedCustomer] = useState<any>(null);
	const [paymentMethod, setPaymentMethod] = useState<
		'cash' | 'card' | 'mobile_banking' | 'bank_transfer'
	>('cash');
	const [paymentAmount, setPaymentAmount] = useState(0);
	const [invoiceNotes, setInvoiceNotes] = useState('');

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
	} = usePosSales();

	const { data: customersData } = useSearchCustomersQuery(
		{ search: customerSearch },
		{ skip: !customerSearch || customerSearch.length < 2 }
	);

	const [createSale, { isLoading: isCreatingSale }] = useCreateSaleMutation();

	const handleCustomerSelect = (customerId: string) => {
		const selected = customersData?.customers.find(
			(c) => c.id?.toString() === customerId
		);
		if (selected) {
			setSelectedCustomer(selected);
			setCustomer(selected);
		}
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

		if (paymentAmount < total) {
			alert('Payment amount must be equal to or greater than total');
			return;
		}

		try {
			const saleData = {
				customer: selectedCustomer,
				items: cart,
				payment: {
					method: paymentMethod,
					amount: paymentAmount,
				},
				invoice: {
					date: new Date().toISOString().split('T')[0],
					notes: invoiceNotes,
				},
				subtotal,
				discount,
				tax,
				total,
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
		<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
			<Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
				<CardContent className="p-6 space-y-6">
					<div className="flex justify-between items-center">
						<CardTitle>Checkout</CardTitle>
						<Button variant="outline" onClick={onClose}>
							Close
						</Button>
					</div>

					{/* Customer Selection */}
					<div className="space-y-2">
						<Label>Customer</Label>
						<div className="space-y-2">
							<Input
								placeholder="Search customers..."
								value={customerSearch}
								onChange={(e) => setCustomerSearch(e.target.value)}
							/>
							{customersData?.customers &&
								customersData.customers.length > 0 && (
									<Select onValueChange={handleCustomerSelect}>
										<SelectTrigger>
											<SelectValue placeholder="Select a customer" />
										</SelectTrigger>
										<SelectContent>
											{customersData.customers.map((customer) => (
												<SelectItem
													key={customer.id}
													value={customer.id?.toString() || ''}
												>
													{customer.customer_name} - {customer.phone}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								)}
							{selectedCustomer && (
								<div className="p-3 bg-muted rounded-md">
									<div className="font-medium">
										{selectedCustomer.customer_name}
									</div>
									<div className="text-sm text-muted-foreground">
										{selectedCustomer.phone}
									</div>
									{selectedCustomer.email && (
										<div className="text-sm text-muted-foreground">
											{selectedCustomer.email}
										</div>
									)}
								</div>
							)}
						</div>
					</div>

					{/* Payment Method */}
					<div className="space-y-2">
						<Label>Payment Method</Label>
						<Select
							value={paymentMethod}
							onValueChange={(value: any) => setPaymentMethod(value)}
						>
							<SelectTrigger>
								<SelectValue />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="cash">Cash</SelectItem>
								<SelectItem value="card">Card</SelectItem>
								<SelectItem value="mobile_banking">Mobile Banking</SelectItem>
								<SelectItem value="bank_transfer">Bank Transfer</SelectItem>
							</SelectContent>
						</Select>
					</div>

					{/* Payment Amount */}
					<div className="space-y-2">
						<Label>Payment Amount</Label>
						<Input
							type="number"
							value={paymentAmount}
							onChange={(e) =>
								setPaymentAmount(parseFloat(e.target.value) || 0)
							}
							placeholder="Enter payment amount"
						/>
						{paymentAmount > total && (
							<div className="text-sm text-muted-foreground">
								Change: {sign.tk} {(paymentAmount - total).toFixed(2)}
							</div>
						)}
					</div>

					{/* Invoice Notes */}
					<div className="space-y-2">
						<Label>Invoice Notes</Label>
						<Textarea
							value={invoiceNotes}
							onChange={(e) => setInvoiceNotes(e.target.value)}
							placeholder="Add any notes for the invoice..."
							rows={3}
						/>
					</div>

					{/* Order Summary */}
					<div className="space-y-2 border-t pt-4">
						<h3 className="font-medium">Order Summary</h3>
						<div className="space-y-1 text-sm">
							<div className="flex justify-between">
								<span>Subtotal:</span>
								<span>
									{sign.tk} {subtotal}
								</span>
							</div>
							<div className="flex justify-between">
								<span>Discount ({discount}%):</span>
								<span>
									-{sign.tk} {((subtotal * discount) / 100).toFixed(2)}
								</span>
							</div>
							<div className="flex justify-between">
								<span>Tax ({tax}%):</span>
								<span>
									{sign.tk}{' '}
									{((subtotal * (1 - discount / 100) * tax) / 100).toFixed(2)}
								</span>
							</div>
							<div className="flex justify-between font-bold text-lg border-t pt-2">
								<span>Total:</span>
								<span>
									{sign.tk} {total}
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
