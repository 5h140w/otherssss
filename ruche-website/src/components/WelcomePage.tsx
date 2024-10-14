import React from "react";
import styles from "./WelcomePage.module.css";
import bgMainImage from "@/image/bgMain.jpg";
import logo from "@/image/logo.png";
import LogoMarquee from "./LogoMarquee";
import Image from "next/image";

const WelcomePage = () => {
  return (
    <section
      className={styles.mainPage}
      style={{ backgroundImage: `url(${bgMainImage})` }}
    >
      <div className={styles.logoContainer}>
        <Image src={logo} className={styles.logo} alt="Ruche Logo" />
      </div>
      <div className={styles.mainContent}>
        <h1 className={styles.animatedTitle}>
          Welcome to <span style={{ color: "#fea81c" }}>Ruche</span>
        </h1>
        <p className={styles.animatedText}>
          Your trusted FTSO provider on the Flare Network.
        </p>
        <a href="#delegate-addresses" className={styles.delegateButton}>
          Delegate Now
        </a>
      </div>
      <div className={styles.logoMarqueeContainer}>
        <LogoMarquee />
      </div>
    </section>
  );
};

export default WelcomePage;
