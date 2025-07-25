'use client';

import { FormControl, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import React, { useEffect, useState } from 'react';

type ImageUploadProps = {
	label?: string;
	value?: File | null;
	onChange: (file: File) => void;
	defaultImage?: string | null;
};

export function ImageUpload({
	label = 'Image',
	value,
	onChange,
	defaultImage = null,
}: ImageUploadProps) {
	const [preview, setPreview] = useState<string | null>(null);

	useEffect(() => {
		if (value) {
			const objectUrl = URL.createObjectURL(value);
			setPreview(objectUrl);
			return () => URL.revokeObjectURL(objectUrl); // Cleanup
		} else {
			setPreview(null);
		}
	}, [value]);

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			onChange(file);
		}
	};

	return (
		<div className="flex flex-col space-y-2">
			{label && <FormLabel>{label}</FormLabel>}

			<div className="flex items-center gap-4">
				<div className="w-24 h-24 rounded-full overflow-hidden bg-gray-100 shadow">
					{preview || defaultImage ? (
						<img
							src={preview || defaultImage!}
							alt="Image preview"
							className="w-full h-full object-cover"
						/>
					) : (
						<div className="w-full h-full flex items-center justify-center text-gray-400">
							No Image
						</div>
					)}
				</div>

				<FormControl>
					<Input
						type="file"
						accept="image/*"
						onChange={handleFileChange}
						className="w-auto"
					/>
				</FormControl>
			</div>

			<FormMessage />
		</div>
	);
}
