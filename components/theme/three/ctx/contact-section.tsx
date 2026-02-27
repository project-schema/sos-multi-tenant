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
import { socialIcons } from '@/lib/icon/social-icon';
import { useStoreContactMutation } from '@/store/features/frontend/contact/api-slice';
import { iTenantFrontend } from '@/types/tenant-frontend';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { Loader2, Mail, MapPin, Phone } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
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

const ContactSection = ({ settings }: { settings?: iTenantFrontend }) => {
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
	const socialLinks = [
		{
			key: 'fb_url',
			label: 'Facebook',
			icon: socialIcons.fb,
		},
		{
			key: 'x_url',
			label: 'X (Twitter)',
			icon: socialIcons.x,
		},
		{
			key: 'instagram_url',
			label: 'Instagram',
			icon: socialIcons.ins,
		},
		{
			key: 'tiktok_url',
			label: 'TikTok',
			icon: socialIcons.tiktok,
		},
		{
			key: 'youtube_url',
			label: 'YouTube',
			icon: socialIcons.youtube,
		},
		{
			key: 'telegram_url',
			label: 'Telegram',
			icon: socialIcons.telegram,
		},
		{
			key: 'whatsapp_url',
			label: 'WhatsApp',
			icon: socialIcons.whatsAPP,
		},
	];
	return (
		<div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
			{/* Left Side - Google Map */}
			<motion.div
				initial={{ opacity: 0, x: -50 }}
				whileInView={{ opacity: 1, x: 0 }}
				transition={{ duration: 0.6 }}
				className="  rounded-xl overflow-hidden bg-primary3/15 p-4 lg:p-8"
			>
				<h2 className="text-xl font-semibold">Contact Information</h2>
				<div className="my-8">
					<ul className="space-y-4">
						<li>
							<div className="flex items-center gap-3">
								<div>
									<MapPin className="w-4 h-4 text-gray-600" />
								</div>
								<div>
									{settings?.cms?.footer_contact_address_one || 'No Address'}{' '}
									<br />
									{settings?.cms?.footer_contact_address_two}
								</div>
							</div>
						</li>
						<li>
							<div className="flex items-center gap-3">
								<div>
									<Phone className="w-4 h-4 text-gray-600" />
								</div>
								<div>
									{settings?.cms?.footer_contact_number_one || 'No Number'}{' '}
									<br />
									{settings?.cms?.footer_contact_number_two}
								</div>
							</div>
						</li>
						<li>
							<div className="flex items-center gap-3">
								<div>
									<Mail className="w-4 h-4 text-gray-600" />
								</div>
								<div>{settings?.cms?.contact_email || 'No Email'}</div>
							</div>
						</li>
					</ul>
				</div>
				<div className="flex gap-1 flex-wrap">
					{socialLinks?.map((social) => {
						const url =
							settings?.cms?.[social.key as keyof typeof settings.cms];

						if (!url) return null;

						return (
							<Link
								key={social.key}
								href={url as string}
								className="w-8 h-8  rounded-full flex items-center justify-center  transition-all duration-200"
								aria-label={social.label}
								prefetch={false}
							>
								<Image
									src={social.icon}
									width={1000}
									height={1000}
									alt={social.label}
									className="w-5 h-5 object-contain hover:scale-110 transition-all"
								/>
							</Link>
						);
					})}
				</div>
			</motion.div>

			{/* Right Side - Contact Form */}
			<motion.div
				initial={{ opacity: 0, x: 50 }}
				whileInView={{ opacity: 1, x: 0 }}
				transition={{ duration: 0.6 }}
				className="flex justify-center items-center"
			>
				<Card className="w-full border-none shadow">
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
	);
};

export default ContactSection;
