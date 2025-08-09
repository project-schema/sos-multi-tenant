'use client';

import { useFrontendContactStoreMutation } from '@/store/features/frontend';
import { iContactType } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import style from './Contact.style.module.css';
import ContactContent from './ContactContent';

// Zod schema
const contactSchema = z.object({
	first_name: z
		.string({ error: 'First name is required' })
		.trim()
		.min(1, 'First name is required'),
	last_name: z
		.string({ error: 'Last name is required' })
		.trim()
		.min(1, 'Last name is required'),
	email: z.string({ error: 'Email is required' }).trim().email('Invalid email'),
	number: z
		.string({ error: 'Phone number is required' })
		.trim()
		.min(10, 'Invalid phone number'),
	message: z
		.string({ error: 'Message is required' })
		.trim()
		.min(1, 'Message is required'),
});

type ContactFormData = z.infer<typeof contactSchema>;

const Contact = ({ data }: { data: iContactType }) => {
	const [submitContact, { isLoading }] = useFrontendContactStoreMutation();

	const {
		register,
		handleSubmit,
		reset,
		setError,
		formState: { errors },
	} = useForm<ContactFormData>({
		resolver: zodResolver(contactSchema),
	});

	const onSubmit = async (formData: ContactFormData) => {
		try {
			const res = await submitContact({
				first_name: formData.first_name,
				last_name: formData.last_name,
				number: formData.number,
				email: formData.email,
				message: formData.message,
			}).unwrap();

			if (res.status === 400 && typeof res.errors === 'object') {
				Object.entries(res.errors).forEach(([field, value]) => {
					setError(field as keyof ContactFormData, {
						type: 'server',
						message: (value as string[])[0],
					});
				});
			}
			if (res.status === 200) {
				toast.success(res.message || 'Thank you for your message!');
				reset();
			} else {
				toast.error(res.message || 'Failed to send message');
			}
		} catch (err: any) {
			toast.error(err.message || 'Failed to send message');
		}
	};

	return (
		<div className={style.contactSection}>
			<div className="layout">
				<div className={style.contact}>
					<ContactContent data={data.message} />

					<div className={style.rightForm}>
						<form onSubmit={handleSubmit(onSubmit)}>
							{/* First + Last Name */}
							<div className={style.firstField}>
								{/* First Name */}
								<motion.div
									initial={{ y: 50, opacity: 0 }}
									whileInView={{
										y: 0,
										opacity: 1,
										transition: { delay: 0.14, duration: 0.3 },
									}}
									className={style.middleGap}
								>
									<label className={style.userName}>First Name</label>
									<p className="text-red-500 text-xs">
										{errors.first_name?.message}
									</p>
									<input
										className={style.inputField}
										type="text"
										placeholder="Ex: Rifat"
										{...register('first_name')}
									/>
								</motion.div>

								{/* Last Name */}
								<motion.div
									initial={{ y: 50, opacity: 0 }}
									whileInView={{
										y: 0,
										opacity: 1,
										transition: { delay: 0.14, duration: 0.3 },
									}}
									className={style.middleGap}
								>
									<label className={style.userName}>Last Name</label>
									<p className="text-red-500 text-xs">
										{errors.last_name?.message}
									</p>
									<input
										className={style.inputField}
										type="text"
										placeholder="Ex: Ahmed"
										{...register('last_name')}
									/>
								</motion.div>
							</div>

							{/* Email */}
							<motion.div
								initial={{ y: 50, opacity: 0 }}
								whileInView={{
									y: 0,
									opacity: 1,
									transition: { delay: 0.14, duration: 0.3 },
								}}
								className={style.middleGap}
							>
								<label className={style.userName}>Mail</label>
								<p className="text-red-500 text-xs">{errors.email?.message}</p>
								<input
									id={style.mail}
									className={style.inputField}
									type="email"
									placeholder="Ex: abc@gmail.com"
									{...register('email')}
								/>
							</motion.div>

							{/* Phone Number */}
							<motion.div
								initial={{ y: 50, opacity: 0 }}
								whileInView={{
									y: 0,
									opacity: 1,
									transition: { delay: 0.14, duration: 0.3 },
								}}
								className={style.middleGap}
							>
								<label className={style.userName}>Number</label>
								<p className="text-red-500 text-xs">{errors.number?.message}</p>
								<input
									className={style.inputField}
									type="text"
									id={style.number}
									placeholder="(+88) 0123456789"
									{...register('number')}
								/>
							</motion.div>

							{/* Message */}
							<motion.div
								initial={{ y: 50, opacity: 0 }}
								whileInView={{
									y: 0,
									opacity: 1,
									transition: { delay: 0.14, duration: 0.3 },
								}}
								className={style.middleGap}
							>
								<label className={style.userName}>Message</label>
								<p className="text-red-500 text-xs">
									{errors.message?.message}
								</p>
								<textarea
									className={style.message}
									placeholder="Type here"
									{...register('message')}
								/>
							</motion.div>

							{/* Submit */}
							<motion.button
								initial={{ y: 50, opacity: 0 }}
								whileInView={{
									y: 0,
									opacity: 1,
									transition: { delay: 0.14, duration: 0.3 },
								}}
								className={style.submitBtn}
								type="submit"
								disabled={isLoading}
							>
								{isLoading ? 'Sending...' : 'Send'}
							</motion.button>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Contact;
