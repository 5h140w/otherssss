import React, { useContext, useEffect, useState } from "react";
import { Networkcontext } from "../../App";
import { getPriceSubmitterContract } from "../../utils/abi/pricesubmitter";
import { getFtsoManagerContract } from "../../utils/abi/ftsoManager";
import { ethers } from "ethers";

function convertTimestamp(timestamp) {
  const milliseconds = timestamp * 1000;

  const date = new Date(milliseconds);

  const days = Math.floor(milliseconds / (1000 * 60 * 60 * 24));
  const hours = date.getHours();
  const minutes = date.getMinutes();

  return `${days}D ${hours}h ${minutes}m`;
}

const ProviderTable = () => {
  const [epoch, setepoch] = useState("");
  const [nextepochdate, setNextEpochDate] = useState("");
  const { network } = useContext(Networkcontext);
  const networks = {
    "0x13": {
      chainId: "0x13",
      chainName: "Songbird",
      nativeCurrency: { decimals: 18, symbol: "SGB" },
      rpcUrls: ["https://songbird.towolabs.com/rpc"],
      blockExplorerUrls: ["https://songbird-explorer.flare.network/"],
    },
    "0xe": {
      chainId: "0xe",
      chainName: "Flare",
      nativeCurrency: { decimals: 18, symbol: "FLR" },
      rpcUrls: ["https://flare-api.flare.network/ext/C/rpc"],
      blockExplorerUrls: ["https://flare-explorer.flare.network/"],
    },
  };
  useEffect(() => {
    const fetchdata = async () => {
      const RPC =
        network === "FLR"
          ? networks["0xe"].rpcUrls[0]
          : networks["0x13"].rpcUrls[0];
      const provider = new ethers.providers.JsonRpcProvider(RPC);
      const priceSubmitterContract = getPriceSubmitterContract(provider);
      const ftsoManagerContract = getFtsoManagerContract(
        provider,
        await priceSubmitterContract.getFtsoManager()
      );
      const currentRewardEpoch =
        await ftsoManagerContract.getCurrentRewardEpoch();
      const date = await ftsoManagerContract.getCurrentPriceEpochData();
      console.log(Number(date._priceEpochEndTimestamp) * 1000 - Date.now());
      setNextEpochDate(
        convertTimestamp(
          Number(date._priceEpochEndTimestamp) * 1000 - new Date()
        )
      );
      setepoch(Number(currentRewardEpoch));
    };
    fetchdata();
    // eslint-disable-next-line
  }, [network]);
  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl text-white">List of providers</h1>
        <div className="bg-gray-700 p-4 text-white rounded-md">
          <div>
            <span className="font-semibold">Next epoch: </span>
            {nextepochdate}
          </div>
          <div>
            <span className="font-semibold">Reward epoch:</span> {epoch}
          </div>
        </div>
      </div>
      <div className="my-5">
        <div className="container mx-auto py-8 relative overflow-x-auto overflow-y-auto">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 overflow-auto">
            <thead className="text-xs text-white-700 uppercase dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3"></th>
                <th scope="col" className="px-6 py-3">
                  Address
                </th>
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Success rate
                </th>
                <th scope="col" className="px-6 py-3">
                  Balance
                </th>
                <th scope="col" className="px-6 py-3">
                  Availability
                </th>
                <th scope="col" className="px-6 py-3">
                  Total reward
                </th>
                <th scope="col" className="px-6 py-3">
                  Current earnings
                </th>
                <th scope="col" className="px-6 py-3">
                  Current vote power
                </th>
                <th scope="col" className="px-6 py-3">
                  Current delegation
                </th>
                <th scope="col" className="px-6 py-3">
                  Active delegation
                </th>
                <th scope="col" className="px-6 py-3">
                  Fee
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="text-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td className="px-6 py-4">Canary</td>
                <td className="px-6 py-4">0xxxxxxx</td>
                <td className="px-6 py-4">Canary</td>
                <td className="px-6 py-4">64%</td>
                <td className="px-6 py-4">178</td>
                <td className="px-6 py-4">100%</td>
                <td className="px-6 py-4">87</td>
                <td className="px-6 py-4">11</td>
                <td className="px-6 py-4">51.422.5421</td>
                <td className="px-6 py-4">3.03%</td>
                <td className="px-6 py-4">3.05%</td>
                <td className="px-6 py-4">20%</td>
              </tr>
              <tr className="text-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td className="px-6 py-4">Canary</td>
                <td className="px-6 py-4">0xxxxxxx</td>
                <td className="px-6 py-4">Canary</td>
                <td className="px-6 py-4">64%</td>
                <td className="px-6 py-4">178</td>
                <td className="px-6 py-4">100%</td>
                <td className="px-6 py-4">87</td>
                <td className="px-6 py-4">11</td>
                <td className="px-6 py-4">51.422.5421</td>
                <td className="px-6 py-4">3.03%</td>
                <td className="px-6 py-4">3.05%</td>
                <td className="px-6 py-4">20%</td>
              </tr>
              <tr className="text-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td className="px-6 py-4">Canary</td>
                <td className="px-6 py-4">0xxxxxxx</td>
                <td className="px-6 py-4">Canary</td>
                <td className="px-6 py-4">64%</td>
                <td className="px-6 py-4">178</td>
                <td className="px-6 py-4">100%</td>
                <td className="px-6 py-4">87</td>
                <td className="px-6 py-4">11</td>
                <td className="px-6 py-4">51.422.5421</td>
                <td className="px-6 py-4">3.03%</td>
                <td className="px-6 py-4">3.05%</td>
                <td className="px-6 py-4">20%</td>
              </tr>
              <tr className="text-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td className="px-6 py-4">Canary</td>
                <td className="px-6 py-4">0xxxxxxx</td>
                <td className="px-6 py-4">Canary</td>
                <td className="px-6 py-4">64%</td>
                <td className="px-6 py-4">178</td>
                <td className="px-6 py-4">100%</td>
                <td className="px-6 py-4">87</td>
                <td className="px-6 py-4">11</td>
                <td className="px-6 py-4">51.422.5421</td>
                <td className="px-6 py-4">3.03%</td>
                <td className="px-6 py-4">3.05%</td>
                <td className="px-6 py-4">20%</td>
              </tr>
              <tr className="text-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td className="px-6 py-4">Canary</td>
                <td className="px-6 py-4">0xxxxxxx</td>
                <td className="px-6 py-4">Canary</td>
                <td className="px-6 py-4">64%</td>
                <td className="px-6 py-4">178</td>
                <td className="px-6 py-4">100%</td>
                <td className="px-6 py-4">87</td>
                <td className="px-6 py-4">11</td>
                <td className="px-6 py-4">51.422.5421</td>
                <td className="px-6 py-4">3.03%</td>
                <td className="px-6 py-4">3.05%</td>
                <td className="px-6 py-4">20%</td>
              </tr>
              <tr className="text-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td className="px-6 py-4">Canary</td>
                <td className="px-6 py-4">0xxxxxxx</td>
                <td className="px-6 py-4">Canary</td>
                <td className="px-6 py-4">64%</td>
                <td className="px-6 py-4">178</td>
                <td className="px-6 py-4">100%</td>
                <td className="px-6 py-4">87</td>
                <td className="px-6 py-4">11</td>
                <td className="px-6 py-4">51.422.5421</td>
                <td className="px-6 py-4">3.03%</td>
                <td className="px-6 py-4">3.05%</td>
                <td className="px-6 py-4">20%</td>
              </tr>
              <tr className="text-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td className="px-6 py-4">Canary</td>
                <td className="px-6 py-4">0xxxxxxx</td>
                <td className="px-6 py-4">Canary</td>
                <td className="px-6 py-4">64%</td>
                <td className="px-6 py-4">178</td>
                <td className="px-6 py-4">100%</td>
                <td className="px-6 py-4">87</td>
                <td className="px-6 py-4">11</td>
                <td className="px-6 py-4">51.422.5421</td>
                <td className="px-6 py-4">3.03%</td>
                <td className="px-6 py-4">3.05%</td>
                <td className="px-6 py-4">20%</td>
              </tr>
              <tr className="text-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td className="px-6 py-4">Canary</td>
                <td className="px-6 py-4">0xxxxxxx</td>
                <td className="px-6 py-4">Canary</td>
                <td className="px-6 py-4">64%</td>
                <td className="px-6 py-4">178</td>
                <td className="px-6 py-4">100%</td>
                <td className="px-6 py-4">87</td>
                <td className="px-6 py-4">11</td>
                <td className="px-6 py-4">51.422.5421</td>
                <td className="px-6 py-4">3.03%</td>
                <td className="px-6 py-4">3.05%</td>
                <td className="px-6 py-4">20%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProviderTable;
