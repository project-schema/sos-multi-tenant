import { env, getApiData } from '@/lib';
import { iFooterMedia, iSettingsType } from '@/types';
import { MapPin, Phone } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import style from './footer-center.module.css';
async function FooterCenter() {
	const settings = await getApiData<iSettingsType>('/settings');
	const mediaLink = await getApiData<iFooterMedia>('/footer-medias');

	if (settings?.status !== 200 || mediaLink?.status !== 200) {
		return notFound();
	}

	return (
		<div className={style.footerCenter}>
			<div className={style.companyInfo}>
				{settings.message?.logo && (
					<Link href="/">
						<Image
							className={style.companyLogo}
							alt="logo"
							width={202}
							height={60}
							loading="eager"
							// src={`${imgUrl}/${data?.footer_image}`}
							src={`${env.baseAPI}/${settings.message?.logo}`}
							unoptimized
							// src={data?.logo ? `${imgUrl}/${data?.logo}` : logo}
						/>
					</Link>
				)}
				<p className={style.infoSubTitle}>
					{settings.message?.footer_description}
				</p>
				<div className={style.socialLinks}>
					{mediaLink?.message?.map((data: any, i) => (
						<div key={i}>
							<a href={data?.media_link} target="_black">
								{/* <IconPickerItem
									icon={data?.icon_class}
									size={30}
									color="#fafafa"
								/> */}
							</a>
						</div>
					))}
				</div>
			</div>
			<div className={style.services}>
				<h5 className={style.center__head}>Services</h5>
				<div className={style.servicesLists}>
					<Link className={style.center_list} href={''}>
						Digital Marketing
					</Link>
					<Link className={style.center_list} href={''}>
						Digital Marketing
					</Link>
					<Link className={style.center_list} href={''}>
						Digital Marketing
					</Link>
					<Link className={style.center_list} href={''}>
						Digital Marketing
					</Link>
				</div>
			</div>
			<div className={style.links}>
				<h5 className={style.center__head}>Links</h5>
				<div className={style.servicesLists}>
					<Link className={style.center_list} href="/about-us">
						About us
					</Link>
					<Link className={style.center_list} href="/services">
						Services
					</Link>
					<Link className={style.center_list} href="/advertise">
						Advertise
					</Link>
					<Link className={style.center_list} href="/pricing">
						Pricing
					</Link>
					<Link className={style.center_list} href={''}>
						Terms & Register
					</Link>
					<Link className={style.center_list} href="/contact-us">
						Contact us
					</Link>
				</div>
			</div>
			<div className={style.contact}>
				<h5 className={style.center__head}>Contact</h5>
				<div className={style.contactInfoBox}>
					<MapPin className="size-8 text-white" />
					<p className={style.con_info_txt}>
						{settings.message?.footer_contact_address}
					</p>
				</div>
				<div className={style.contactInfoBox}>
					<Phone className="size-5 text-white" />
					<p className={style.con_info_txt}>
						{settings.message?.footer_contact_number}
					</p>
				</div>
			</div>
		</div>
	);
}

export default FooterCenter;
