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
import { alertConfirm } from '@/lib';
import { toast } from 'sonner';

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { useRouter } from 'next/navigation';

// --- Zod Schema ---
const schema = z.object({
	subject: z
		.string({ error: 'Subject is required' })
		.trim()
		.min(1, 'Subject is required'),

	categories: z
		.string({ error: 'Categories is required' })
		.min(1, 'Categories is required'),
	sub_categories: z
		.string({ error: 'Sub Categories is required' })
		.min(1, 'Sub Categories is required'),
	description: z
		.string({ error: 'Description is required' })
		.min(1, 'Description is required'),
	file: z.string().optional(),
});

type ZodType = z.infer<typeof schema>;
export function VendorSupportCreatePage() {
	const router = useRouter();
	const form = useForm<ZodType>({
		resolver: zodResolver(schema),
		defaultValues: {
			subject: '',
			categories: '',
			sub_categories: '',
			description: '',
			file: '',
		},
	});
	const handleSubmit = () => {
		alertConfirm({
			onOk: async () => {
				try {
					// const response = await mutate({ amount, getwaya: gateway }).unwrap();
					// if (response?.payment_url) {
					// 	window.location.href = response.payment_url;
					// } else {
					// 	toast.error('Failed to retrieve payment URL');
					// }
				} catch (error: any) {
					toast.error(error?.data?.message || 'Something went wrong');
				}
			},
			onCancel: () => {
				toast.info('Payment canceled');
			},
		});
	};

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
								name="categories"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Categories</FormLabel>
										<Select
											onValueChange={field.onChange}
											defaultValue={field.value}
										>
											<FormControl>
												<SelectTrigger className="w-full">
													<SelectValue placeholder="Select Categories" />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												<SelectItem value="active">Active</SelectItem>
												<SelectItem value="deactive">Deactive</SelectItem>
											</SelectContent>
										</Select>
										<FormMessage />
									</FormItem>
								)}
							/>
							{/* Sub Categories */}
							<FormField
								control={form.control}
								name="sub_categories"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Sub Categories</FormLabel>
										<Select
											onValueChange={field.onChange}
											defaultValue={field.value}
										>
											<FormControl>
												<SelectTrigger className="w-full">
													<SelectValue placeholder="Select Sub Categories" />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												<SelectItem value="active">Active</SelectItem>
												<SelectItem value="deactive">Deactive</SelectItem>
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
										<FormLabel>Attachment (Optional)</FormLabel>
										<FormControl>
											<Input
												type="file"
												className="py-0"
												{...field}
												placeholder="Attach file..."
											/>
										</FormControl>
										<FormMessage />
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
								{/* <Button type="submit" disabled={isLoading}>
									{isLoading && (
										<LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
									)}
									{isLoading ? 'Creating...' : 'Create Delivery Charge'}
								</Button> */}
								<Button
									type="button"
									onClick={() => router.back()}
									variant="outline"
								>
									Cancel
								</Button>
								<Button type="submit"> Create Support </Button>
							</DialogFooter>
						</form>
					</Form>
				</CardContent>
			</Card>
		</div>
	);
}
