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
import { useStoreContactMutation } from '@/store/features/frontend/contact/api-slice';
import { iSystem } from '@/store/features/vendor/cms/system/type';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { Loader2, Mail, MapPin, Phone } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

// Zod schema for contact form
const contactSchema = z.object({
	name: z.string().min(1, 'Name is required').trim(),
	email: z.string().email('Invalid email address').trim(),
	subject: z.string().min(1, 'Subject is required').trim(),
	message: z.string().min(1, 'Message is required').trim(),
});

type ContactFormInputs = z.infer<typeof contactSchema>;

const ContactSection = ({ cms }: { cms: iSystem }) => {
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
		<div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14 2xl:py-24">
			<div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6">
				{/* Left Side -  Contact info*/}
				<motion.div
					initial={{ opacity: 0, x: -50 }}
					whileInView={{ opacity: 1, x: 0 }}
					transition={{ duration: 0.6 }}
					className="rounded-xl overflow-hidden lg:col-span-4"
				>
					<Card>
						<CardHeader>
							<CardTitle className="text-base">Our Info</CardTitle>
						</CardHeader>
						<CardContent className="space-y-6">
							{(cms?.footer_contact_number_one ||
								cms?.footer_contact_number_two) && (
								<div className="flex  items-center gap-3 border rounded-md p-4">
									<div className="h-12 w-12 rounded-md bg-black text-white flex items-center justify-center">
										<Phone className="w-8 h-8" />
									</div>
									<div className="flex flex-col">
										{cms?.footer_contact_number_one && (
											<a
												href={`tel:${cms?.footer_contact_number_one}`}
												className="text-gray-900"
											>
												{cms?.footer_contact_number_one}
											</a>
										)}
										{cms?.footer_contact_number_two && (
											<a
												href={`tel:${cms?.footer_contact_number_two}`}
												className="text-gray-900"
											>
												{cms?.footer_contact_number_two}
											</a>
										)}
									</div>
								</div>
							)}

							<div className="flex  items-center gap-3 border rounded-md p-4">
								<div className="h-12 w-12 rounded-md bg-black text-white flex items-center justify-center">
									<Mail className="w-8 h-8" />
								</div>
								<p className="text-gray-900">{cms?.contact_email}</p>
							</div>

							{(cms?.footer_contact_address_one ||
								cms?.footer_contact_address_two) && (
								<div className="flex  items-center gap-3 border rounded-md p-4">
									<div className="h-12 w-12 rounded-md bg-black text-white flex items-center justify-center">
										<MapPin className="w-8 h-8" />
									</div>
									<div>
										{cms?.footer_contact_address_one && (
											<p className="text-gray-900">
												{cms?.footer_contact_address_one}
											</p>
										)}
										{cms?.footer_contact_address_two && (
											<p className="text-gray-900">
												{cms?.footer_contact_address_two}
											</p>
										)}
									</div>
								</div>
							)}
						</CardContent>
					</Card>
				</motion.div>

				{/* Right Side - Contact Form */}
				<motion.div
					initial={{ opacity: 0, x: 50 }}
					whileInView={{ opacity: 1, x: 0 }}
					transition={{ duration: 0.6 }}
					className="lg:col-span-8"
				>
					<Card>
						<CardHeader>
							<CardTitle className="text-base">
								CONTACT US FOR ANY QUESTIONS
							</CardTitle>
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
										className="w-auto bg-orange-500 hover:bg-orange-500/80"
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
	);
};

export default ContactSection;
