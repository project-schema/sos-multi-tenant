'use client';

import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
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
import { env } from '@/lib';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoaderCircle, Pen } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { useCmsViewCategoryQuery } from '../blog-category/category.api.slice';
import { useCmsBlogUpdateMutation } from './api-slice';
import { iCmsBlog } from './type';

// Zod Schema matching backend validation
const blogSchema = z.object({
	title: z
		.string()
		.trim()
		.min(1, 'Title is required')
		.max(255, 'Title is too long'),
	short_description: z.string().trim().min(1, 'Short description is required'),
	long_description: z.string().trim().min(1, 'Long description is required'),
	image: z.instanceof(File).optional().or(z.string()),
	status: z.enum(['active', 'inactive']),
	n_category_id: z
		.number({ error: 'Category is required' })
		.min(1, 'Category is required'),
	meta_title: z
		.string()
		.trim()
		.min(1, 'Meta title is required')
		.max(255, 'Meta title is too long'),
	meta_description: z.string().trim().min(1, 'Meta description is required'),
	meta_keywords: z.string().trim().min(1, 'Meta keywords is required'),
	tags: z.array(z.string()).min(1, 'At least one tag is required'),
});

type BlogFormData = z.infer<typeof blogSchema>;

// Component
export function CmsBlogEditModal({ data }: { data: iCmsBlog }) {
	const [open, setOpen] = useState(false);

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button variant="outline" size="icon">
					<Pen className="h-4 w-4" />
					<span className="sr-only">Edit</span>
				</Button>
			</DialogTrigger>

			<DialogContent
				className={cn('sm:max-w-3xl w-full overflow-y-scroll max-h-[90vh]')}
			>
				<DialogHeader>
					<DialogTitle>Update Blog</DialogTitle>
				</DialogHeader>

				<Forms setOpen={setOpen} editData={data} />
			</DialogContent>
		</Dialog>
	);
}

