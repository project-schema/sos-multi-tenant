'use client';
import { FieldValues, UseFormSetError } from 'react-hook-form';
import { toast } from 'sonner';

type ServerErrorResponse = {
	message?: string;
	errors?: Record<string, string[]>;
};

export function handleValidationError<T extends FieldValues>(
	response: ServerErrorResponse,
	setError: UseFormSetError<T>,
) {
	if (typeof response.errors === 'object') {
		Object.entries(response.errors).forEach(([field, messages]) => {
			setError(field as any, {
				type: 'server',
				message: (messages as string[])[0],
			});
		});
	} else {
		toast.error(response?.message || 'Something went wrong');
	}
}
