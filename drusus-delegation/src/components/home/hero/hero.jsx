import React from "react";
import videoBg from "../../../bg.jpg";
import videoWebm from "./video/videoSochi.webm";
import videoMp from "./video/videoSochi.mp4";

const Hero = () => {
  return (
    <section id="home" className="section home-section">
      <video autoPlay muted loop playsInline poster={videoBg}>
        <source src={videoWebm} type='video/webm; codecs="vp8, vorbis"' />
        <source
          src={videoMp}
          type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"'
        />
      </video>
      <div className="video-content">
        <h1>Join the Roman Legion and Earn with Us!</h1>
        <p>
          Join us! Like Roman legionaries on the battlefield, we fight for the
          most accurate data to bring you maximum profit. Enlist in our ranks
          and earn while staying safe!
        </p>
        <a className="primaryButton" href="#services">
          Explore Activity
        </a>
      </div>
    </section>
  );
};

export default Hero;
