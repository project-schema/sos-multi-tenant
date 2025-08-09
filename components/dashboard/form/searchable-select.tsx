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
} from '@/components/ui/form';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { Check, ChevronsUpDown } from 'lucide-react';
import { ControllerRenderProps } from 'react-hook-form';

type Option = {
	label: string;
	value: string;
};

interface SearchableSelectProps {
	field: ControllerRenderProps<any, any>;
	label: string;
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
	return (
		<FormItem className="flex flex-col">
			<FormLabel>{label}</FormLabel>
			<Popover>
				<PopoverTrigger asChild>
					<FormControl>
						<Button
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
								{options.map((opt, i) => (
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