const Forms = ({
	setOpen,
	editData,
}: {
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	editData: iCmsBlog;
}) => {
	const [update, { isLoading }] = useCmsBlogUpdateMutation();
	const { data: categoryData } = useCmsViewCategoryQuery({ page: 1 });
	const [tagInput, setTagInput] = useState('');

	// Parse tags from string or array
	const parseTags = (tags: string | string[] | null | undefined): string[] => {
		if (!tags) return [];
		if (Array.isArray(tags)) return tags;
		try {
			const parsed = JSON.parse(tags);
			return Array.isArray(parsed) ? parsed : [tags];
		} catch {
			// If not JSON, treat as comma-separated string
			return tags
				.split(',')
				.map((t) => t.trim())
				.filter(Boolean);
		}
	};

	const initialTags = parseTags(editData.tags);

	const form = useForm<BlogFormData>({
		resolver: zodResolver(blogSchema),
		defaultValues: {
			title: editData.title || '',
			short_description: editData.short_description || '',
			long_description: editData.long_description || '',
			image: editData.image || '',
			status: (editData.status as 'active' | 'inactive') || 'active',
			n_category_id: editData.n_category_id || 0,
			meta_title: editData.meta_title || '',
			meta_description: editData.meta_description || '',
			meta_keywords: editData.meta_keywords || '',
			tags: initialTags,
		},
	});

	useEffect(() => {
		const tags = parseTags(editData.tags);
		form.reset({
			title: editData.title || '',
			short_description: editData.short_description || '',
			long_description: editData.long_description || '',
			image: editData.image || '',
			status: (editData.status as 'active' | 'inactive') || 'active',
			n_category_id: editData.n_category_id || 0,
			meta_title: editData.meta_title || '',
			meta_description: editData.meta_description || '',
			meta_keywords: editData.meta_keywords || '',
			tags: tags,
		});
	}, [editData, form]);

	const addTag = () => {
		const trimmed = tagInput.trim();
		if (trimmed && !form.watch('tags')?.includes(trimmed)) {
			form.setValue('tags', [...(form.watch('tags') || []), trimmed]);
			setTagInput('');
		}
	};

	const removeTag = (index: number) => {
		const tags = form.watch('tags') || [];
		form.setValue(
			'tags',
			tags.filter((_, i) => i !== index)
		);
	};

	const onSubmit = async (data: BlogFormData) => {
		try {
			const response = await update({
				...data,
				id: editData.id,
				tags: data.tags,
			}).unwrap();

			if (response.success || response.status === 200) {
				toast.success(response.message || 'Updated successfully');
				form.reset();
				setTagInput('');
				setOpen(false);
			} else {
				const errorResponse = response as any;
				if (!response.success && typeof errorResponse.data === 'object') {
					Object.entries(errorResponse.data).forEach(([field, value]) => {
						form.setError(field as keyof BlogFormData, {
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
					form.setError(field as keyof BlogFormData, {
						type: 'server',
						message: (value as string[])[0],
					});
				});
			} else {
				toast.error(error?.data?.message || 'Something went wrong');
			}
		}
	};

	const imageUrl = editData.image
		? editData.image.startsWith('http')
			? editData.image
			: `${env.baseAPI}/${editData.image}`
		: null;

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
				{/* Title */}
				<FormField
					control={form.control}
					name="title"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Title *</FormLabel>
							<FormControl>
								<Input placeholder="Enter blog title" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				{/* Short Description */}
				<FormField
					control={form.control}
					name="short_description"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Short Description *</FormLabel>
							<FormControl>
								<Textarea
									placeholder="Enter short description"
									rows={3}
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				{/* Long Description */}
				<FormField
					control={form.control}
					name="long_description"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Long Description *</FormLabel>
							<FormControl>
								<Textarea
									placeholder="Enter long description"
									rows={6}
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
					{/* Category */}
					<FormField
						control={form.control}
						name="n_category_id"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Category *</FormLabel>
								<Select
									onValueChange={(value) => field.onChange(Number(value))}
									value={field.value ? String(field.value) : ''}
								>
									<FormControl>
										<SelectTrigger className="w-full">
											<SelectValue placeholder="Select category" />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										{categoryData?.categories?.map((category) => (
											<SelectItem key={category.id} value={String(category.id)}>
												{category.name}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
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
								<FormLabel>Status *</FormLabel>
								<Select onValueChange={field.onChange} value={field.value}>
									<FormControl>
										<SelectTrigger className="w-full">
											<SelectValue placeholder="Select status" />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										<SelectItem value="active">Active</SelectItem>
										<SelectItem value="inactive">Inactive</SelectItem>
									</SelectContent>
								</Select>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				{/* Image */}
				<FormField
					control={form.control}
					name="image"
					render={({ field }) => (
						<FormItem>
							<ImageUpload
								label="Image"
								value={field.value instanceof File ? field.value : null}
								onChange={(file) => field.onChange(file)}
								defaultImage={imageUrl}
							/>
							<FormMessage />
						</FormItem>
					)}
				/>

				{/* Tags */}
				<FormField
					control={form.control}
					name="tags"
					render={() => (
						<FormItem>
							<FormLabel>Tags *</FormLabel>
							<div className="flex gap-2">
								<Input
									placeholder="Type a tag and press Add"
									value={tagInput}
									onChange={(e) => setTagInput(e.target.value)}
									onKeyDown={(e) => {
										if (e.key === 'Enter') {
											e.preventDefault();
											addTag();
										}
									}}
								/>
								<Button type="button" onClick={addTag} variant="secondary">
									Add
								</Button>
							</div>
							<div className="flex flex-wrap gap-2 mt-2">
								{form.watch('tags')?.map((t, i) => (
									<span
										key={`${t}-${i}`}
										className="px-2 py-1 rounded-full text-xs bg-secondary"
									>
										{t}{' '}
										<button
											type="button"
											className="ml-1 text-muted-foreground"
											onClick={() => removeTag(i)}
										>
											×
										</button>
									</span>
								))}
							</div>
							<FormMessage />
						</FormItem>
					)}
				/>

				{/* Meta Title */}
				<FormField
					control={form.control}
					name="meta_title"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Meta Title *</FormLabel>
							<FormControl>
								<Input placeholder="Enter meta title" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				{/* Meta Description */}
				<FormField
					control={form.control}
					name="meta_description"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Meta Description *</FormLabel>
							<FormControl>
								<Textarea
									placeholder="Enter meta description"
									rows={3}
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				{/* Meta Keywords */}
				<FormField
					control={form.control}
					name="meta_keywords"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Meta Keywords *</FormLabel>
							<FormControl>
								<Input placeholder="Enter meta keywords" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<Button type="submit" disabled={isLoading} className="w-full">
					{isLoading && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
					{isLoading ? 'Updating...' : 'Update Blog'}
				</Button>
			</form>
		</Form>
	);
};
