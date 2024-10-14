import React, { useContext, useState } from "react";
import { MetamaskContext } from "../utils/Metamask";
import { wrap } from "../utils/web3";
import { ToastContainer, toast } from "react-toastify";

const WrapForm = ({ setloading }) => {
  const { balance, network, reset, isconnected } = useContext(MetamaskContext);

  const [number, setnumber] = useState(0);
  const handleWrap = async (e) => {
    setloading(true);
    e.preventDefault();
    await wrap(number.toString())
      .then(() => {
        setnumber(0);
        toast.success("Wrapped successfully");
      })
      .catch((e) => {
        toast.error("Something went wrong");
        return e;
      });
    reset();
    setloading(false);
  };
  const max = () => {
    balance > 0.5 ? setnumber(Number(balance - 0.5)) : setnumber(0);
  };

  return (
    <div className="my-4">
      <div className="container p-3">
        <div className="row">
          <div className="col-md-6">
            <h2>
              Step 1 - Wrap Your{" "}
              {!isconnected ? "FLR/SGB" : network === "0x13" ? "SGB" : "FLR"}
            </h2>
            <p>
              Wrap your{" "}
              {!isconnected ? "FLR/SGB" : network === "0x13" ? "SGB" : "FLR"} so
              it can be delegated to an FTSO
            </p>
          </div>
          <div className="col-md-6">
            <form onSubmit={handleWrap}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  {!isconnected
                    ? "FLR/SGB"
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
                  className="btn  me-4"
                  style={{ backgroundColor: "#b78429", color: "white" }}
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

export default WrapForm;
