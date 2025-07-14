import Image from "next/image";
import style from "./servicesCard.module.css";
import { ICON } from "@/lib/img";

function ServicesCard() {
  return (
    <div className={style.wrap}>
      <div className={style.icon}>
        <Image alt="icon" src={ICON.blue} className={style.ico} />
      </div>
      <h1 className={style.text}>Awesome Results</h1>
      <p className={style.paragraph}>
        We offer a wide range of affiliate programs, including commission-based
        programs, pay-per-click programs, and lead generation programs.{" "}
      </p>
    </div>
  );
}

export default ServicesCard;
