'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { LoaderCircle } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
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

import { alertConfirm, ErrorAlert } from '@/lib';
import { useEffect } from 'react';
import {
	useAdminGetDollarPriceQuery,
	useAdminUpdateDollarPriceMutation,
} from './admin-settings-api-slice';

//  Zod Schema
const schema = z.object({
	amount: z
		.number({ error: 'Amount is required' })
		.min(0, { message: 'Amount must be at least 0' })
		.max(1000000, { message: 'Too long' })
		.refine((val) => !isNaN(val), {
			message: 'Amount must be a number',
		}),
});

type FormValues = z.infer<typeof schema>;

export function SetDollarRate() {
	const {
		data,
		isLoading: loading,
		refetch,
		isError,
	} = useAdminGetDollarPriceQuery(undefined);
	const [store, { isLoading }] = useAdminUpdateDollarPriceMutation();

	//  Form setup
	const form = useForm<FormValues>({
		resolver: zodResolver(schema),
		defaultValues: {
			amount: data?.message?.amount ?? 0,
		},
	});

	useEffect(() => {
		form.reset({
			amount: data?.message?.amount ?? 0,
		});
	}, [data]);

	//  Submit handler
	const onSubmit = async (formData: FormValues) => {
		alertConfirm({
			onOk: async () => {
				try {
					const response = await store({ amount: formData.amount }).unwrap();
					if (response.status === 200) {
						toast.success(
							response.message || 'Dollar rate updated successfully'
						);
						refetch();
					} else {
						toast.error(response.message || 'Something went wrong');
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

	if (isError) {
		return <ErrorAlert />;
	}
	return (
		<Card>
			<CardHeader>
				<CardTitle className="text-lg xl:text-xl">Set Dollar Rate</CardTitle>
				<CardDescription>
					This dollar is use for Advertise Add Creations.
				</CardDescription>
			</CardHeader>
			<CardContent className="max-w-lg">
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
						{/* Amount Field */}
						<FormField
							control={form.control}
							name="amount"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Amount</FormLabel>
									<FormControl>
										<Input
											type="number"
											step="0.01"
											{...field}
											onChange={(e) =>
												field.onChange(e.target.valueAsNumber || '')
											}
											disabled={loading || isLoading}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						{/* Footer */}
						<DialogFooter>
							<Button type="submit" disabled={isLoading}>
								{isLoading && (
									<LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
								)}
								{isLoading ? 'Saving...' : 'Save Changes'}
							</Button>
						</DialogFooter>
					</form>
				</Form>
			</CardContent>
		</Card>
	);
}
