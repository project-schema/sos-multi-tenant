'use client';

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';

import { Badge } from '@/components/ui/badge';
import { badgeFormat, dateFormat, tableSrCount } from '@/lib';

import { env } from '@/lib';
import { CmsBlogDelete } from './delete';
import { CmsBlogEditModal } from './edit-modal';
import { iCmsBlog } from './type';

export function CmsBlogTable({ data }: { data: iCmsBlog[] }) {
	const items = data;
	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead className="bg-stone-100">Sr.</TableHead>
					<TableHead className="bg-stone-100">Image</TableHead>
					<TableHead className="bg-stone-100">Title</TableHead>
					<TableHead className="bg-stone-100">Category</TableHead>
					<TableHead className="bg-stone-100">Short Description</TableHead>
					<TableHead className="bg-stone-100">Tags</TableHead>
					<TableHead className="bg-stone-100">Status</TableHead>
					<TableHead className="bg-stone-100">Created At</TableHead>
					<TableHead className="bg-stone-100">Action</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{items.length === 0 ? (
					<TableRow>
						<TableCell
							colSpan={9}
							className="text-center py-8 text-muted-foreground"
						>
							No blogs found matching your criteria
						</TableCell>
					</TableRow>
				) : (
					items?.map((item, i) => {
						const imageUrl = item.image
							? item.image.startsWith('http')
								? item.image
								: `${env.baseAPI}/${item.image}`
							: null;

						// Parse tags
						const parseTags = (tags: string | string[] | null): string[] => {
							if (!tags) return [];
							if (Array.isArray(tags)) return tags;
							try {
								const parsed = JSON.parse(tags);
								return Array.isArray(parsed) ? parsed : [tags];
							} catch {
								return tags
									.split(',')
									.map((t) => t.trim())
									.filter(Boolean);
							}
						};

						const tags = parseTags(item.tags);

						return (
							<TableRow key={item.id}>
								<TableCell className="py-2 pl-4">
									{tableSrCount(1, i)}
								</TableCell>
								<TableCell className="py-2">
									{imageUrl ? (
										<img
											src={imageUrl}
											alt={item.title}
											className="w-16 h-16 object-cover rounded"
										/>
									) : (
										<div className="w-16 h-16 bg-gray-100 rounded flex items-center justify-center text-xs text-gray-400">
											No Image
										</div>
									)}
								</TableCell>
								<TableCell className="font-medium py-4 max-w-xs">
									<div className="truncate" title={item.title}>
										{item.title}
									</div>
								</TableCell>
								<TableCell className="py-2">{item.n_category_id}</TableCell>
								<TableCell className="py-2 max-w-xs">
									<div className="truncate" title={item.short_description}>
										{item.short_description}
									</div>
								</TableCell>
								<TableCell className="py-2">
									<div className="flex flex-wrap gap-1">
										{tags.slice(0, 3).map((tag, idx) => (
											<Badge key={idx} variant="secondary" className="text-xs">
												{tag}
											</Badge>
										))}
										{tags.length > 3 && (
											<Badge variant="secondary" className="text-xs">
												+{tags.length - 3}
											</Badge>
										)}
									</div>
								</TableCell>
								<TableCell className="py-2">
									<Badge
										className="capitalize"
										variant={badgeFormat(item.status)}
									>
										{item.status}
									</Badge>
								</TableCell>
								<TableCell className="py-2">
									{dateFormat(item.created_at)}
								</TableCell>
								<TableCell className="py-2 space-x-2">
									<CmsBlogEditModal data={item} />
									<CmsBlogDelete data={item} />
								</TableCell>
							</TableRow>
						);
					})
				)}
			</TableBody>
		</Table>
	);
}
