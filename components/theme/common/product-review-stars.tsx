'use client';

import { cn } from '@/lib/utils';
import { Star } from 'lucide-react';

type StarRatingProps = {
	value: number;
	max?: number;
	size?: 'sm' | 'md' | 'lg';
	className?: string;
};

const sizeClasses = {
	sm: 'size-4',
	md: 'size-5',
	lg: 'size-6',
};

export function StarRatingDisplay({
	value,
	max = 5,
	size = 'md',
	className,
}: StarRatingProps) {
	const rounded = Math.round(value);

	return (
		<div className={cn('flex items-center gap-0.5', className)} aria-hidden="true">
			{Array.from({ length: max }).map((_, index) => (
				<Star
					key={index}
					className={cn(
						sizeClasses[size],
						index < rounded
							? 'fill-yellow-400 text-yellow-400'
							: 'text-muted-foreground/30',
					)}
				/>
			))}
		</div>
	);
}

export function StarRatingInput({
	value,
	onChange,
	max = 5,
	size = 'md',
	className,
	disabled = false,
}: StarRatingProps & {
	onChange: (value: number) => void;
	disabled?: boolean;
}) {
	return (
		<div
			className={cn('flex items-center gap-1', className)}
			role="radiogroup"
			aria-label="Rating"
		>
			{Array.from({ length: max }).map((_, index) => {
				const rating = index + 1;
				const isActive = rating <= value;

				return (
					<button
						key={rating}
						type="button"
						disabled={disabled}
						role="radio"
						aria-checked={value === rating}
						aria-label={`${rating} star${rating > 1 ? 's' : ''}`}
						onClick={() => onChange(rating)}
						className="rounded-sm transition-transform hover:scale-105 disabled:cursor-not-allowed disabled:opacity-50"
					>
						<Star
							className={cn(
								sizeClasses[size],
								isActive
									? 'fill-yellow-400 text-yellow-400'
									: 'text-muted-foreground/30',
							)}
						/>
					</button>
				);
			})}
		</div>
	);
}
