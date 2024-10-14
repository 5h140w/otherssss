import React, { useContext } from "react";
import { MetamaskContext } from "../utils/Metamask";
import { claim } from "../utils/web3";
import { ToastContainer, toast } from "react-toastify";

const ClaimReward = ({ setloading }) => {
  const { network, address, reset, isconnected } = useContext(MetamaskContext);
  const claimAllReward = async () => {
    setloading(true);
    await claim(address)
      .then(() => {
        toast.done("Reward Claimed");
      })
      .catch((e) => {
        toast.error("Something went wrong");
      });
    reset();
    setloading(false);
  };
  return (
    <div className="my-4">
      <div className="container p-3">
        <div className="row">
          <div className="col-md-6">
            <h2>Step 3 - Claim Rewards!</h2>
            <p>
              Claim rewards gained from delegating{" "}
              {!isconnected ? "your token" : network === "0x13" ? "SGB" : "FLR"}
            </p>
          </div>
          <div className="col-md-6">
            <div className="mb-3">
              <button
                className="btn"
                style={{ background: "#b78429", color: "white" }}
                onClick={claimAllReward}
                disabled={!isconnected}
              >
                Claim all available rewards
              </button>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ClaimReward;
