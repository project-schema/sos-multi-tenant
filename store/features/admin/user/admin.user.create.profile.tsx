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
import { LoaderCircle } from 'lucide-react';
import { useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { ImageUpload } from '@/components/ui/image-upload';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { alertConfirm } from '@/lib';
import { toast } from 'sonner';
import { useAdminCreateUserProfileMutation } from './admin.user.api.slice';

// --- Zod Schema ---
const schema = z.object({
	image: z
		.instanceof(File)
		.refine((file) => file.size > 0, { message: 'Image is required' })
		.optional(),
	name: z.string({ error: 'Name is required' }).min(1, 'Name is required'),
	email: z.string({ error: 'Email is required' }).email('Invalid email'),
	number: z
		.string({ error: 'Phone number is required' })
		.min(11, 'Invalid phone number'),
	password: z
		.string({ error: 'Password is required' })
		.min(8, 'Password must be at least 8 characters'),
	balance: z
		.string()
		.min(1, 'Balance is required')
		.refine((val) => !isNaN(parseFloat(val)) && parseFloat(val) >= 0, {
			message: 'Must be a positive number',
		}),

	// verified_at is 0 and 1
	verified_at: z.union([z.literal(0), z.literal(1)]),

	status: z.enum(['active', 'pending', 'blocked']),
	type: z.enum(['Merchant', 'Dropshipper', 'User']),
});

type ZodType = z.infer<typeof schema>;

export function UserCreateProfile() {
	const [open, setOpen] = useState(false);

	const [updateProfile, { isLoading }] = useAdminCreateUserProfileMutation();

	const form = useForm<ZodType>({
		resolver: zodResolver(schema),
		defaultValues: {
			image: undefined,
			name: '',
			email: '',
			number: '',
			balance: '0',
			status: 'active',
			password: '',
			verified_at: 1,
			type: 'User',
		},
	});

	const onSubmit = async (data: ZodType) => {
		alertConfirm({
			onOk: async () => {
				try {
					const response = await updateProfile({
						...data,
					}).unwrap();
					if (response.status === 200) {
						toast.success(response.message || 'Profile updated successfully');
						setOpen(false);
						form.reset();
					} else {
						const errorResponse = response as any;
						if (typeof errorResponse.errors === 'object') {
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
					if (typeof error.message === 'object') {
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

	const type = form.watch('type');
	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild className="">
				<Button>Create User</Button>
			</DialogTrigger>

			<DialogContent className="sm:max-w-[700px] overflow-y-auto max-h-[90vh]">
				<DialogHeader>
					<DialogTitle>Create {type}</DialogTitle>
					<DialogDescription>Create the {type}</DialogDescription>
				</DialogHeader>

				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
						{/* Image Upload */}
						<FormField
							control={form.control}
							name="image"
							render={({ field }) => (
								<FormItem>
									<ImageUpload
										label="Profile Image"
										value={field.value}
										onChange={field.onChange}
										defaultImage={null}
									/>
								</FormItem>
							)}
						/>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							{/* Name */}
							<FormField
								control={form.control}
								name="name"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Name</FormLabel>
										<FormControl>
											<Input {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							{/* Email */}
							<FormField
								control={form.control}
								name="email"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Email</FormLabel>
										<FormControl>
											<Input type="email" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							{/* Number */}
							<FormField
								control={form.control}
								name="number"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Phone Number</FormLabel>
										<FormControl>
											<Input type="tel" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							{/* Balance */}
							<FormField
								control={form.control}
								name="balance"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Balance</FormLabel>
										<FormControl>
											<Input type="number" step="0.01" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							{/* Password */}
							<FormField
								control={form.control}
								name="password"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Password</FormLabel>
										<FormControl>
											<Input type="password" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							{/* Status */}
							<FormField
								control={form.control}
								name="status"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Status</FormLabel>
										<Select
											onValueChange={field.onChange}
											defaultValue={field.value}
										>
											<FormControl>
												<SelectTrigger className="w-full">
													<SelectValue placeholder="Select status" />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												<SelectItem value="active">Active</SelectItem>
												<SelectItem value="pending">Pending</SelectItem>
												<SelectItem value="blocked">Blocked</SelectItem>
											</SelectContent>
										</Select>
										<FormMessage />
									</FormItem>
								)}
							/>

							{/* Type */}
							<FormField
								control={form.control}
								name="type"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Type</FormLabel>
										<Select
											onValueChange={field.onChange}
											defaultValue={field.value}
										>
											<FormControl>
												<SelectTrigger className="w-full">
													<SelectValue placeholder="Select type" />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												<SelectItem value="User">User</SelectItem>
												<SelectItem value="Merchant">Merchant</SelectItem>
												<SelectItem value="Dropshipper">Dropshipper</SelectItem>
											</SelectContent>
										</Select>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<FormField
							control={form.control}
							name="verified_at"
							render={({ field }) => (
								<Label className="hover:bg-accent/50 flex items-start gap-3 rounded-lg border p-3 has-[[aria-checked=true]]:border-blue-600 has-[[aria-checked=true]]:bg-blue-50 dark:has-[[aria-checked=true]]:border-blue-900 dark:has-[[aria-checked=true]]:bg-blue-950">
									<Checkbox
										checked={field.value === 1}
										onCheckedChange={(checked) =>
											field.onChange(checked ? 1 : 0)
										}
										className="data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white dark:data-[state=checked]:border-blue-700 dark:data-[state=checked]:bg-blue-700"
									/>
									<div className="grid gap-1.5 font-normal">
										<p className="text-sm leading-none font-medium">
											Verified User
										</p>
										<p className="text-muted-foreground text-sm">
											User will be verified by admin
										</p>
									</div>
								</Label>
							)}
						/>
						<DialogFooter>
							<Button type="submit" disabled={isLoading}>
								{isLoading && (
									<LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
								)}
								{isLoading ? 'Creating...' : `Create ${type}`}
							</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}
