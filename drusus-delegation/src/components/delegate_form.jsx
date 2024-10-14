import React, { useContext, useEffect, useState } from "react";
import { MetamaskContext } from "../utils/Metamask";
import {
  delegate,
  getAvailableDelegations,
  getRucheDelegations,
} from "../utils/web3";
import { toast } from "react-toastify";

const DelegateForm = ({ setloading, setdelegate }) => {
  const { network, reset, isconnected } = useContext(MetamaskContext);
  const rucheaddress =
    network === "0x13"
      ? process.env.REACT_APP_ADDRESS_SGB
      : process.env.REACT_APP_ADDRESS_FLR;
  const [percentage, setpercentage] = useState(0);
  const [available, setavailable] = useState(0);
  useEffect(() => {
    const getaavailable = async () => {
      const availabledelegation = await getAvailableDelegations(rucheaddress);
      setavailable(availabledelegation);
    };

    getaavailable();
  }, [rucheaddress]);

  const max = () => {
    setpercentage(available);
  };

  const HandleDelegate = async (e) => {
    e.preventDefault();
    setloading(true);
    await delegate(percentage, rucheaddress)
      .then(() => {
        setpercentage(0);
        toast.success("Delegated");
        reset();
      })
      .catch((err) => {
        console.log(err);
        toast.error("Something went wrong");
      });
    reset();
    const delegateruche = await getRucheDelegations(rucheaddress);
    setdelegate(delegateruche);
    setloading(false);
  };

  return (
    <div className="my-4">
      <div className="container p-3">
        <div className="row">
          <div className="col-md-6">
            <h2>
              Step 2 - Delegate Your W
              {!isconnected ? "FLR/WSGB" : network === "0x13" ? "SGB" : "FLR"}
            </h2>
            <p>
              Delegate (or undelegate) your W
              {!isconnected ? "FLR/WSGB" : network === "0x13" ? "SGB" : "FLR"}{" "}
              to our FTSO
            </p>
          </div>
          <div className="col-md-6">
            <form onSubmit={HandleDelegate}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Delegate percentage
                </label>
                <input
                  value={percentage}
                  onChange={(e) => setpercentage(Number(e.target.value))}
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
                  style={{ background: "#b78429", color: "white" }}
                  disabled={!isconnected}
                >
                  Delegate
                </button>
                <button
                  onClick={max}
                  type="button"
                  className="btn "
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
    </div>
  );
};

export default DelegateForm;
