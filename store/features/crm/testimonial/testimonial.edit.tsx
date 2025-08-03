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
import {} from './testimonial.type';

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
import { Pen } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

import { env } from '@/lib';
import { useAdminUpdateCrmTestimonialMutation } from './testimonial.api.slice';
import { iCrmTestimonial } from './testimonial.type';

// --- Zod Schema ---
const schema = z.object({
	image: z
		.instanceof(File)
		.refine((file) => file.size > 0, { message: 'Image is required' })
		.optional(),

	name: z.string().min(1, 'Title is required'),
	rating: z.string().min(1, 'Rating is required'),
	designation: z.string().min(1, 'Designation is required'),
	description: z.string().min(1, 'Description is required'),
});

type ZodType = z.infer<typeof schema>;

export function CrmTestimonialEdit({
	editData,
}: {
	editData: iCrmTestimonial;
}) {
	const [open, setOpen] = useState(false);

	const [updateProfile, { isLoading }] = useAdminUpdateCrmTestimonialMutation();

	const form = useForm<ZodType>({
		resolver: zodResolver(schema),
		defaultValues: {
			image: undefined,
			name: editData.name,
			rating: editData.rating,
			designation: editData.designation,
			description: editData.description,
		},
	});

	const onSubmit = async (data: ZodType) => {
		try {
			const response = await updateProfile({
				...data,
				id: editData.id,
			}).unwrap();
			if (response.status === 200) {
				toast.success(response.message || 'Testimonial updated successfully');
				setOpen(false);
			} else {
				const errorResponse = response as any;
				if (
					response.status === 422 &&
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
			if (error?.status === 422 && typeof error.message === 'object') {
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
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button variant="outline" size="icon">
					<Pen className="h-4 w-4" />
					<span className="sr-only">Edit</span>
				</Button>
			</DialogTrigger>

			<DialogContent className="sm:max-w-[500px]">
				<DialogHeader>
					<DialogTitle>Edit CrmTestimonial</DialogTitle>
					<DialogDescription>
						Update the category information.
					</DialogDescription>
				</DialogHeader>

				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
						{/* Image Upload */}
						<FormField
							control={form.control}
							name="image"
							render={({ field }) => (
								<FormItem>
									<ImageUpload
										label="Testimonial Image"
										value={field.value}
										onChange={field.onChange}
										defaultImage={`${env.baseAPI}/${editData.image}`}
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
									<FormLabel className="capitalize block mt-2">Name</FormLabel>
									<FormControl>
										<Input {...field} placeholder="Type Name..." />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						{/* Designation */}
						<FormField
							control={form.control}
							name="designation"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="capitalize block mt-2">
										Designation
									</FormLabel>
									<FormControl>
										<Input {...field} placeholder="Type Designation..." />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						{/* Select Rating */}
						<FormField
							control={form.control}
							name="rating"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Select Rating</FormLabel>
									<Select
										onValueChange={field.onChange}
										defaultValue={field.value}
									>
										<FormControl>
											<SelectTrigger className="w-full">
												<SelectValue placeholder="Select a rating" />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											<SelectItem value="1">1 Star</SelectItem>
											<SelectItem value="1.5">1.5 Star</SelectItem>
											<SelectItem value="2">2 Star</SelectItem>
											<SelectItem value="2.5">2.5 Star</SelectItem>
											<SelectItem value="3">3 Star</SelectItem>
											<SelectItem value="3.5">3.5 Star</SelectItem>
											<SelectItem value="4">4 Star</SelectItem>
											<SelectItem value="4.5">4.5 Star</SelectItem>
											<SelectItem value="5">5 Star</SelectItem>
										</SelectContent>
									</Select>
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
										<Textarea {...field} placeholder="Type a description..." />
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
								{isLoading ? 'Updating...' : 'Update Testimonial'}
							</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}
