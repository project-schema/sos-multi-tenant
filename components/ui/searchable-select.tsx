'use client';

/* Use
	<SelectSearch
		value={value}
		options={options}
		placeholder="Select..."
		onSelectorClick={handleSelectorClick}
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
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { Check, ChevronsUpDown } from 'lucide-react';

type Option = {
	label: string;
	value: string;
};

interface SelectSearchProps {
	options: Option[];
	placeholder?: string;
	onSelectorClick?: (value: any) => void;
	value?: string;
}

export const SelectSearch = ({
	options,
	placeholder = 'Select...',
	onSelectorClick,
	value,
}: SelectSearchProps) => {
	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					role="combobox"
					className={cn(
						'w-full justify-between h-11',
						!value && 'text-muted-foreground'
					)}
				>
					{value
						? options.find((opt) => opt.value === value)?.label
						: placeholder}
					<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
				</Button>
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
										onSelectorClick && onSelectorClick(opt);
									}}
								>
									{opt.label}
									<Check
										className={cn(
											'ml-auto h-4 w-4',
											opt.value === value ? 'opacity-100' : 'opacity-0'
										)}
									/>
								</CommandItem>
							))}
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	);
};
