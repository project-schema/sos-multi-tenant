'use client';

import { FormControl, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Pen } from 'lucide-react';
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
			<FormLabel>{label}</FormLabel>
			<div className="flex items-center gap-4">
				<FormLabel>
					<div className="w-24 h-24 rounded-2xl overflow-hidden bg-gray-100 shadow relative">
						<span className="w-8 h-8 absolute top-1 right-1 bg-stone-800/70 rounded-md flex items-center justify-center">
							<Pen className="w-4 h-4 text-white" />
						</span>
						{preview || defaultImage ? (
							<img
								src={preview || defaultImage!}
								alt="Image preview"
								className="w-full h-full object-cover"
							/>
						) : (
							<div className="w-full h-full flex items-center justify-center text-gray-400">
								Image
							</div>
						)}
					</div>
				</FormLabel>

				<FormControl>
					<Input
						type="file"
						accept="image/png, image/jpeg, image/jpg"
						onChange={handleFileChange}
						className="w-auto hidden"
					/>
				</FormControl>
			</div>

			<FormMessage />
		</div>
	);
}
