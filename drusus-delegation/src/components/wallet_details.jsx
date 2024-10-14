import React, { useContext, useEffect, useState } from "react";
import { MetamaskContext } from "../utils/Metamask";
import { getcurrentepoch } from "../utils/web3";

const WalletDetails = ({ availablepercentage, delegate }) => {
  const {
    address,
    balance,
    wrappedbalance,
    claimable,
    unclaimable,
    network,
    isconnected: connected,
  } = useContext(MetamaskContext);
  const rucheaddress =
    network === "0x13"
      ? process.env.REACT_APP_ADDRESS_SGB
      : process.env.REACT_APP_ADDRESS_FLR;
  const [currentepoch, setcurrentepoch] = useState(null);
  useEffect(() => {
    const getepoch = async () => {
      const epoch = await getcurrentepoch();
      setcurrentepoch(epoch);
    };

    getepoch();
  }, [rucheaddress]);

  return (
    <div className="py-4">
      <div className="container p-3">
        <div className="row">
          <div className="col-md-6">
            <h2>Wallet Details</h2>
            <p className="w-100 text-truncate">
              Address : <span className="fw-bold "> {address}</span>
            </p>
            <p className="w-100 text-truncate">
              DRUSUS address :{" "}
              <span className="fw-bold text-truncate">
                {" "}
                {connected && rucheaddress}
              </span>
            </p>
            <p>
              Current reward epoch :{" "}
              <span className="fw-bold"> {currentepoch}</span>
            </p>
            <p>
              {!connected
                ? "Wrapped token "
                : network === "0x13"
                ? "WSGB "
                : "WFLR "}
              in wallet in current reward snapshot :{""}{" "}
              <span className="fw-bold"> {unclaimable}</span>
            </p>
          </div>
          <div className="col-md-6">
            <p>
              Available percentage to delegate:{" "}
              <span className="fw-bold">
                {connected && availablepercentage + "%"}
              </span>
            </p>
            <p>
              {!connected ? "Token" : network === "0x13" ? "SGB" : "FLR"} in
              wallet :{" "}
              <span className="fw-bold">
                {connected && (
                  <>
                    {balance.toFixed(2)} {network === "0x13" ? "SGB" : "FLR"}
                  </>
                )}
              </span>
            </p>
            <p>
              {!connected
                ? "Wrapped token "
                : network === "0x13"
                ? "WSGB "
                : "WFLR "}
              in wallet :{" "}
              <span className="fw-bold">
                {connected && (
                  <>
                    {Number(wrappedbalance).toFixed(2)} W
                    {network === "0x13" ? "SGB" : "FLR"}
                  </>
                )}
              </span>
            </p>
            <p>
              Percentage delegated to our FTSO :{" "}
              <span className="fw-bold">{connected && delegate + "%"}</span>
            </p>
            <p>
              Pending rewards :{" "}
              <span className="fw-bold">
                {connected && (
                  <>
                    {unclaimable} W{network === "0x13" ? "SGB" : "FLR"}
                  </>
                )}
              </span>
            </p>
            <p>
              Rewards available to claim :{" "}
              <span className="fw-bold">
                {connected && (
                  <>
                    {claimable} W{network === "0x13" ? "SGB" : "FLR"}
                  </>
                )}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalletDetails;
