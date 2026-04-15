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
import { LoaderCircle, View } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import {
	useSystemQuery,
	useUpdateDummyDataMutation,
	useUpdateSystemMutation,
} from './api-slice';

// --- Zod Schema ---
const schema = z.object({
	theme: z.enum(['one', 'two', 'three', 'four'], {
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
		preview:
			'https://preview.themeforest.net/item/runic-creative-agency-html-template/full_screen_preview/52994907',
	},
	{
		id: 'two',
		name: 'Theme Two',
		description: 'Modern and minimalist design',
		image: '/theme/02.jpg',
		preview:
			'https://preview.themeforest.net/item/runic-creative-agency-html-template/full_screen_preview/52994907',
	},
	{
		id: 'three',
		name: 'Theme Three',
		description: 'Bold and vibrant design',
		image: '/theme/03.jpg',
		preview:
			'https://preview.themeforest.net/item/runic-creative-agency-html-template/full_screen_preview/52994907',
	},
	{
		id: 'four',
		name: 'Theme Four',
		description: 'Classic and clean design layout',
		image: '/theme/04.jpg',
		preview:
			'https://preview.themeforest.net/item/runic-creative-agency-html-template/full_screen_preview/52994907',
	},
] as const;

export function CMSTheme() {
	const [store, { isLoading }] = useUpdateSystemMutation();
	const [update, { isLoading: updating }] = useUpdateDummyDataMutation();
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

	console.log(form.watch('theme'));

	const onSubmit = async (formData: ZodType) => {
		alertConfirm({
			clickOutSide: false,
			title: 'Update Theme',
			content: 'Do you want to update theme?',
			cancelBtnText: 'Dummy Data',
			confirmBtnText: 'Previous Theme Data',

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
			onCancel: async () => {
				alertConfirm({
					clickOutSide: false,
					title: 'Update Dummy Data',
					content: 'Dummy Data will replace existing data',
					cancelBtnText: 'Cancel',
					confirmBtnText: 'Update Dummy Data',
					onOk: async () => {
						try {
							const response = await update({ theme: formData.theme }).unwrap();
							const responseStore = await store({ ...formData }).unwrap();

							if (response.success) {
								refetch();
								toast.success(
									response?.message || 'Theme updated successfully',
								);
							} else {
								toast.error(response?.message || 'Something went wrong');
							}
						} catch (error: any) {
							toast.error(error?.message || 'Something went wrong');
						}
					},
				});
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
													className="  has-[[data-state=checked]]:border-primary has-[[data-state=checked]]:bg-primary/5 flex flex-col items-center gap-3 rounded-lg border p-4 cursor-pointer group hover:bg-accent transition-colors relative"
												>
													{theme.id === data?.data?.theme && (
														<Badge
															className="absolute top-2 right-2"
															variant="success"
														>
															Active
														</Badge>
													)}

													<Link
														target="_blank"
														href={theme.preview}
														className="flex items-center gap-2 absolute top-2 left-2 group-hover:opacity-100 opacity-0 p-2 rounded-md bg-muted transition-opacity text-black shadow "
													>
														<span>Preview</span>
														<View className="size-4 text-black" />
													</Link>

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
