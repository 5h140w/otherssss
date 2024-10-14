import React, { createContext, useEffect, useState } from "react";
import {
  networks,
  setupNetwork,
  setProvider,
  getProvider,
  setSigner,
  getSigner,
  getNetwork,
  setNetwork,
  getWnatBalance,
  getClaimable,
  claim,
  getUnclaimable,
} from "./web3";
import { ethers } from "ethers";

export const MetamaskContext = createContext();

const MetamaskProvider = ({ children }) => {
  const [data, setdata] = useState({
    isconnected: false,
    address: "",
    balance: 0,
    network: "",
    wrappedbalance: 0,
    claimable: 0,
  });

  const connect = async (network) => {
    try {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      await checkNetwork(network);
      await checkAccount();
      if (getNetwork() !== undefined) {
        const address = await getSigner().getAddress();
        const balance = parseFloat(
          ethers.utils.formatUnits(await getSigner().getBalance(), 18)
        );
        setdata((prev) => ({
          ...prev,
          isconnected: true,
          address: address,
          balance: balance,
          network: network,
        }));
      }
    } catch (err) {
      console.error(err);
      if (err.code === 4001) console.error("Please connect to MM");
      else {
        console.error(err);
        setdata((prev) => ({ ...prev, isconnected: false, network: "" }));
      }
    }
  };

  const checkNetwork = async (network) => {
    window.ethereum.on("chainChanged", () => window.location.reload());
    let chainId = await window.ethereum.request({ method: "eth_chainId" });

    if (network === undefined) {
      if (networks[chainId] !== undefined) {
        await handleChainChanged(chainId);
      } else if (window.ethereum.isMetaMask) {
        setdata((prev) => ({ ...prev, isconnected: false, network: "" }));
      } else {
        setdata((prev) => ({ ...prev, isconnected: false, network: "" }));
      }
    } else {
      if (networks[chainId] !== undefined && chainId === network) {
        setNetwork(networks[chainId]);
        await handleChainChanged(chainId);
      } else if (window.ethereum.isMetaMask) {
        await setupNetwork(network);
        if (
          chainId === (await window.ethereum.request({ method: "eth_chainId" }))
        )
          setdata((prev) => ({ ...prev, isconnected: false, network: "" }));
      } else {
        setdata((prev) => ({ ...prev, isconnected: false, network: "" }));
      }
    }
  };

  const handleChainChanged = async (chainId) => {
    setNetwork(networks[chainId]);
    setProvider(new ethers.providers.Web3Provider(window.ethereum));
    setSigner(getProvider().getSigner());

    if (getNetwork() !== undefined) {
      const address = await getSigner().getAddress();
      const balance = parseFloat(
        ethers.utils.formatUnits(await getSigner().getBalance(), 18)
      );
      setdata((prevState) => ({
        ...prevState,
        isconnected: true,
        address: address,
        balance: balance,
        network: chainId,
      }));
    } else {
      setdata((prev) => ({
        ...prev,
        isconnected: false,
        network: "",
      }));
    }
  };

  const checkAccount = async () => {
    let accounts = await window.ethereum.request({ method: "eth_accounts" });
    window.ethereum.on("accountsChanged", () => window.location.reload());
    await handleAccountsChanged(accounts);
  };

  const logout = async () => {
    setdata((prev) => ({
      ...prev,
      isconnected: false,
      address: "",
      balance: 0,
      wrappedbalance: 0,
      claimable: 0,
      unclaimable: 0,
      network: "",
    }));
  };

  const handleAccountsChanged = async (accounts) => {
    if (accounts.length === 0) {
      setdata((prev) => ({ ...prev, isconnected: false, network: "" }));
    } else {
      if (getNetwork() !== undefined) {
        const network = await window.ethereum.request({
          method: "eth_chainId",
        });
        const address = await getSigner().getAddress();
        const balance = parseFloat(
          ethers.utils.formatUnits(await getSigner().getBalance(), 18)
        );
        setdata((prev) => ({
          ...prev,
          isconnected: true,
          address: address,
          balance: balance,
          network: network,
        }));
      }
    }
  };

  const checkWeb3 = async () => {
    if (typeof window.ethereum !== "undefined") {
      setProvider(new ethers.providers.Web3Provider(window.ethereum));
      setSigner(getProvider().getSigner());
      try {
        await getSigner().getAddress();
        await checkNetwork();
        await checkAccount();
        if (getNetwork() !== undefined) {
          const address = await getSigner().getAddress();
          const balance = parseFloat(
            ethers.utils.formatUnits(await getSigner().getBalance(), 18)
          );
          const network = await window.ethereum.request({
            method: "eth_chainId",
          });
          setdata((prev) => ({
            ...prev,
            isconnected: true,
            address: address,
            balance: balance,
            network: network,
          }));
        }
      } catch (err) {
        console.error(err);
        setdata((prev) => ({ ...prev, isconnected: false, network: "" }));
      }
    } else {
      console.error("Please install MM!");
      setdata((prev) => ({ ...prev, isconnected: false, network: "" }));
    }
  };

  const getWBalance = async () => {
    const b = await getWnatBalance();
    setdata((prev) => ({ ...prev, wrappedbalance: b }));
  };

  const getRewards = async () => {
    const claimable =
      Math.floor(
        (await getClaimable().catch((e) => {
          return 0;
        })) * 100
      ) / 100;
    const unclaimable =
      Math.floor(
        (await getUnclaimable().catch((e) => {
          return 0;
        })) * 100
      ) / 100;
    setdata((prev) => ({
      ...prev,
      claimable: claimable,
      unclaimable: unclaimable,
    }));
  };
  useEffect(() => {
    checkWeb3();
    getWBalance();
    getRewards();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const reset = async () => {
    checkWeb3();
    getWBalance();
    getRewards();
  };

  const SwitchNetwork = async () => {
    let net = data.network === "0xe" ? "0x13" : "0xe";
    await setupNetwork(net);
    await reset();
  };

  const claimTx = async (rewardAddress) => {
    await claim(rewardAddress).catch((e) => {
      return e;
    });
    reset();
  };

  return (
    <MetamaskContext.Provider
      value={{
        ...data,
        connect,
        claimTx,
        reset,
        SwitchNetwork,
        logout,
      }}
    >
      {children}
    </MetamaskContext.Provider>
  );
};

export default MetamaskProvider;
