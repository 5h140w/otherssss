import React, { useContext, useEffect, useState } from "react";
import WalletDetails from "../components/wallet_details";
import WrapForm from "../components/wrap_form";
import DelegateForm from "../components/delegate_form";
import ClaimReward from "../components/claim_reward";
import LoadingSpinner from "../components/loading";
import UnwrapForm from "../components/unwrap_form";
import { getAvailableDelegations, getRucheDelegations } from "../utils/web3";
import { MetamaskContext } from "../utils/Metamask";
import Navbar from "../components/globals/navbar";
import Contact from "../components/home/contact/contact";
import Footer from "../components/globals/footer";
import Hero from "../components/hero_delegate";

const DelgatePage = () => {
  const [loading, setloading] = useState(false);
  const { network } = useContext(MetamaskContext);
  const rucheaddress =
    network === "0x13"
      ? process.env.REACT_APP_ADDRESS_SGB
      : process.env.REACT_APP_ADDRESS_FLR;
  const [availablepercentage, setavailable] = useState(0);
  const [delegate, setdelegate] = useState(0);
  useEffect(() => {
    const getdata = async () => {
      const available = await getAvailableDelegations(rucheaddress);
      setavailable(available);
      const ruchepercentage = await getRucheDelegations(rucheaddress);
      setdelegate(ruchepercentage);
    };
    getdata();
  }, [rucheaddress]);

  return (
    <>
      <div className={`overlay ${loading ? "show" : ""}`}>
        <LoadingSpinner />
      </div>

      <div className={`content ${loading ? "hide" : ""}`}>
        <Navbar />
        <Hero />
        <WalletDetails
          availablepercentage={availablepercentage}
          delegate={delegate}
        />
        <WrapForm setloading={setloading} />
        <DelegateForm setloading={setloading} setdelegate={setdelegate} />
        <ClaimReward setloading={setloading} />
        <UnwrapForm setloading={setloading} />
        <Contact />
        <Footer />
      </div>
    </>
  );
};

export default DelgatePage;
