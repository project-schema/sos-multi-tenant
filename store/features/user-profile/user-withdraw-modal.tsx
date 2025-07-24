'use client';

import { useState } from 'react';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoaderCircle, Plus } from 'lucide-react';
import {
	useAllBanksQuery,
	useUserWithdrawMutation,
} from './user-profile-api-slice';
import { alertConfirm } from '@/lib';
import { toast } from 'sonner';
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import Link from 'next/link';

// ✅ Schema
const withdrawSchema = z.object({
	bank_name: z.string().min(1, 'Bank name is required'),
	holder_name: z.string().min(1, 'Account holder name is required'),
	ac_or_number: z.string().min(1, 'Account or number is required'),
	branch_name: z.string().optional(),
	amount: z
		.string()
		.min(1, 'Amount is required')
		.refine((val) => Number(val) > 0, {
			message: 'Amount must be a positive number',
		}),
});

export type WithdrawFormValues = z.infer<typeof withdrawSchema>;

export function UserWithdrawModal() {
	const { data: allBanks, isLoading: isLoadingBanks } =
		useAllBanksQuery(undefined);
	const [isOpen, setIsOpen] = useState(false);
	const [mutate, { isLoading }] = useUserWithdrawMutation();

	const form = useForm<WithdrawFormValues>({
		resolver: zodResolver(withdrawSchema),
		defaultValues: {
			bank_name: '',
			holder_name: '',
			ac_or_number: '',
			branch_name: '',
			amount: '',
		},
	});

	const onSubmit = (values: WithdrawFormValues) => {
		alertConfirm({
			onOk: async () => {
				try {
					const response = await mutate(values).unwrap();
					if (response.message === 'Balance not available!') {
						toast.error(response.message);
						form.setError('amount', {
							type: 'server',
							message: response.message,
						});
					}

					// if (res.status === 200) {
					// 	toast.success('Withdrawal request submitted');
					// 	form.reset();
					// 	setIsOpen(false);
					// } else if (res.status === 401) {
					// 	const errors = res?.message || {};
					// 	const validationError = {
					// 		amount: errors['amount'] ?? null,
					// 		bank_name: errors['bank_name'] ?? null,
					// 		ac_or_number: errors['ac_or_number'] ?? null,
					// 	};

					// 	Object.entries(validationError).forEach(([field, message]) => {
					// 		if (message) {
					// 			form.setError(field as keyof WithdrawFormValues, {
					// 				type: 'server',
					// 				message: message as string,
					// 			});
					// 		}
					// 	});
					// } else {
					// 	toast.error(res.message || 'Withdrawal failed');
					// }
				} catch (err: any) {
					toast.error('Something went wrong');
				}
			},
		});
	};

	return (
		<Dialog open={isOpen} modal={true} onOpenChange={setIsOpen}>
			<DialogTrigger asChild>
				<Button>
					<Plus className="h-4 w-4 mr-2" />
					New Withdraw
				</Button>
			</DialogTrigger>
			<DialogContent
				onInteractOutside={(e) => {
					e.preventDefault();
				}}
				className="sm:max-w-[750px]"
			>
				<DialogHeader>
					<DialogTitle>New Withdrawal</DialogTitle>
					<DialogDescription>
						Fill in the required details to request a withdrawal.
					</DialogDescription>
				</DialogHeader>

				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)}>
						<div className="grid col-span-1 md:grid-cols-2 gap-6">
							<FormField
								control={form.control}
								name="holder_name"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Account Holder Name</FormLabel>
										<FormControl>
											<Input placeholder="Your Name.." {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="bank_name"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Bank Name</FormLabel>
										<Select
											onValueChange={field.onChange}
											defaultValue={field.value}
										>
											<FormControl>
												<SelectTrigger className="w-full">
													<SelectValue placeholder="Select a bank" />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												{allBanks?.message.map((bank) => (
													<SelectItem key={bank.id} value={bank.name}>
														{bank.name}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="ac_or_number"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Account or Mobile Number</FormLabel>
										<FormControl>
											<Input
												placeholder="Type your account number"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="branch_name"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Branch Name (Optional)</FormLabel>
										<FormControl>
											<Input placeholder="If applicable" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="amount"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Amount</FormLabel>
										<FormControl>
											<Input
												type="number"
												onWheel={(e) => e.currentTarget.blur()}
												placeholder="Enter amount..."
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>

						<DialogFooter>
							<Button type="submit" disabled={isLoading}>
								{isLoading && (
									<LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
								)}
								{isLoading ? 'Submitting...' : 'Submit Withdrawal'}
							</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}
