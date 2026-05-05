'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { useUserSupportReplayMutation } from './api-slice';
import { iUserSupportView } from './type';

// Schema
const schema = z.object({
	description: z.string().min(1, 'Message is required'),
});

type ZodType = z.infer<typeof schema>;

export function UserSupportReplay({ data }: { data: iUserSupportView }) {
	const [update, { isLoading: isLoadingUpdate }] =
		useUserSupportReplayMutation();

	const [file, setFile] = useState<File | null>(null);
	const [preview, setPreview] = useState<string | null>(null);

	const form = useForm<ZodType>({
		resolver: zodResolver(schema),
		defaultValues: {
			description: '',
		},
	});

	// Handle file change
	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const selectedFile = e.target.files?.[0];
		if (!selectedFile) return;

		setFile(selectedFile);

		// Preview (only for images)
		if (selectedFile.type.startsWith('image/')) {
			setPreview(URL.createObjectURL(selectedFile));
		} else {
			setPreview(null);
		}
	};

	const onSubmit = async (dta: ZodType) => {
		try {
			const response = await update({
				support_box_id: String(data.id),
				description: dta.description,
				file,
			}).unwrap();

			if (response.status === 200) {
				toast.success(response.message || 'Sent successfully');
				form.reset();
				setFile(null);
				setPreview(null);
			} else {
				toast.error(response.message || 'Something went wrong');
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
	};

	return (
		<form
			onSubmit={form.handleSubmit(onSubmit)}
			className="mt-3 pt-3 border-t flex flex-col gap-2"
		>
			<div className="relative flex items-center gap-2">
				{/* Preview (absolute above input) */}
				{file && (
					<div className="absolute bottom-full mb-2 left-0 w-64 text-sm border rounded-md p-2 bg-white shadow">
						<div className="flex justify-between items-center">
							<p className="font-medium truncate">{file.name}</p>
							<button
								type="button"
								onClick={() => {
									setFile(null);
									setPreview(null);
								}}
								className="ml-2 text-red-500 hover:text-red-700"
							>
								✕
							</button>
						</div>

						{preview && (
							<img
								src={preview}
								alt="preview"
								className="mt-2 max-h-40 rounded-md"
							/>
						)}
					</div>
				)}

				<input
					type="text"
					{...form.register('description')}
					disabled={isLoadingUpdate}
					placeholder="Type your reply…"
					className="flex-1 rounded-md border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
				/>

				<label className="cursor-pointer px-3 py-2 border rounded-md text-sm bg-gray-50 hover:bg-gray-100">
					📎
					<input
						type="file"
						className="hidden"
						onChange={handleFileChange}
						disabled={isLoadingUpdate}
					/>
				</label>

				<button
					className="px-3 py-2 rounded-md bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 active:bg-indigo-800"
					type="submit"
					disabled={isLoadingUpdate}
				>
					{isLoadingUpdate ? 'Sending...' : 'Send'}
				</button>
			</div>
		</form>
	);
}
