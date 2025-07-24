'use client';
import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import {
	DropdownMenuItem,
	DropdownMenuShortcut,
} from '@/components/ui/dropdown-menu';
import { Pen } from 'lucide-react';
import { useState } from 'react';
import { iUser } from './type';
export default function UserEditProfile({ user }: { user: iUser }) {
	const [open, setOpen] = useState(false);

	return (
		<>
			<DropdownMenuItem
				onSelect={(e) => {
					e.preventDefault();
					setOpen(true);
				}}
			>
				<Dialog open={open} onOpenChange={setOpen}>
					<DialogTrigger>
						<DropdownMenuShortcut className="ml-0">
							<Pen className="size-4" />
						</DropdownMenuShortcut>
						Edit Profile
					</DialogTrigger>
					<DialogContent className="sm:max-w-[425px]">
						<DialogHeader>
							<DialogTitle>Create New User</DialogTitle>
							<DialogDescription>
								Add a new user to the system. Fill in all required fields.
							</DialogDescription>
						</DialogHeader>
						<div className="grid gap-4 py-4"></div>
						<DialogFooter>
							<Button>Create User</Button>
						</DialogFooter>
					</DialogContent>
				</Dialog>
			</DropdownMenuItem>
		</>
	);
}
