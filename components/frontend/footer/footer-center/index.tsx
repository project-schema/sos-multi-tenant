import Image from 'next/image';
import style from './footer-center.module.css';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { BASE_URL } from '@/lib/env';
function FooterCenter({ settingsData }: any) {
	const [mediaLink, setMediaLink] = useState([]);
	const data = settingsData?.message;
	const imgUrl = BASE_URL;

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch(BASE_URL + '/api/footer-medias');
				const data = await response?.json();
				setMediaLink(data?.message);
			} catch (err) {}
		};
		fetchData();
	}, []);

	return (
		<div className={style.footerCenter}>
			<div className={style.companyInfo}>
				{data?.footer_image && (
					<Link href="/">
						<Image
							className={style.companyLogo}
							alt="logo"
							width={202}
							height={60}
							loading="eager"
							// src={`${imgUrl}/${data?.footer_image}`}
							src={`${imgUrl}/${data?.logo}`}
							// src={data?.logo ? `${imgUrl}/${data?.logo}` : logo}
						/>
					</Link>
				)}
				<p className={style.infoSubTitle}>{data?.footer_description}</p>
				<div className={style.socialLinks}>
					{mediaLink?.map((data: any, i) => (
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
					{/* <Image alt="map" src={ICON.map} /> */}
					<p className={style.con_info_txt}>{data?.footer_contact_address}</p>
				</div>
				<div className={style.contactInfoBox}>
					{/* <Image alt="map" src={ICON.call} /> */}
					<p className={style.con_info_txt}>{data?.footer_contact_address}</p>
				</div>
			</div>
		</div>
	);
}

export default FooterCenter;
