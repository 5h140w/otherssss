import React from "react";
import adaLogo from "@/image/ada.png";
import algoLogo from "@/image/algo.png";
import arbLogo from "@/image/arb.png";
import avaxLogo from "@/image/avax.png";
import bnbLogo from "@/image/bnb.png";
import btcLogo from "@/image/btc.png";
import dogeLogo from "@/image/doge.png";
import ethLogo from "@/image/eth.png";
import filLogo from "@/image/fil.png";
import flrLogo from "@/image/flr.png";
import ltcLogo from "@/image/ltc.png";
import maticLogo from "@/image/matic.png";
import solLogo from "@/image/sol.png";
import usdcLogo from "@/image/usdc.png";
import usdtLogo from "@/image/usdt.png";
import xdcLogo from "@/image/xdc.png";
import xlmLogo from "@/image/xlm.png";
import xrpLogo from "@/image/xrp.png";
import styles from "./LogoMarquee.module.css";
import Image from "next/image";

const logos = [
  adaLogo,
  algoLogo,
  arbLogo,
  avaxLogo,
  bnbLogo,
  btcLogo,
  dogeLogo,
  ethLogo,
  filLogo,
  flrLogo,
  ltcLogo,
  maticLogo,
  solLogo,
  usdcLogo,
  usdtLogo,
  xdcLogo,
  xlmLogo,
  xrpLogo,
];

const LogoMarquee = () => {
  return (
    <div className={styles.marquee}>
      <div className={styles.track}>
        {logos.map((logo, index) => (
          <Image
            src={logo}
            alt={`Logo ${index}`}
            key={index}
            className={styles.logo}
          />
        ))}
        {logos.map((logo, index) => (
          <Image
            src={logo}
            alt={`Logo duplicate ${index}`}
            key={"duplicate-" + index}
            className={styles.logo}
          />
        ))}
        {logos.map((logo, index) => (
          <Image
            src={logo}
            alt={`Logo triplicate ${index}`}
            key={"triplicate-" + index}
            className={styles.logo}
          />
        ))}
        {logos.map((logo, index) => (
          <Image
            src={logo}
            alt={`Logo quadruplicate ${index}`}
            key={"quadruplicate-" + index}
            className={styles.logo}
          />
        ))}
      </div>
    </div>
  );
};

export default LogoMarquee;
