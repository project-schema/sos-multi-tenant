'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface ClientMotionWrapperProps {
	children: ReactNode;
	delay?: number;
	fromY?: number;
}

const ClientMotionWrapper = ({
	children,
	delay = 0.2,
	fromY = 0,
}: ClientMotionWrapperProps) => {
	return (
		<motion.div
			initial={{ y: fromY, opacity: 0 }}
			whileInView={{
				y: 0,
				opacity: 1,
				transition: {
					delay,
					duration: 0.5,
				},
			}}
		>
			{children}
		</motion.div>
	);
};

export default ClientMotionWrapper;
