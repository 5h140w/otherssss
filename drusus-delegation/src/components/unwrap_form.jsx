import React, { useContext, useState } from "react";
import { MetamaskContext } from "../utils/Metamask";
import { unwrap } from "../utils/web3";
import { ToastContainer, toast } from "react-toastify";

const UnwrapForm = ({ setloading }) => {
  const { wrappedbalance, network, reset, isconnected } =
    useContext(MetamaskContext);
  const [number, setnumber] = useState(0);
  const handleWrap = async (e) => {
    e.preventDefault();
    setloading(true);
    await unwrap(number.toString())
      .then(() => {
        setnumber(0);
        toast.success("unwrapped successfully");
      })
      .catch((e) => {
        toast.error("Something went wrong");
      });
    reset();
    setloading(false);
  };
  const max = () => {
    wrappedbalance > 0 ? setnumber(Number(wrappedbalance)) : setnumber(0);
  };
  return (
    <div className="my-4">
      <div className="container p-3">
        <div className="row">
          <div className="col-md-6">
            <h2>
              Unwrap Your W
              {!isconnected ? "FLR/WSGB" : network === "0x13" ? "SGB" : "FLR"}
            </h2>
            <p>
              Unwrap your W{network === "0x13" ? "SGB" : "FLR"} if you wish to
              no longer delegate
            </p>
          </div>
          <div className="col-md-6">
            <form onSubmit={handleWrap}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  W
                  {!isconnected
                    ? "FLR/WSGB"
                    : network === "0x13"
                    ? "SGB"
                    : "FLR"}{" "}
                  Amount
                </label>
                <input
                  onChange={(e) => setnumber(Number(e.target.value))}
                  value={number}
                  type="number"
                  className="form-control"
                  id="name"
                  required
                />
              </div>
              <div className="mb-3">
                <button
                  type="submit"
                  className="btn me-4"
                  style={{ background: "#b78429", color: "white" }}
                  disabled={!isconnected}
                >
                  Submit
                </button>
                <button
                  onClick={max}
                  type="button"
                  className="btn"
                  style={{ background: "#b78429", color: "white" }}
                  disabled={!isconnected}
                >
                  Max
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default UnwrapForm;
