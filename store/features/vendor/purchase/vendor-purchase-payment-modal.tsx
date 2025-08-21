'use client';

import { Loader5 } from '@/components/dashboard';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import {
	DropdownMenuItem,
	DropdownMenuShortcut,
} from '@/components/ui/dropdown-menu';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { alertConfirm } from '@/lib';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { AlertCircle, CreditCard, LoaderCircle } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { useVendorPaymentMethodsQuery } from '../payment-methods/vendor-payment-methods-api-slice';
import { useVendorPurchaseAddPaymentMutation } from './vendor-purchase-api-slice';
import { iVendorPurchase } from './vendor-purchase-type';

//  Zod Schema
const couponSchema = z.object({
	payment_method_id: z.string().min(1, 'Payment method is required'),
	amount: z.string().min(1, 'Amount is required'),
});

type ZodType = z.infer<typeof couponSchema>;

//  Component
export function VendorPurchasePaymentModal({
	data,
}: {
	data: iVendorPurchase;
}) {
	const [open, setOpen] = useState(false);

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DropdownMenuItem
				variant="default"
				asChild
				onSelect={(e) => e.preventDefault()}
			>
				<DialogTrigger className="flex items-center gap-2 w-full">
					<DropdownMenuShortcut className="ml-0">
						<CreditCard className="size-4" />
					</DropdownMenuShortcut>
					Add Payment
				</DialogTrigger>
			</DropdownMenuItem>

			<DialogContent className={cn('sm:max-w-xl w-full')}>
				<DialogHeader>
					<DialogTitle>Add Payment</DialogTitle>
					<DialogDescription>
						Add payment for purchase #{data.chalan_no}
					</DialogDescription>
				</DialogHeader>

				<FORM setOpen={setOpen} editData={data} />
			</DialogContent>
		</Dialog>
	);
}

const FORM = ({
	setOpen,
	editData,
}: {
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	editData: iVendorPurchase;
}) => {
	const [alertError, setAlertError] = useState<string | null>(null);
	const [update, { isLoading }] = useVendorPurchaseAddPaymentMutation();
	const { data, isLoading: paymentLoading } = useVendorPaymentMethodsQuery({
		page: '',
	});

	const form = useForm<ZodType>({
		resolver: zodResolver(couponSchema),
		defaultValues: {
			payment_method_id: '',
			amount: editData?.due_amount || '',
		},
	});

	useEffect(() => {
		form.reset({
			payment_method_id: '',
			amount: editData?.due_amount || '',
		});
	}, [editData]);

	const onSubmit = async (data: ZodType) => {
		if (alertError) {
			setAlertError(null);
		}
		alertConfirm({
			onOk: async () => {
				try {
					const response = await update({
						id: editData.id,
						payment_method_id: data.payment_method_id,
						amount: data.amount,
					}).unwrap();

					if (response?.status === 200) {
						toast.success(response.message || 'Update successfully');
						form.reset();
						setOpen(false);
					} else {
						const errorResponse = response as any;
						if (typeof errorResponse.data === 'object') {
							Object.entries(errorResponse.data).forEach(([field, value]) => {
								form.setError(field as keyof ZodType, {
									type: 'server',
									message: (value as string[])[0],
								});
							});
						} else {
							toast.error(response.message || 'Something went wrong');
						}
					}
					if (response?.status === 400) {
						setAlertError(response.message || 'Something went wrong');
					}
				} catch (error: any) {
					if (error?.status === 400 && typeof error.message === 'object') {
						Object.entries(error.message).forEach(([field, value]) => {
							form.setError(field as keyof ZodType, {
								type: 'server',
								message: (value as string[])[0],
							});
						});
					} else {
						toast.error('Something went wrong');
					}
				}
			},
		});
	};

	if (paymentLoading) {
		return <Loader5 />;
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
				{/* Message */}
				<FormField
					control={form.control}
					name="payment_method_id"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Payment Method</FormLabel>
							<FormControl>
								<Select
									onValueChange={field.onChange}
									defaultValue={field.value}
								>
									<FormControl>
										<SelectTrigger className="w-full">
											<SelectValue placeholder="Select payment method" />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										{data?.data?.map((item) => (
											<SelectItem key={item.id} value={item.id.toString()}>
												{item.payment_method_name}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				{/* Amount */}
				<FormField
					control={form.control}
					name="amount"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Amount</FormLabel>
							<FormControl>
								<Input
									{...field}
									placeholder="Enter amount"
									type="number"
									onWheel={(e) => e.currentTarget.blur()}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				{alertError && (
					<Alert className="border-amber-500/50 text-amber-500 dark:border-amber-500 [&>svg]:text-amber-500">
						<AlertCircle className="h-4 w-4" />
						<AlertTitle>Payment Failed</AlertTitle>
						<AlertDescription className="text-amber-500">
							{alertError}
						</AlertDescription>
					</Alert>
				)}

				<Button type="submit" className="w-full">
					{isLoading && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
					{isLoading ? 'Submitting...' : 'Submit'}
				</Button>
			</form>
		</Form>
	);
};
