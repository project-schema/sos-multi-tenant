'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { useStoreContactMutation } from './api-slice';

// Zod schema for contact form
const contactSchema = z.object({
	name: z.string().min(1, 'Name is required').trim(),
	email: z.string().email('Invalid email address').trim(),
	subject: z.string().min(1, 'Subject is required').trim(),
	message: z.string().min(1, 'Message is required').trim(),
});

type ContactFormInputs = z.infer<typeof contactSchema>;

// Google Maps Component
const GoogleMap = () => {
	return (
		<div className="w-full h-full rounded-xl">
			<iframe
				src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.902!2d90.389!3d23.750!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8b33cffc3fb%3A0x4a826f475fd312af!2sDhaka%2C%20Bangladesh!5e0!3m2!1sen!2s!4v1703123456789!5m2!1sen!2s"
				width="100%"
				height="100%"
				style={{ border: 0 }}
				allowFullScreen
				loading="lazy"
				referrerPolicy="no-referrer-when-downgrade"
				title="Google Maps Location"
			/>
		</div>
	);
};

const ContactPage = () => {
	const [storeContact, { isLoading }] = useStoreContactMutation();

	const form = useForm<ContactFormInputs>({
		resolver: zodResolver(contactSchema),
		defaultValues: {
			name: '',
			email: '',
			subject: '',
			message: '',
		},
	});

	const onSubmit = async (data: ContactFormInputs) => {
		try {
			const result = await storeContact(data).unwrap();
			toast.success(result.message || 'Message sent successfully!');
			form.reset();
		} catch (error: any) {
			toast.error(error?.data?.message || 'Failed to send message');
		}
	};

	return (
		<div className=" pt-10 md:pt-20 bg-gray-50  ">
			<div className="layout">
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 max-w-7xl mx-auto">
					{/* Left Side - Google Map */}
					<motion.div
						initial={{ opacity: 0, x: -50 }}
						whileInView={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.6 }}
						className="  rounded-xl overflow-hidden shadow-xl   "
					>
						<GoogleMap />
					</motion.div>

					{/* Right Side - Contact Form */}
					<motion.div
						initial={{ opacity: 0, x: 50 }}
						whileInView={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.6 }}
						className="flex justify-center items-center"
					>
						<Card className="w-full max-w-md border-none shadow-xl md:max-w-none">
							<CardHeader>
								<CardTitle className="text-base">Got Any Questions?</CardTitle>
							</CardHeader>
							<CardContent>
								<Form {...form}>
									<form
										onSubmit={form.handleSubmit(onSubmit)}
										className="space-y-6"
									>
										<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
											<FormField
												control={form.control}
												name="name"
												render={({ field }) => (
													<FormItem>
														<FormLabel>Name *</FormLabel>
														<FormControl>
															<Input
																placeholder="Enter your full name"
																{...field}
															/>
														</FormControl>
														<FormMessage />
													</FormItem>
												)}
											/>

											<FormField
												control={form.control}
												name="email"
												render={({ field }) => (
													<FormItem>
														<FormLabel>Email *</FormLabel>
														<FormControl>
															<Input
																type="email"
																placeholder="Enter your email address"
																{...field}
															/>
														</FormControl>
														<FormMessage />
													</FormItem>
												)}
											/>
										</div>

										<FormField
											control={form.control}
											name="subject"
											render={({ field }) => (
												<FormItem>
													<FormLabel>Subject *</FormLabel>
													<FormControl>
														<Input placeholder="Enter the subject" {...field} />
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>

										<FormField
											control={form.control}
											name="message"
											render={({ field }) => (
												<FormItem>
													<FormLabel>Message *</FormLabel>
													<FormControl>
														<Textarea
															placeholder="Enter your message"
															className="min-h-[120px]"
															{...field}
														/>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>

										<Button
											type="submit"
											className="w-auto"
											disabled={isLoading}
										>
											{isLoading && (
												<Loader2 className="mr-2 h-4 w-4 animate-spin" />
											)}
											{isLoading ? 'Sending...' : 'Send Message'}
										</Button>
									</form>
								</Form>
							</CardContent>
						</Card>
					</motion.div>
				</div>
			</div>
		</div>
	);
};

export default ContactPage;
