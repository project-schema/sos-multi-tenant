import Link from "next/link";
import style from "./footer-coy-right.module.css";

function FooterCopyRight({ settingsData }: any) {
  const data = settingsData?.message;

  return (
    <div className={style.footerCopyRight}>
      <p className={style.footerCopyRight__content}>
        <span className={style.footerCopyRight__text}>
          {data?.copywright_text}
        </span>
        <span className={style.footerCopyRight__owner}>
          Design & Develop By
          <Link
            style={{ margin: "0 5px" }}
            href={data?.credit_link || "/"}
            target="_blank"
            className={style.__ownerName}
          >
            {data?.credit_name}
          </Link>
          With lot of 🍵 & ❤️
        </span>
      </p>
      <div className={style.footerCopyRight__links}>
        <Link href={"/"} className={style.footerCopyRight__Link}>
          Privacy Policy
        </Link>
        <Link href={"/"} className={style.footerCopyRight__Link}>
          Terms of Service
        </Link>
        <Link href={"/"} className={style.footerCopyRight__Link}>
          Cookies Settings
        </Link>
      </div>
    </div>
  );
}

export default FooterCopyRight;
