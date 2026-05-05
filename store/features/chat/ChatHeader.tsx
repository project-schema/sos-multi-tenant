import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { MoreHorizontal, Phone } from 'lucide-react';
import { Contact } from './chat';
import { ContactAvatar } from './ContactAvatar';

interface ChatHeaderProps {
	contact: Contact;
}

export function ChatHeader({ contact }: ChatHeaderProps) {
	return (
		<>
			<div className="flex items-center justify-between px-5 py-3.5">
				<div className="flex items-center gap-3">
					<ContactAvatar
						initials={contact.initials}
						colorClass={contact.avatarColor}
						size="sm"
						isOnline={contact.isOnline}
					/>
					<div>
						<p className="text-sm font-semibold text-foreground leading-tight">
							{contact.name}
						</p>
						{contact.isOnline && (
							<p className="text-xs text-green-500 font-medium leading-tight">
								Online
							</p>
						)}
					</div>
				</div>

				<div className="flex items-center gap-1.5">
					<Button
						variant="outline"
						size="icon"
						className="h-8 w-8 rounded-lg text-muted-foreground"
					>
						<Phone className="h-4 w-4" />
					</Button>
					<Button
						variant="outline"
						size="icon"
						className="h-8 w-8 rounded-lg text-muted-foreground"
					>
						<MoreHorizontal className="h-4 w-4" />
					</Button>
				</div>
			</div>
			<Separator />
		</>
	);
}
