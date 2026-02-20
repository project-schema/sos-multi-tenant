'use client';

import { Loader5 } from '@/components/dashboard';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { DialogFooter } from '@/components/ui/dialog';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { alertConfirm, ErrorAlert } from '@/lib';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoaderCircle } from 'lucide-react';
import Image from 'next/image';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { useSystemQuery, useUpdateSystemMutation } from './api-slice';

// --- Zod Schema ---
const schema = z.object({
	theme: z.enum(['one', 'two', 'three'], {
		error: 'Please select a theme',
	}),
});

type ZodType = z.infer<typeof schema>;

const themes = [
	{
		id: 'one',
		name: 'Theme One',
		description: 'Classic and clean design layout',
		image: '/theme/01.jpg',
	},
	{
		id: 'two',
		name: 'Theme Two',
		description: 'Modern and minimalist design',
		image: '/theme/02.jpg',
	},
	{
		id: 'three',
		name: 'Theme Three',
		description: 'Bold and vibrant design',
		image: '/theme/03.jpg',
	},
] as const;

export function CMSTheme() {
	const [store, { isLoading }] = useUpdateSystemMutation();
	const { data, isLoading: loading, isError, refetch } = useSystemQuery();

	const form = useForm<ZodType>({
		resolver: zodResolver(schema),
		defaultValues: {
			theme: data?.data?.theme,
		},
	});

	// Populate form values once data is available
	useEffect(() => {
		if (data?.data) {
			form.reset({
				theme: data?.data?.theme,
			});
		}
	}, [data, form]);

	if (isError) return <ErrorAlert />;
	if (loading) {
		return (
			<>
				<Loader5 />
			</>
		);
	}

	const onSubmit = async (formData: ZodType) => {
		alertConfirm({
			onOk: async () => {
				try {
					const response = await store({ ...formData }).unwrap();

					if (response.status) {
						refetch();
						toast.success(response.message || 'Theme updated successfully');
					} else {
						const errorResponse = response as any;
						if (
							response.status === 400 &&
							typeof errorResponse.errors === 'object'
						) {
							Object.entries(errorResponse.errors).forEach(([field, value]) => {
								form.setError(field as keyof ZodType, {
									type: 'server',
									message: (value as string[])[0],
								});
							});
						} else {
							toast.error(response.message || 'Something went wrong');
						}
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

	return (
		<Card className="w-full">
			<CardContent>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
						{/* theme */}
						<FormField
							control={form.control}
							name="theme"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Select Theme</FormLabel>
									<FormControl>
										<RadioGroup
											onValueChange={field.onChange}
											value={field.value}
											className="grid grid-cols-1 md:grid-cols-3 gap-4"
										>
											{themes.map((theme) => (
												<Label
													key={theme.id}
													className="has-[[data-state=checked]]:border-primary has-[[data-state=checked]]:bg-primary/5 flex flex-col items-center gap-3 rounded-lg border p-4 cursor-pointer hover:bg-accent transition-colors relative"
												>
													{theme.id === data?.data?.theme && (
														<Badge
															className="absolute top-2 right-2"
															variant="success"
														>
															Active
														</Badge>
													)}

													<RadioGroupItem
														value={theme.id}
														id={theme.id}
														className="sr-only"
													/>
													<div className="text-center w-full">
														<div className="font-medium">{theme.name}</div>
														<div className="text-muted-foreground text-xs mt-1">
															{theme.description}
														</div>
														<div className="mt-10">
															<Image
																width={1000}
																height={1000}
																src={theme.image}
																alt={theme.name}
																className="w-full max-w-full h-full max- block object-cover rounded-md shadow"
															/>
														</div>
													</div>
												</Label>
											))}
										</RadioGroup>
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
								{isLoading ? 'Updating...' : 'Update Theme'}
							</Button>
						</DialogFooter>
					</form>
				</Form>
			</CardContent>
		</Card>
	);
}
