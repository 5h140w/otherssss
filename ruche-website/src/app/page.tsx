import DelegateAddresses from "@/components/DelegateAddresses";
import Feature from "@/components/Feature";
import WelcomePage from "@/components/WelcomePage";
import bg1Image from "@/image/bg1.jpg";
import bg2Image from "@/image/bg2.jpg";
import bg4Image from "@/image/bg4.jpg";
import bg5Image from "@/image/bg5.jpg";

export default function Home() {
  return (
    <div className="App">
      <main>
        <WelcomePage />
        <Feature
          image={bg2Image}
          title="Understanding Flare Network"
          description="Flare is a blockchain designed for information integration. As a Layer 1 blockchain similar to Ethereum, it includes advanced data acquisition capabilities. This allows developers to access high-integrity data from various blockchains and the internet in a decentralized manner. Consequently, it supports the development of dapps with innovative use cases and monetization strategies, enabling them to operate across multiple chains with a single deployment."
          imageSide="right"
        />
        <Feature
          image={bg1Image}
          title="Understanding FTSO"
          description="The Flare Time Series Oracle (FTSO) provides highly decentralized time series information feeds to dapps on the Flare network."
          imageSide="left"
          buttonType="primary"
          buttonText="Delegate Now"
          buttonUrl="#delegate-addresses"
        />
        <Feature
          image={bg4Image}
          title="Earning Through Token Delegation"
          description="Delegate your votes to our FTSO, we will work hard to provide the most accurate price to both Flare and Songbird blockchains. Ruche as an FTSO will do its best to supply the Flare Network with state-of-the-art accuracy and timeliness."
          imageSide="right"
          buttonType="secondary"
          buttonText="Delegate Now"
          buttonUrl="#delegate-addresses"
        />
        <Feature
          image={bg5Image}
          title="Delegate with Ease"
          description="You can safely and seamlessly delegate to our provider using  "
          imageSide="left"
          link={"https://ftso.alexdupre.com/"}
          textlink={"A-FTSO website"}
        />
        <DelegateAddresses />
      </main>
    </div>
  );
}
