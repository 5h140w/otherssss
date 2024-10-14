import React from "react";
import styles from "./Hero.module.css";

const Hero = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.imageContainer}>
        <div className={styles.heroImage}></div>
      </div>
      <div className={styles.textContent}>
        <h1>
          <span className={styles.highlight}>Проверенная</span> недвижимость для
          жизни и&nbsp;инвестиций
        </h1>
        <p>
          Присматриваетесь к недвижимости в Сочи, Адлере или на
          Красной&nbsp;Поляне?
        </p>
        <p>
          <b>Я — Владислав Носков, эксперт по недвижимости</b>
        </p>
        <p>
          Свяжитесь со&nbsp;мной, и&nbsp;я предложу вам
          самые&nbsp;лучшие&nbsp;варианты.
        </p>
        <center>
          <p>
            <a href="tel:+79519361533" className={styles.phoneNumber}>
              +7 (951) 936-15-33
            </a>
          </p>
        </center>
      </div>
    </section>
  );
};

export default Hero;
