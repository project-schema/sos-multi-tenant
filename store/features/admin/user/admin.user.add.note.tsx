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
import { LoaderCircle, ScrollText } from 'lucide-react';
import { useState } from 'react';

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
import { Textarea } from '@/components/ui/textarea';
import { alertConfirm } from '@/lib';
import { toast } from 'sonner';
import { useAdminNoteStoreMutation } from './admin.user.api.slice';
import { iUser } from './type';

// --- Schema for note ---
const noteSchema = z.object({
	note: z
		.string()
		.min(1, 'Note is required')
		.max(1000, 'Note must be less than 1000 characters'),
});

type NoteFormValues = z.infer<typeof noteSchema>;

export function UserAddNote({ user }: { user: iUser }) {
	const [open, setOpen] = useState(false);
	const [mutation, { isLoading }] = useAdminNoteStoreMutation();

	const form = useForm<NoteFormValues>({
		resolver: zodResolver(noteSchema),
		defaultValues: {
			note: '',
		},
	});

	const onSubmit = async (values: NoteFormValues) => {
		alertConfirm({
			title: 'Confirm Note',
			content: 'Are you sure you want to add this note?',
			onOk: async () => {
				try {
					const response = await mutation({
						user_id: user.id,
						note: values.note,
					}).unwrap();

					if (response.status === 200) {
						toast.success(response.message || 'Note saved successfully');
						form.reset();
						setOpen(false);
					}
				} catch (error: any) {
					if (error?.status === 422 && typeof error.errors === 'object') {
						Object.entries(error.errors).forEach(([field, value]) => {
							form.setError(field as keyof NoteFormValues, {
								type: 'server',
								message: (value as string[])[0],
							});
						});
					} else {
						toast.error('Failed to save note');
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
						<ScrollText className="size-4" />
					</DropdownMenuShortcut>
					Add Note
				</DialogTrigger>
			</DropdownMenuItem>

			<DialogContent
				className="sm:max-w-[400px]"
				onInteractOutside={(e) => e.preventDefault()}
			>
				<DialogHeader>
					<DialogTitle>Add Note</DialogTitle>
					<DialogDescription>
						<span className="block">Name : {user.name}</span>
						<span className="block">Email : {user.email}</span>
						<span className="block">Status : {user.status}</span>
					</DialogDescription>
				</DialogHeader>

				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
						<FormField
							control={form.control}
							name="note"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Note</FormLabel>
									<FormControl>
										<Textarea
											{...field}
											rows={4}
											placeholder="Write your note here..."
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
								{isLoading ? 'Saving...' : 'Save Note'}
							</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}
