'use client';

import { motion, MotionProps } from 'motion/react';
import { ReactNode } from 'react';

interface MotionFadeInProps extends MotionProps {
	children: ReactNode;
	className?: string;
	delay?: number;
	direction?: 'up' | 'down' | 'left' | 'right';
}

const MotionFadeIn = ({
	children,
	className = '',
	delay = 0.15,
	direction = 'up',
	...rest
}: MotionFadeInProps) => {
	let xStart = 0;
	let yStart = 0;

	if (direction === 'up') yStart = 50;
	if (direction === 'down') yStart = -50;
	if (direction === 'left') xStart = 50;
	if (direction === 'right') xStart = -50;

	return (
		<motion.div
			initial={{ x: xStart, y: yStart, opacity: 0 }}
			whileInView={{
				x: 0,
				y: 0,
				opacity: 1,
				transition: { duration: 0.4, delay },
			}}
			viewport={{ once: true }}
			className={className}
			{...rest}
		>
			{children}
		</motion.div>
	);
};

export default MotionFadeIn;
