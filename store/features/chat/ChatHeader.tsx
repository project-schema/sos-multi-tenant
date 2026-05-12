import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { MoreHorizontal, Phone } from 'lucide-react';
import { ContactAvatar } from './ContactAvatar';
import { iChatUser } from './type';
import { getAvatarGradientClass, getChatInitials } from './utils';

interface ChatHeaderProps {
	peer: iChatUser;
	partnerId: number;
}

function isRecentlyOnline(lastSeen: string) {
	const t = new Date(lastSeen).getTime();
	if (Number.isNaN(t)) return false;
	return Date.now() - t < 5 * 60 * 1000;
}

export function ChatHeader({ peer, partnerId }: ChatHeaderProps) {
	const online = isRecentlyOnline(peer.last_seen);

	return (
		<>
			<div className="flex items-center justify-between px-5 py-3.5">
				<div className="flex items-center gap-3">
					<ContactAvatar
						initials={getChatInitials(peer.name)}
						colorClass={getAvatarGradientClass(partnerId)}
						size="sm"
						isOnline={online}
					/>
					<div>
						<p className="text-sm font-semibold text-foreground leading-tight">
							{peer.name}
						</p>
						{online && (
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
