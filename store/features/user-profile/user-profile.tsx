'use client';

import { Loader6 } from '@/components/dashboard/loader';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { env, sign } from '@/lib';
import { useProfileDataQuery } from './user-profile-api-slice';

export function UserProfile() {
	const { data, isLoading, isError } = useProfileDataQuery(undefined);

	if (isLoading) {
		return (
			<div className="space-y-4">
				<Loader6 />
				<Loader6 />
			</div>
		);
	}

	if (isError || !data) {
		return (
			<Card>
				<CardHeader>
					<CardTitle>Some thing went wrong</CardTitle>
				</CardHeader>
				<CardContent>
					<p className="text-sm text-destructive">
						Please try again later. or contact to support
					</p>
				</CardContent>
			</Card>
		);
	}

	const {
		name,
		email,
		number,
		balance,
		role_as,
		status,
		image,
		created_at,
		last_seen,
		email_verified_at,
	} = data.user;

	const roleLabel =
		role_as === '1' ? 'Admin' : role_as === '2' ? 'Vendor' : 'User';

	return (
		<>
			<div className="flex flex-row items-center gap-2 mb-4">
				<Avatar className="h-14 w-14">
					<AvatarImage
						src={`${env.baseAPI}/${image}` || undefined}
						alt={name}
					/>
					<AvatarFallback>{name?.charAt(0)}</AvatarFallback>
				</Avatar>
				<div>
					<CardTitle className="text-xl">{name}</CardTitle>
					<CardDescription>{email}</CardDescription>
				</div>
			</div>
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
				<div>
					<p className="text-sm text-muted-foreground">Phone</p>
					<p className="font-medium">{number || 'N/A'}</p>
				</div>
				<div>
					<p className="text-sm text-muted-foreground">Balance</p>
					<p className="font-medium">
						{balance.toFixed(2)} {sign.tk}
					</p>
				</div>
				<div>
					<p className="text-sm text-muted-foreground">Role</p>
					<Badge variant="outline">{roleLabel}</Badge>
				</div>
				<div>
					<p className="text-sm text-muted-foreground">Status</p>
					<Badge variant={status === 'active' ? 'default' : 'destructive'}>
						{status}
					</Badge>
				</div>
				<div>
					<p className="text-sm text-muted-foreground">Email Verified</p>
					{email_verified_at ? (
						<Badge variant="outline">Verified</Badge>
					) : (
						<Badge variant="destructive">Not Verified</Badge>
					)}
				</div>
				<div>
					<p className="text-sm text-muted-foreground">Joined</p>
					<p className="font-medium">
						{new Date(created_at).toLocaleDateString()}
					</p>
				</div>
				<div>
					<p className="text-sm text-muted-foreground">Last Active</p>
					<p className="font-medium">{new Date(last_seen).toLocaleString()}</p>
				</div>
			</div>
		</>
	);
}
