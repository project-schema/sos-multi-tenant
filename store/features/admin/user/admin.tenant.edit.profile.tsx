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
import { LoaderCircle, Pen } from 'lucide-react';
import { useState } from 'react';
import { iUser } from './type';

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
import { ImageUpload } from '@/components/ui/image-upload';
import { Input } from '@/components/ui/input';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { alertConfirm, env } from '@/lib';
import { toast } from 'sonner';
import { useAdminUpdateUserProfileMutation } from './admin.user.api.slice';

// --- Zod Schema ---
export const editProfileSchema = z.object({
	image: z
		.instanceof(File)
		.refine((file) => file.size > 0, { message: 'Image is required' })
		.optional(),
	name: z.string().min(1, 'Name is required'),
	owner_name: z.string().min(1, 'Owner name is required'),
	address: z.string().optional(),
	email: z.email('Invalid email'),
	number: z.string().min(10, 'Invalid phone number'),
	balance: z
		.string()
		.min(1, 'Balance is required')
		.refine((val) => !isNaN(parseFloat(val)) && parseFloat(val) >= 0, {
			message: 'Must be a positive number',
		}),

	status: z.enum(['active', 'pending', 'blocked']),
});

export type EditProfileFormData = z.infer<typeof editProfileSchema>;

export function AdminTenantEditProfile({ user }: { user: iUser }) {
	const [open, setOpen] = useState(false);

	const [updateProfile, { isLoading }] = useAdminUpdateUserProfileMutation();

	const form = useForm<EditProfileFormData>({
		resolver: zodResolver(editProfileSchema),
		defaultValues: {
			image: undefined,
			name: user.name || '',
			address: user.address || '',
			email: user.email || '',
			number: user.number || '',
			owner_name: user.owner_name || '',
			balance: user.balance.toString() || '0',
			status: user.status,
		},
	});

	const onSubmit = async (data: EditProfileFormData) => {
		alertConfirm({
			onOk: async () => {
				try {
					const response = await updateProfile({
						...data,
						id: user.id,
						phone: data.number,
						company_name: data.name,
						type: 'tenant',

						role_as: user.role_as,
					}).unwrap();
					if (response.status === 200) {
						toast.success(response.message || 'Profile updated successfully');
						setOpen(false);
					} else {
						const errorResponse = response as any;
						if (
							response.status === 422 &&
							typeof errorResponse.errors === 'object'
						) {
							Object.entries(errorResponse.errors).forEach(([field, value]) => {
								form.setError(field as keyof EditProfileFormData, {
									type: 'server',
									message: (value as string[])[0],
								});
							});
						} else {
							toast.error(response.message || 'Something went wrong');
						}
					}
				} catch (error: any) {
					if (error?.status === 422 && typeof error.message === 'object') {
						Object.entries(error.message).forEach(([field, value]) => {
							form.setError(field as keyof EditProfileFormData, {
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
		<Dialog open={open} onOpenChange={setOpen}>
			<DropdownMenuItem asChild onSelect={(e) => e.preventDefault()}>
				<DialogTrigger className="flex items-center gap-2 w-full">
					<DropdownMenuShortcut className="ml-0">
						<Pen className="size-4" />
					</DropdownMenuShortcut>
					Edit Profile
				</DialogTrigger>
			</DropdownMenuItem>

			<DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
				<DialogHeader>
					<DialogTitle>Edit Profile Tenant</DialogTitle>
					<DialogDescription>
						Update the user information below.
					</DialogDescription>
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
										defaultImage={
											user.image ? `${env.baseAPI}/${user.image}` : null
										}
									/>
								</FormItem>
							)}
						/>

						{/* Name */}
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Name</FormLabel>
									<FormControl>
										<Input {...field} placeholder="Enter name..." />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						{/* Owner Name */}

						<FormField
							control={form.control}
							name="owner_name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Owner Name</FormLabel>
									<FormControl>
										<Input {...field} placeholder="Enter owner name..." />
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
										<Input
											type="email"
											{...field}
											placeholder="Enter email..."
										/>
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
										<Input
											type="tel"
											{...field}
											placeholder="Enter phone number..."
										/>
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
										<Input
											type="number"
											step="0.01"
											{...field}
											placeholder="Enter balance..."
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						{/* Address */}

						<FormField
							control={form.control}
							name="address"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Address</FormLabel>
									<FormControl>
										<Textarea {...field} placeholder="Enter address..." />
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

						<DialogFooter>
							<Button type="submit" disabled={isLoading}>
								{isLoading && (
									<LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
								)}
								{isLoading ? 'Updating...' : 'Update Profile'}
							</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}
