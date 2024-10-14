import React from "react";
import "./DelegateAddresses.css";

const DelegateAddresses = () => {
  return (
    <section className="delegate-addresses" id="delegate-addresses">
      <h2>Delegation Addresses</h2>
      <p>
        To delegate your <strong>SGB</strong> tokens, please use the address:{" "}
        <code>0x82f954918b9FB81E59b83606e82B2fC0d5BDC1aC</code>
      </p>
      <br />
      <p>
        For delegating <strong>FLR</strong> tokens, use the address:{" "}
        <code>0x8CD07C2fA3444f1FB6B6a46e272C450E28F6a541</code>
      </p>
      <br />
      <p>
        This is your keys to participating in the revenue distribution from the
        FTSO operations.
      </p>
    </section>
  );
};

export default DelegateAddresses;
