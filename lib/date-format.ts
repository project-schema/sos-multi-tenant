import { format } from 'date-fns';
export const dateFormat = (date: string) => {
	if (!date) return '';

	const parsedDate = new Date(date);
	return format(parsedDate, 'dd MMM yyyy');
};

export const timeFormat = (date: string) => {
	if (!date) return '';

	const parsedDate = new Date(date);
	return format(parsedDate, 'hh:mm a');
};
