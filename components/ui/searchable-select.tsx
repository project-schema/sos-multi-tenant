'use client';

/* Use
	<SelectSearch
		value={value}
		options={options}
		placeholder="Select..."
		onSelectorClick={handleSelectorClick}
		onAddNew={(search) => openCreateModal(search)}
		addNewLabel="Add new customer"
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
import { Check, ChevronsUpDown, Plus } from 'lucide-react';
import { useEffect, useState } from 'react';

type Option = {
	label: string;
	value: string;
};

interface SelectSearchProps {
	options: Option[];
	placeholder?: string;
	onSelectorClick?: (value: Option) => void;
	value?: string;
	onAddNew?: (search: string) => void;
	addNewLabel?: string;
}

export const SelectSearch = ({
	options,
	placeholder = 'Select...',
	onSelectorClick,
	value,
	onAddNew,
	addNewLabel = 'Add new',
}: SelectSearchProps) => {
	const [open, setOpen] = useState(false);
	const [search, setSearch] = useState('');

	useEffect(() => {
		if (!open) {
			setSearch('');
		}
	}, [open]);

	return (
		<Popover open={open} onOpenChange={setOpen}>
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
					<CommandInput
						placeholder="Search..."
						className="h-9"
						value={search}
						onValueChange={setSearch}
					/>
					<CommandList>
						<CommandEmpty>
							{search.trim() && onAddNew ? (
								<div className="px-2 py-4 text-center">
									<p className="mb-3 text-sm text-muted-foreground">
										No result found for &quot;{search.trim()}&quot;
									</p>
									<Button
										type="button"
										size="sm"
										variant="secondary"
										className="gap-1.5 text-white"
										onClick={() => {
											onAddNew(search.trim());
											setOpen(false);
										}}
									>
										<Plus className="size-4" />
										{addNewLabel}
									</Button>
								</div>
							) : (
								'No result found.'
							)}
						</CommandEmpty>
						<CommandGroup>
							{options.map((opt, i) => (
								<CommandItem
									value={opt.label}
									key={i}
									onSelect={() => {
										onSelectorClick?.(opt);
										setOpen(false);
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
