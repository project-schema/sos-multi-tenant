'use client';

import { motion, MotionProps } from 'motion/react';
import { ReactNode } from 'react';

interface MotionFadeInProps extends MotionProps {
	children: ReactNode;
	className?: string;
	delay?: number;
}

const MotionFadeIn = ({
	children,
	className = '',
	delay = 0.15,
	...rest
}: MotionFadeInProps) => {
	return (
		<motion.div
			initial={{ y: 50, opacity: 0 }}
			whileInView={{
				y: 0,
				opacity: 1,
				transition: { duration: 0.3, delay },
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
