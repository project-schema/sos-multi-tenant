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
export const timeDifference = (date1: Date | null, date2: Date | null) => {
	if (date1 && date2) {
		const diffTime = Math.abs(date2.getTime() - date1.getTime());
		var daysDifference = diffTime / (1000 * 3600 * 24);
		return Math.round(daysDifference + 1);
	}
	return null;
};

// calculate budget width time difference
export const calculateBudgetWidthTimeDifference = ({
	date1,
	date2,
	budget,
	dollarRate,
	type,
}: {
	date1: Date | null;
	date2: Date | null;
	budget: string | null | number;
	dollarRate: string | null | number;
	type: string | null;
}) => {
	if (
		date1 &&
		date2 &&
		budget &&
		typeof parseInt(String(budget)) === 'number' &&
		dollarRate &&
		typeof parseInt(String(dollarRate)) === 'number'
	) {
		const difference = timeDifference(date1, date2);
		const parsedBudget = parseInt(String(budget));
		const parseDollarRate = parseInt(String(dollarRate)) || 1;

		if (typeof difference === 'number' && !isNaN(parsedBudget)) {
			if (type === 'Daily Budget') {
				const budgetIs = difference * parsedBudget * parseDollarRate;
				return `${Math.round(
					difference
				)} Days x $${parsedBudget} x Rate ${parseDollarRate} = Tk ${Math.round(
					budgetIs
				)}`;
			} else {
				const budgetIs = parsedBudget * parseDollarRate;

				return `$${parsedBudget} x Rate ${parseDollarRate} = Tk ${Math.round(
					budgetIs
				)}`;
			}
		}
	}
	return '';
};
