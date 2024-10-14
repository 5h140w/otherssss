import React from "react";
import styles from "./Feature.module.css";
import Image, { StaticImageData } from "next/image";

interface FeatureProps {
  image: StaticImageData;
  title: string;
  description: string;
  imageSide: string;
  buttonType?: string;
  buttonText?: string;
  buttonUrl?: string;
  link?: string;
  textlink?: string;
}

const Feature = ({
  image,
  title,
  description,
  imageSide,
  buttonType,
  buttonText,
  buttonUrl,
  link,
  textlink,
}: FeatureProps) => {
  const imageOrderClass =
    imageSide === "right" ? styles.imageRight : styles.imageLeft;
  const buttonClass =
    buttonType === "primary" ? "primaryButton" : "secondaryButton";

  return (
    <section className={`${styles.feature} ${imageOrderClass}`}>
      <div className={`${styles.imageContainer}`}>
        <Image src={image} alt={title} className={styles.featureImage} />
      </div>
      <div className={styles.textContentContainer}>
        <div className={styles.textContent}>
          <h2>{title}</h2>
          <p>
            {description}{" "}
            <span>
              <a href={link} target="__blank">
                {textlink}
              </a>
            </span>{" "}
          </p>{" "}
          {buttonText && (
            <center>
              <a href={buttonUrl} className={buttonClass}>
                {buttonText}
              </a>
            </center>
          )}
        </div>
      </div>
    </section>
  );
};

export default Feature;
