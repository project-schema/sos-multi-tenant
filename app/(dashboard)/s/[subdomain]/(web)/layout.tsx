import { getApiData, getApiDataWithSubdomain, themeVariable } from '@/lib';
import { FrontendPageVisit } from '@/store/features/frontend';
import { iTenantFrontend } from '@/types/tenant-frontend';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Script from 'next/script';

interface TenantCheckResponse {
	success: boolean;
	message: string;
}

async function checkTenantExists(subdomain: string): Promise<boolean> {
	const response = await getApiData<TenantCheckResponse>(
		`/have/tenant/${subdomain}`
	);

	// If no response (404 or other error) or success is false, tenant doesn't exist
	return response?.success === true;
}

export default async function MySiteLayout({
	children,
	params,
}: {
	children: React.ReactNode;
	params: Promise<{ subdomain: string }>;
}) {
	const { subdomain } = await params;

	// Check if tenant exists
	const tenantExists = await checkTenantExists(subdomain);

	if (!tenantExists) {
		notFound();
	}
	const settings = await getApiDataWithSubdomain<iTenantFrontend>(
		'/tenant-frontend/cms'
	);
	return (
		<>
			{/* Theme Colors */}
			{settings?.cms && (
				<style
					dangerouslySetInnerHTML={{
						__html: themeVariable(settings.cms ?? null),
					}}
				/>
			)}

			{/* Google Analytics */}
			{settings?.cms?.scripts_google_analytics && (
				<Script
					id="ga-script"
					strategy="afterInteractive"
					dangerouslySetInnerHTML={{
						__html: settings?.cms?.scripts_google_analytics || '',
					}}
				/>
			)}

			{/* Google Tag Manager */}
			{settings?.cms?.scripts_google_tag_manager && (
				<Script
					id="gtm-script"
					strategy="afterInteractive"
					dangerouslySetInnerHTML={{
						__html: settings?.cms?.scripts_google_tag_manager || '',
					}}
				/>
			)}

			{/* Google AdSense */}
			{settings?.cms?.scripts_google_adsense && (
				<Script
					id="adsense-script"
					strategy="afterInteractive"
					dangerouslySetInnerHTML={{
						__html: settings?.cms?.scripts_google_adsense || '',
					}}
				/>
			)}

			{/* Google reCAPTCHA */}
			{settings?.cms?.scripts_google_recaptcha && (
				<Script
					id="recaptcha-script"
					strategy="afterInteractive"
					dangerouslySetInnerHTML={{
						__html: settings?.cms?.scripts_google_recaptcha || '',
					}}
				/>
			)}

			{/* Facebook Pixel */}
			{settings?.cms?.scripts_facebook_pixel && (
				<Script
					id="facebook-pixel-script"
					strategy="afterInteractive"
					dangerouslySetInnerHTML={{
						__html: settings?.cms?.scripts_facebook_pixel || '',
					}}
				/>
			)}

			{/* Facebook Messenger */}
			{settings?.cms?.scripts_facebook_messenger && (
				<Script
					id="facebook-messenger-script"
					strategy="afterInteractive"
					dangerouslySetInnerHTML={{
						__html: settings?.cms?.scripts_facebook_messenger || '',
					}}
				/>
			)}

			{/* WhatsApp Chat */}
			{settings?.cms?.scripts_whatsapp_chat && (
				<Script
					id="whatsapp-chat-script"
					strategy="afterInteractive"
					dangerouslySetInnerHTML={{
						__html: settings?.cms?.scripts_whatsapp_chat || '',
					}}
				/>
			)}

			{/* Frontend Page Visit */}
			<FrontendPageVisit />
			{children}
		</>
	);
}

export async function generateMetadata({
	params,
}: {
	params: Promise<{ subdomain: string }>;
}): Promise<Metadata> {
	const { subdomain } = await params;
	const tenantExists = await checkTenantExists(subdomain);
	const settings = await getApiDataWithSubdomain<iTenantFrontend>(
		'/tenant-frontend/cms'
	);
	if (!tenantExists) {
		return {
			title: 'Tenant not found',
		};
	}
	return {
		title: settings?.cms?.app_name || 'SOS',
		description: settings?.cms?.seo_meta_description || 'SOS Management',
		keywords: settings?.cms?.seo_meta_keywords || 'SOS, Management, Dashboard',
		authors: [{ name: settings?.cms?.seo_meta_title || 'SOS' }],
		robots: { index: true, follow: true },
		openGraph: {
			title: settings?.cms?.seo_meta_title || 'SOS',
			description: settings?.cms?.seo_meta_description || 'SOS Management',
			images: settings?.cms?.seo_meta_image || [],
		},
	};
}
