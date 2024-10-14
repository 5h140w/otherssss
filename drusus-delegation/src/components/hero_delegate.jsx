import React, { useContext } from "react";
import { MetamaskContext } from "../utils/Metamask";
import mainBg from "./../bg.jpg";

const Hero = () => {
  const Data = useContext(MetamaskContext);
  return (
    <div
      className="hero_section section main-text-section"
      style={{ backgroundImage: `url(${mainBg})` }}
    >
      <div className="container py-5 text-white text-center">
        <h3>DELEGATE YOUR SGB AND FLR</h3>
        <div className="pt-3 d-flex justify-content-center align-items-center">
          {!Data.isconnected ? (
            <>
              <button
                className="btn primaryButton me-3"
                onClick={() => Data.connect("0x13")}
              >
                Connect SGB
              </button>
              <button
                className="btn primaryButton ms-3"
                onClick={() => Data.connect("0xe")}
              >
                Connect FLR
              </button>
            </>
          ) : (
            <>
              <button
                className="btn primaryButton me-3"
                onClick={() => Data.SwitchNetwork()}
              >
                Switch Network
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Hero;
