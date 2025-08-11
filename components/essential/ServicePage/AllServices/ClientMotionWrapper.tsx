'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface ClientMotionWrapperProps {
	children: ReactNode;
	delay?: number;
	index?: number;
}

const ClientMotionWrapper = ({
	children,
	delay = 0,
	index = 0,
}: ClientMotionWrapperProps) => {
	return (
		<motion.div
			whileHover={{
				scale: 1.1,
				transition: { duration: 0.3 },
			}}
			initial={{ opacity: 0 }}
			whileInView={{
				opacity: 1,
				transition: {
					delay: index * 0.01 + delay,
					duration: 0.2,
				},
			}}
		>
			{children}
		</motion.div>
	);
};

export default ClientMotionWrapper;
