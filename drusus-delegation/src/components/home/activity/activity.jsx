import React from "react";

const Activity = () => {
  return (
    <section id="services" className="section services-section">
      <h2>Our Activity</h2>
      <div className="service-cards">
        <div className="service-card">
          <h3>Performant FTSO Price Provision</h3>
          <p>
            We collect, aggregate the best centralized and decentralized data.
            We then process it and feed our machine learning algorithm to
            provide you with the best possible success rates on each pair.
          </p>
        </div>
        <div className="service-card">
          <h3>Flare Ecosystem Engagement</h3>
          <p>
            We are currently working on another Roman Dapp on the Flare
            ecosystem that we are sure you will enjoy using.
          </p>
        </div>
        <div className="service-card">
          <h3>Secure Token Delegation (soon)</h3>
          <p>
            You will be soon able to delegate using our proprietary platform.
            For now you can delegate using the following smart contracts or the
            Bifrost wallet.
          </p>
        </div>
      </div>
      <div className="btns_contract">
        <a
          target="__blank"
          className="primaryButton"
          href="https://flare-explorer.flare.network/address/0x1D80c49BbBCd1C0911346656B529DF9E5c2F783d"
        >
          Bifrost wallet
        </a>
        <a
          target="__blank"
          className="primaryButton"
          href="https://songbird-explorer.flare.network/address/0x02f0826ef6aD107Cfc861152B32B52fD11BaB9ED/write-contract#address-tabs"
        >
          delegation's SC
        </a>
      </div>
    </section>
  );
};

export default Activity;
