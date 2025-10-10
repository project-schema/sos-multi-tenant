'use client';

import { DialogFooter } from '@/components/ui/dialog';

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
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { alertConfirm, handleValidationError } from '@/lib';
import { toast } from 'sonner';

import { Loader6 } from '@/components/dashboard';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { ImageUpload } from '@/components/ui/image-upload';
import { LoaderCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import {
	useVendorSupportCategoryQuery,
	useVendorSupportCreateMutation,
	useVendorSupportSubCategoryQuery,
} from './vendor-support-api-slice';

// --- Zod Schema ---
const schema = z.object({
	subject: z
		.string({ error: 'Subject is required' })
		.trim()
		.min(1, 'Subject is required'),

	support_problem_topic_id: z
		.string({ error: 'Support Problem Topic is required' })
		.min(1, 'Support Problem Topic is required'),
	support_box_category_id: z
		.string({ error: 'Support Box Category is required' })
		.min(1, 'Support Box Category is required'),
	description: z
		.string({ error: 'Description is required' })
		.min(1, 'Description is required'),
	file: z.instanceof(File).optional(),
});

type ZodType = z.infer<typeof schema>;
export function VendorSupportCreatePage() {
	const router = useRouter();
	const [store, { isLoading }] = useVendorSupportCreateMutation();
	const { data: categories, isLoading: isLoadingCategories } =
		useVendorSupportCategoryQuery({});

	const form = useForm<ZodType>({
		resolver: zodResolver(schema),
		defaultValues: {
			subject: '',
			support_problem_topic_id: '',
			support_box_category_id: '',
			description: '',
			file: undefined,
		},
	});
	const categoryId = form.watch('support_problem_topic_id');
	const { data: subCategories, isLoading: isLoadingSubCategories } =
		useVendorSupportSubCategoryQuery(
			{ id: categoryId },
			{
				skip: !categoryId,
			}
		);
	const handleSubmit = (data: ZodType) => {
		alertConfirm({
			onOk: async () => {
				try {
					const response: any = await store({
						...data,
					}).unwrap();
					if (response.message === 'Validation errors') {
						console.log(response.data, 'test');
						handleValidationError(
							{ ...response, errors: response.data },
							form.setError
						);
					}
					if (response.status === 200) {
						toast.success(response.message || 'Created successfully');
						form.reset();
					}
				} catch (error: any) {
					toast.error(error?.data?.message || 'Something went wrong');
				}
			},
		});
	};

	if (isLoadingCategories || isLoadingSubCategories) {
		return (
			<div className="space-y-4 border p-4 rounded-2xl shadow">
				<Loader6 />
				<Loader6 />
			</div>
		);
	}

	return (
		<div>
			<Card>
				<CardHeader>
					<CardTitle>Add New Ticket</CardTitle>
					<CardDescription>Add new ticket for support</CardDescription>
				</CardHeader>
				<CardContent className="flex flex-col gap-6">
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(handleSubmit)}
							className="space-y-6"
						>
							{/* Name */}
							<FormField
								control={form.control}
								name="subject"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Subject</FormLabel>
										<FormControl>
											<Input {...field} placeholder="Type Subject..." />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							{/* Categories */}
							<FormField
								control={form.control}
								name="support_problem_topic_id"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Support Problem Topic</FormLabel>
										<Select
											onValueChange={field.onChange}
											defaultValue={field.value}
										>
											<FormControl>
												<SelectTrigger className="w-full">
													<SelectValue placeholder="Select Support Problem Topic" />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												{categories?.message?.map((cat) => (
													<SelectItem value={cat.id.toString()}>
														{cat.name}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
										<FormMessage />
									</FormItem>
								)}
							/>
							{/* Sub Categories */}
							<FormField
								control={form.control}
								name="support_box_category_id"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Support Box Category</FormLabel>
										<Select
											onValueChange={field.onChange}
											defaultValue={field.value}
										>
											<FormControl>
												<SelectTrigger className="w-full">
													<SelectValue placeholder="Select Support Box Category" />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												{subCategories?.message?.problems?.map((sub) => (
													<SelectItem value={sub.id.toString()}>
														{sub.name}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
										<FormMessage />
									</FormItem>
								)}
							/>

							{/* File */}
							<FormField
								control={form.control}
								name="file"
								render={({ field }) => (
									<FormItem>
										<ImageUpload
											label="Attachment (Optional)"
											value={field.value}
											onChange={field.onChange}
											defaultImage={'/placeholder.svg'}
										/>
									</FormItem>
								)}
							/>

							{/* Description */}
							<FormField
								control={form.control}
								name="description"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Description</FormLabel>
										<FormControl>
											<Textarea {...field} placeholder="Type Description..." />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<DialogFooter>
								<Button
									type="button"
									onClick={() => router.back()}
									variant="outline"
								>
									Cancel
								</Button>
								<Button type="submit" disabled={isLoading}>
									{isLoading && (
										<LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
									)}
									{isLoading ? 'Creating...' : 'Create Support'}
								</Button>
							</DialogFooter>
						</form>
					</Form>
				</CardContent>
			</Card>
		</div>
	);
}
