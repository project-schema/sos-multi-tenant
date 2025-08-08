'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { DialogFooter } from '@/components/ui/dialog';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { LoaderCircle } from 'lucide-react';

import { alertConfirm, cn } from '@/lib';
import { toast } from 'sonner';

import { Label } from '@/components/ui/label';
import {
	useAdminUpdateHomeContentMutation,
	useAdminViewHomeContentQuery,
} from '../cms/home-content/admin-home-content.api.slice';

//  Zod Schema
const schema = z.object({
	minimum_withdraw: z
		.number({ error: 'Amount is required' })
		.min(0, { message: 'Amount must be at least 0' })
		.max(1000000, { message: 'Too long' })
		.refine((val) => !isNaN(val), {
			message: 'Amount must be a number',
		}),
	withdraw_charge: z
		.number({ error: 'Amount is required' })
		.min(0, { message: 'Amount must be at least 0' })
		.max(1000000, { message: 'Too long' })
		.refine((val) => !isNaN(val), {
			message: 'Amount must be a number',
		}),
});

type FormValues = z.infer<typeof schema>;

export function WithdrawSettingForm() {
	const {
		data,
		isLoading: loading,
		refetch,
	} = useAdminViewHomeContentQuery(undefined);

	const [store, { isLoading }] = useAdminUpdateHomeContentMutation();

	const form = useForm<FormValues>({
		resolver: zodResolver(schema),
		defaultValues: {
			minimum_withdraw: data?.message?.[0]?.minimum_withdraw ?? 0,
			withdraw_charge: data?.message?.[0]?.withdraw_charge ?? 0,
		},
	});

	const onSubmit = async (formData: FormValues) => {
		alertConfirm({
			onOk: async () => {
				try {
					const payload = {
						minimum_withdraw: formData.minimum_withdraw,
						withdraw_charge: formData.withdraw_charge,
					};

					const response = await store(payload).unwrap();

					if (response.status === 200) {
						refetch();
						toast.success(response.message || 'Withdraw settings updated');
					} else {
						toast.error(response.message || 'Failed to update');
					}
				} catch (error: any) {
					if (error?.status === 422 && typeof error.message === 'object') {
						Object.entries(error.message).forEach(([field, value]) => {
							form.setError(field as keyof FormValues, {
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
	const onSwitchHandler = async (isEnabled: boolean) => {
		alertConfirm({
			onOk: async () => {
				try {
					const response = await store({
						withdraw_charge_status: isEnabled ? 'on' : 'off',
					}).unwrap();

					if (response.status === 200) {
						refetch();
						toast.success(response.message || 'Updated successfully');
					} else {
						toast.error('Failed to update');
					}
				} catch (error: any) {
					toast.error('Something went wrong');
				}
			},
		});
	};
	return (
		<Card>
			<CardHeader>
				<CardTitle className="text-lg xl:text-xl">Withdraw Settings</CardTitle>
				<CardDescription>
					Manage withdraw settings including minimum amount and optional
					charges.
				</CardDescription>
			</CardHeader>

			<CardContent>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
						{/* Minimum Withdraw */}
						<FormField
							control={form.control}
							name="minimum_withdraw"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Minimum Withdraw</FormLabel>
									<FormControl>
										<Input
											{...field}
											type="number"
											placeholder="e.g. 100"
											disabled={loading || isLoading}
											onChange={(e) =>
												field.onChange(e.target.valueAsNumber || '')
											}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<div className="flex items-center space-x-3">
							<Label htmlFor="airplane-mode">
								{!isLoading && data?.message[0]?.withdraw_charge_status === 'on'
									? 'Enable Withdraw Charge'
									: 'Disable Withdraw Charge'}
								{isLoading && <LoaderCircle className="size-4 animate-spin" />}
							</Label>
							<Switch
								className={cn('scale-125')}
								id="airplane-mode"
								checked={data?.message[0]?.withdraw_charge_status === 'on'}
								onCheckedChange={(e) => {
									onSwitchHandler(e);
								}}
								disabled={loading || isLoading}
							/>
						</div>

						{/* Withdraw Charge Amount */}
						{data?.message[0]?.withdraw_charge_status === 'on' && (
							<FormField
								control={form.control}
								name="withdraw_charge"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Withdraw Charge Amount</FormLabel>
										<FormControl>
											<Input
												{...field}
												type="number"
												placeholder="e.g. 10"
												disabled={loading || isLoading}
												onChange={(e) =>
													field.onChange(e.target.valueAsNumber || '')
												}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						)}

						<DialogFooter>
							<Button type="submit" disabled={isLoading}>
								{isLoading && (
									<LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
								)}
								{isLoading ? 'Saving...' : 'Save Settings'}
							</Button>
						</DialogFooter>
					</form>
				</Form>
			</CardContent>
		</Card>
	);
}
