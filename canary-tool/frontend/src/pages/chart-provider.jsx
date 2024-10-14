import React, { useState } from "react";
import Navbar from "../components/globals/navbar";
import LineChartProvider from "../components/chartProvider/linechartprovider";
import { useParams } from "react-router-dom";
import PriceTable from "../components/chartProvider/table";

const ChartProvider = () => {
  const [fetch, setFetch] = useState(false);
  const { provider } = useParams();

  const initialData = [
    { time: new Date(2023, 5, 1, 14, 20), value: 10 },
    { time: new Date(2023, 5, 1, 14, 22), value: 90 },
    { time: new Date(2023, 5, 1, 14, 24), value: 40 },
    { time: new Date(2023, 5, 1, 14, 26), value: 30 },
    { time: new Date(2023, 5, 1, 14, 28), value: 30 },
    { time: new Date(2023, 5, 1, 14, 30), value: 50 },
    { time: new Date(2023, 5, 1, 14, 32), value: 40 },
    { time: new Date(2023, 5, 1, 14, 34), value: 70 },
    { time: new Date(2023, 5, 1, 14, 36), value: 90 },
  ];

  const [datasets, setDatasets] = useState([initialData]);

  const addNewDataset = () => {
    const newData = initialData.map((d) => ({
      time: d.time,
      value: d.value * (0.5 + Math.random()), // Modify this to create different data
    }));
    setDatasets([initialData, newData]);
  };

  const coins = [
    "FLR",
    "XRP",
    "LTC",
    "DOGE",
    "ADA",
    "ALGO",
    "BCH",
    "DGB",
    "BTC",
    "ETH",
    "FIL",
    "ARB",
    "AVAX",
    "BNB",
    "MATIC",
    "SOL",
    "USDC",
    "USDT",
    "XDC",
  ];

  return (
    <div className="bg-gray-800 min-h-screen">
      <Navbar />
      <div className="w-3/5 mx-auto">
        <div className="container mx-auto my-6 p-3 rounded border border-gray-500">
          <h1 className="text-2xl text-white ">
            provider: <span className="capitalize">{provider}</span>
          </h1>
          <div className="my-3">
            <LineChartProvider
              datasets={datasets}
              addNewDataset={addNewDataset}
            />
          </div>
          <div className="flex flex-wrap w-full">
            {coins.map((el, index) => (
              <button
                className=" flex-1 border text-white border-spacing-2 p-1 rounded m-0"
                key={index}
              >
                {el}
              </button>
            ))}
          </div>
        </div>
        <div className="flex justify-end flex-wrap">
          <button
            className="border text-white border-spacing-2 px-3 py-1 rounded m-0"
            onClick={() => {
              setFetch(true);
              addNewDataset();
            }}
          >
            Binance
          </button>
          <button
            className="border text-white border-spacing-2 px-2 py-1 rounded m-0"
            onClick={() => {
              setFetch(true);
              addNewDataset();
            }}
          >
            BinanceUS
          </button>
          <button
            className="border text-white border-spacing-2 px-2 py-1 rounded m-0"
            onClick={() => {
              setFetch(true);
              addNewDataset();
            }}
          >
            Okex
          </button>
          <button
            className="border text-white border-spacing-2 px-2 py-1 rounded m-0"
            onClick={() => {
              setFetch(true);
              addNewDataset();
            }}
          >
            Coinbase
          </button>
          <button
            className="border text-white border-spacing-2 px-2 py-1 rounded m-0"
            onClick={() => {
              setFetch(true);
              addNewDataset();
            }}
          >
            Huobi
          </button>
        </div>
      </div>
      {fetch && (
        <div className="p-6 container mx-auto">
          <PriceTable coins={coins} />
        </div>
      )}
    </div>
  );
};

export default ChartProvider;
