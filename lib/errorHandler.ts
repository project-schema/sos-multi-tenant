import { FieldValues, UseFormSetError } from 'react-hook-form';

type ServerErrorResponse = {
	message?: string;
	errors?: Record<string, string[]>;
};

export function handleValidationError<T extends FieldValues>(
	response: ServerErrorResponse,
	setError: UseFormSetError<T>,
	toast?: (message: string) => void
) {
	if (typeof response.errors === 'object') {
		Object.entries(response.errors).forEach(([field, messages]) => {
			setError(field as any, {
				type: 'server',
				message: (messages as string[])[0],
			});
		});
	} else {
		if (toast) {
			toast(response?.message || 'Something went wrong');
		}
	}
}
