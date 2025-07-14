// components/DatePicker.tsx
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const MyDatePicker: React.FC = () => {
	const [selectedDate, setSelectedDate] = useState<Date | null>(null);

	const handleDateChange = (date: Date | null) => {
		setSelectedDate(date);
	};

	return (
		<div>
			<h2>Date Picker Example</h2>
			<DatePicker
				selected={selectedDate}
				onChange={handleDateChange}
				dateFormat="dd/MM/yyyy" // You can customize the date format
				placeholderText="Select a date"
			/>
			{selectedDate && <p>Selected Date: {selectedDate.toDateString()}</p>}
		</div>
	);
};

export default MyDatePicker;
