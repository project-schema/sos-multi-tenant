'use client';

import { FormControl, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib';
import { Image, Trash2 } from 'lucide-react';
import React, { useEffect, useState } from 'react';

type MultiImageUploadProps = {
	label?: string;
	value?: File[];
	onChange: (files: File[]) => void;
	defaultImages?: string[];
};

export function MultiImageUpload({
	label = 'Images',
	value = [],
	onChange,
	defaultImages = [],
}: MultiImageUploadProps) {
	const [previews, setPreviews] = useState<string[]>([]);

	useEffect(() => {
		const urls = value.map((file) => URL.createObjectURL(file));
		setPreviews(urls);

		return () => {
			urls.forEach((url) => URL.revokeObjectURL(url)); // Cleanup
		};
	}, [value]);

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const files = Array.from(e.target.files || []);
		if (files.length) {
			onChange([...value, ...files]);
		}
	};

	const handleRemove = (index: number) => {
		const updatedFiles = [...value];
		updatedFiles.splice(index, 1);
		onChange(updatedFiles);
	};

	return (
		<div className="flex flex-col space-y-2">
			<FormLabel className="cursor-pointer w-fit">{label}</FormLabel>
			<div className="flex flex-wrap gap-4">
				{[...defaultImages, ...previews].map((src, index) => (
					<div
						key={index}
						className="relative w-24 h-24 rounded-2xl overflow-hidden bg-gray-100 shadow"
					>
						<img
							src={src}
							alt={`Preview ${index}`}
							className="w-full h-full object-cover"
						/>
						<button
							type="button"
							onClick={() => handleRemove(index - defaultImages.length)}
							className="absolute top-1 right-1 bg-red-600/80 p-1 rounded-md"
						>
							<Trash2 className="w-4 h-4 text-white" />
						</button>
					</div>
				))}

				<div className="">
					<FormLabel
						className={cn(
							'cursor-pointer w-24 h-24 rounded-2xl flex flex-col items-center justify-center bg-gray-100   border border-dashed border-gray-400 '
						)}
					>
						<Image className="w-6 h-6 text-gray-500" />

						<FormControl className="invisible">
							<Input
								type="file"
								accept="image/png, image/jpeg, image/jpg"
								multiple
								onChange={handleFileChange}
								className="hidden"
							/>
						</FormControl>
					</FormLabel>
				</div>
			</div>
			<FormMessage />
		</div>
	);
}
