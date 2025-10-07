'use client';

/* Use
<FormField
	control={form.control}
	name="language"
	render={({ field }) => (
		<SearchableSelect
			field={field}
			label="Language"
			options={languages}
			description="This is the language that will be used in the dashboard."
			placeholder="Select language"
		/>
	)}
/>

<FormField
	control={form.control}
	name="category_id"
	render={({ field }) => (
		<SearchableSelect
			field={field}
			label="Select Category"
			options={
				categories?.category?.data?.map((cat) => ({
					label: cat.name,
					value: cat.id.toString(),
				})) ?? []
			}
			placeholder="Select category"
		/>
	)}
/>


*/

import { Button } from '@/components/ui/button';
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from '@/components/ui/command';
import {
	FormControl,
	FormDescription,
	FormItem,
	FormLabel,
	FormMessage,
	useFormField,
} from '@/components/ui/form';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { Check, ChevronsUpDown } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { ControllerRenderProps } from 'react-hook-form';

type Option = {
	label: string;
	value: string;
};

interface SearchableSelectProps {
	field: ControllerRenderProps<any, any>;
	label?: string;
	options: Option[];
	description?: string;
	placeholder?: string;
	onSelectorClick?: (value: any) => void;
}

export const SearchableSelect = ({
	field,
	label,
	options,
	description,
	placeholder = 'Select...',
	onSelectorClick,
}: SearchableSelectProps) => {
	const fieldRef = useRef<HTMLDivElement>(null);
	const { error } = useFormField();

	// Scroll to field when there's an error
	useEffect(() => {
		if (error && fieldRef.current) {
			// Add a small delay to ensure the error message is rendered
			const timer = setTimeout(() => {
				fieldRef.current?.scrollIntoView({
					behavior: 'smooth',
					block: 'center',
				});
			}, 100);

			return () => clearTimeout(timer);
		}
	}, [error]);

	return (
		<FormItem className="flex flex-col" ref={fieldRef}>
			{label && <FormLabel>{label}</FormLabel>}
			<Popover>
				<PopoverTrigger asChild>
					<FormControl>
						<Button
							name={field.name}
							variant="outline"
							role="combobox"
							className={cn(
								'w-full justify-between h-11',
								!field.value && 'text-muted-foreground'
							)}
						>
							{field.value
								? options.find((opt) => opt.value === field.value)?.label
								: placeholder}
							<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
						</Button>
					</FormControl>
				</PopoverTrigger>
				<PopoverContent className="w-full p-0" align="start">
					<Command>
						<CommandInput placeholder="Search..." className="h-9" />
						<CommandList>
							<CommandEmpty>No result found.</CommandEmpty>
							<CommandGroup>
								{options?.map((opt, i) => (
									<CommandItem
										value={opt.label}
										key={i}
										onSelect={() => {
											field.onChange(opt.value);
											onSelectorClick && onSelectorClick(opt);
										}}
									>
										{opt.label}
										<Check
											className={cn(
												'ml-auto h-4 w-4',
												opt.value === field.value ? 'opacity-100' : 'opacity-0'
											)}
										/>
									</CommandItem>
								))}
							</CommandGroup>
						</CommandList>
					</Command>
				</PopoverContent>
			</Popover>
			{description && <FormDescription>{description}</FormDescription>}
			<FormMessage />
		</FormItem>
	);
};
