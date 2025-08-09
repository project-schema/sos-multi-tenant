// components/ui/multi-select.tsx
'use client';

import { Badge } from '@/components/ui/badge';
import {
	Command,
	CommandGroup,
	CommandItem,
	CommandList,
} from '@/components/ui/command';
import { Command as CommandPrimitive } from 'cmdk';
import { X } from 'lucide-react';
import * as React from 'react';
export type MultiSelectOption = {
	value: string;
	label: string;
};

type MultiSelectProps = {
	options: MultiSelectOption[];
	value: MultiSelectOption[];
	onChange: (value: MultiSelectOption[]) => void;
	placeholder?: string;
	className?: string;
};

export function MultiSelect({
	options,
	value,
	onChange,
	placeholder = 'Select items...',
	className,
}: MultiSelectProps) {
	const [inputValue, setInputValue] = React.useState('');
	const [open, setOpen] = React.useState(false);

	const handleUnselect = (item: MultiSelectOption) => {
		onChange(value.filter((i) => i.value !== item.value));
	};

	const handleSelect = (item: MultiSelectOption) => {
		if (!value.find((i) => i.value === item.value)) {
			onChange([...value, item]);
		}
		setInputValue('');
	};

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Backspace' && inputValue === '' && value.length > 0) {
			onChange(value.slice(0, -1));
		}
	};

	const filteredOptions = options.filter(
		(option) => !value.find((v) => v.value === option.value)
	);

	return (
		<div className={`w-full ${className}`}>
			<Command className="overflow-visible">
				<div className="rounded-md border border-input px-3 py-2 text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
					<div className="flex flex-wrap gap-1">
						{value.map((item) => (
							<Badge
								key={item.value}
								variant="secondary"
								className="select-none"
							>
								{item.label}
								<span
									onMouseDown={(e) => e.preventDefault()}
									onClick={() => handleUnselect(item)}
								>
									<X className="ml-1 size-3 cursor-pointer text-muted-foreground hover:text-foreground" />
								</span>
							</Badge>
						))}

						<CommandPrimitive.Input
							value={inputValue}
							onValueChange={setInputValue}
							onFocus={() => setOpen(true)}
							onBlur={() => setOpen(false)}
							onKeyDown={handleKeyDown}
							placeholder={placeholder}
							className="ml-2 flex-1 bg-transparent outline-none placeholder:text-muted-foreground"
						/>
					</div>
				</div>

				{open && filteredOptions.length > 0 && (
					<div className="relative mt-2">
						<CommandList>
							<div className="absolute z-10 w-full rounded-md border bg-popover text-popover-foreground shadow-md outline-none">
								<CommandGroup>
									{filteredOptions.map((option, i) => (
										<CommandItem
											key={i}
											value={option.label}
											onMouseDown={(e) => e.preventDefault()}
											onSelect={() => handleSelect(option)}
											className="cursor-pointer"
										>
											{option.label}
										</CommandItem>
									))}
								</CommandGroup>
							</div>
						</CommandList>
					</div>
				)}
			</Command>
		</div>
	);
}

/* USE 
import { MultiSelect, MultiSelectOption } from '@/components/ui/multi-select';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';

const countryOptions: MultiSelectOption[] = [
	{ value: 'us', label: 'United States' },
	{ value: 'uk', label: 'United Kingdom' },
	{ value: 'fr', label: 'France' },
	{ value: 'de', label: 'Germany' },
	// ...etc
];

// Inside your form JSX
<FormField
	name="countries"
	render={({ field }) => (
		<FormItem>
			<FormLabel>Countries</FormLabel>
			<FormControl>
				<MultiSelect
					options={countryOptions}
					value={field.value || []}
					onChange={field.onChange}
					placeholder="Select countries..."
				/>
			</FormControl>
			<FormMessage />
		</FormItem>
	)}
/>


*/
