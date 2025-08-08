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
	extra_charge: z
		.number({ error: 'Amount is required' })
		.min(0, { message: 'Amount must be at least 0' })
		.max(100, { message: 'Too long' })
		.refine((val) => !isNaN(val), {
			message: 'Amount must be a number',
		}),
});

type FormValues = z.infer<typeof schema>;

export function ExtraChargeSettingForm() {
	const {
		data,
		isLoading: loading,
		refetch,
	} = useAdminViewHomeContentQuery(undefined);

	const [store, { isLoading }] = useAdminUpdateHomeContentMutation();

	const form = useForm<FormValues>({
		resolver: zodResolver(schema),
		defaultValues: {
			extra_charge: data?.message?.[0]?.extra_charge ?? 0,
		},
	});

	const onSubmit = async (formData: FormValues) => {
		alertConfirm({
			onOk: async () => {
				try {
					const payload = {
						extra_charge: formData.extra_charge,
					};

					const response = await store(payload).unwrap();

					if (response.status === 200) {
						refetch();
						toast.success(response.message || 'Extra charge updated');
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
						extra_charge_status: isEnabled ? 'on' : 'off',
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
				<CardTitle className="text-lg xl:text-xl">
					Extra Charge Settings
				</CardTitle>
				<CardDescription>
					Set and control additional charges applied to transactions.
				</CardDescription>
			</CardHeader>

			<CardContent>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
						<div className="flex items-center space-x-3">
							<Label htmlFor="airplane-mode">
								{!isLoading && data?.message[0]?.extra_charge_status === 'on'
									? 'Enable Extra Charge'
									: 'Disable Extra Charge'}
								{isLoading && <LoaderCircle className="size-4 animate-spin" />}
							</Label>
							<Switch
								className={cn('scale-125')}
								id="airplane-mode"
								checked={data?.message[0]?.extra_charge_status === 'on'}
								onCheckedChange={(e) => {
									onSwitchHandler(e);
								}}
								disabled={loading || isLoading}
							/>
						</div>
						{data?.message[0]?.extra_charge_status === 'on' && (
							<>
								{/* Extra Charge Amount */}
								<FormField
									control={form.control}
									name="extra_charge"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Extra Charge Amount (%)</FormLabel>
											<FormControl>
												<Input
													{...field}
													type="number"
													placeholder="e.g. 15"
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

								<DialogFooter>
									<Button type="submit" disabled={isLoading}>
										{isLoading && (
											<LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
										)}
										{isLoading ? 'Saving...' : 'Save Extra Charge'}
									</Button>
								</DialogFooter>
							</>
						)}
					</form>
				</Form>
			</CardContent>
		</Card>
	);
}
