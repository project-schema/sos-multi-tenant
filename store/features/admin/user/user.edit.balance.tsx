'use client';

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import {
	DropdownMenuItem,
	DropdownMenuShortcut,
} from '@/components/ui/dropdown-menu';
import { Landmark, LoaderCircle } from 'lucide-react';
import { useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { alertConfirm, sign } from '@/lib';
import { toast } from 'sonner';
import { useAdminEditUserBalanceMutation } from './admin.user.api.slice';
import { iUser } from './type';

// --- Schema for balance operation ---
const balanceSchema = z.object({
	amount: z
		.string()
		.min(1, 'Amount is required')
		.refine((val) => !isNaN(parseFloat(val)) && parseFloat(val) > 0, {
			message: 'Amount must be a positive number',
		}),
});

type BalanceFormValues = z.infer<typeof balanceSchema>;

export function UserEditBalance({ user }: { user: iUser }) {
	const [open, setOpen] = useState(false);
	const [editUserBalance, { isLoading }] = useAdminEditUserBalanceMutation();

	const form = useForm<BalanceFormValues>({
		resolver: zodResolver(balanceSchema),
		defaultValues: {
			amount: user.balance.toString() || '',
		},
	});

	const onSubmit = async (values: BalanceFormValues) => {
		alertConfirm({
			onOk: async () => {
				try {
					const response = await editUserBalance({
						id: user.id,
						amount: values.amount,
						type: 'edit', // can be changed to 'edit' or 'remove'
					}).unwrap();

					if (response.status === 200) {
						toast.success(response.message || 'Balance updated successfully');
						form.reset();
						setOpen(false);
					}
				} catch (error: any) {
					if (error?.status === 422 && typeof error.errors === 'object') {
						Object.entries(error.errors).forEach(([field, value]) => {
							form.setError(field as keyof BalanceFormValues, {
								type: 'server',
								message: (value as string[])[0],
							});
						});
					} else {
						toast.error('Failed to update balance');
					}
				}
			},
		});
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DropdownMenuItem asChild onSelect={(e) => e.preventDefault()}>
				<DialogTrigger className="flex items-center gap-2 w-full">
					<DropdownMenuShortcut className="ml-0">
						<Landmark className="size-4" />
					</DropdownMenuShortcut>
					Edit Balance
				</DialogTrigger>
			</DropdownMenuItem>

			<DialogContent
				className="sm:max-w-[400px]"
				onInteractOutside={(e) => {
					e.preventDefault();
				}}
			>
				<DialogHeader>
					<DialogTitle>Edit Balance</DialogTitle>
					<DialogDescription>
						<p>Name : {user.name}</p>
						<p>Email : {user.email}</p>
						<p>
							Balance : {user.balance}
							{sign.tk}
						</p>
						<p>Status : {user.status}</p>
					</DialogDescription>
				</DialogHeader>

				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
						<FormField
							control={form.control}
							name="amount"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Amount</FormLabel>
									<FormControl>
										<Input
											{...field}
											type="number"
											inputMode="decimal"
											placeholder="Enter amount"
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<DialogFooter>
							<Button type="submit" disabled={isLoading}>
								{isLoading && (
									<LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
								)}
								{isLoading ? 'Updating...' : 'Edit Balance'}
							</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}
