'use client';

import { cn } from '@/lib/utils';
import { HTMLMotionProps, motion } from 'framer-motion';
import * as React from 'react';

/* ---------------- Table ---------------- */

function Table({ className, ...props }: React.ComponentProps<'table'>) {
	return (
		<motion.div
			initial="hidden"
			animate="show"
			variants={{
				hidden: {},
				show: {
					transition: {
						staggerChildren: 0.08,
						delayChildren: 0.1,
					},
				},
			}}
			className="relative w-full overflow-x-auto"
		>
			<table
				className={cn('w-full caption-bottom text-sm', className)}
				{...props}
			/>
		</motion.div>
	);
}

/* ---------------- Header ---------------- */

function TableHeader({ className, ...props }: React.ComponentProps<'thead'>) {
	return (
		<thead className={cn('[&_tr]:border-b bg-white', className)} {...props} />
	);
}

/* ---------------- Body (NO motion এখানে) ---------------- */

function TableBody({ className, ...props }: React.ComponentProps<'tbody'>) {
	return (
		<tbody className={cn('[&_tr:last-child]:border-0', className)} {...props} />
	);
}

/* ---------------- Row Animation ---------------- */

const rowVariants = {
	hidden: { opacity: 0, y: 10 },
	show: { opacity: 1, y: 0 },
};

function TableRow({ className, ...props }: HTMLMotionProps<'tr'>) {
	return (
		<motion.tr
			variants={rowVariants}
			transition={{ duration: 0.25, ease: 'easeOut' }}
			className={cn(
				'border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted',
				className,
			)}
			{...props}
		/>
	);
}

/* ---------------- Cells ---------------- */

function TableHead({ className, ...props }: React.ComponentProps<'th'>) {
	return (
		<th
			className={cn(
				'h-10 px-2 text-left align-middle font-medium whitespace-nowrap bg-stone-100',
				className,
			)}
			{...props}
		/>
	);
}

function TableCell({ className, ...props }: React.ComponentProps<'td'>) {
	return (
		<td
			className={cn('p-2 align-middle whitespace-nowrap', className)}
			{...props}
		/>
	);
}

/* ---------------- Footer ---------------- */

function TableFooter({ className, ...props }: React.ComponentProps<'tfoot'>) {
	return (
		<tfoot
			className={cn(
				'bg-muted/50 border-t font-medium [&>tr]:last:border-b-0',
				className,
			)}
			{...props}
		/>
	);
}

/* ---------------- Caption ---------------- */

function TableCaption({
	className,
	...props
}: React.ComponentProps<'caption'>) {
	return (
		<caption
			className={cn('text-muted-foreground mt-4 text-sm', className)}
			{...props}
		/>
	);
}

export {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow,
};
