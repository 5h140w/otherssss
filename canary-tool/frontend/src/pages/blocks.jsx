import React from "react";
import Navbar from "../components/globals/navbar";
import GroupedBarChart from "../components/blocks/groupedbarchart";

const Blocks = () => {
  const data = [
    {
      date: new Date(2023, 5, 1, 14, 22),
      values: [
        { name: "Gas used", value: 30 },
        { name: "TX count", value: 20 },
        { name: "AVG TX gas", value: 50 },
      ],
    },
    {
      date: new Date(2023, 5, 1, 14, 24),
      values: [
        { name: "Gas used", value: 30 },
        { name: "TX count", value: 20 },
        { name: "AVG TX gas", value: 50 },
      ],
    },
    {
      date: new Date(2023, 5, 1, 14, 26),
      values: [
        { name: "Gas used", value: 30 },
        { name: "TX count", value: 20 },
        { name: "AVG TX gas", value: 50 },
      ],
    },
    {
      date: new Date(2023, 5, 1, 14, 28),
      values: [
        { name: "Gas used", value: 30 },
        { name: "TX count", value: 20 },
        { name: "AVG TX gas", value: 50 },
      ],
    },
    {
      date: new Date(2023, 5, 1, 14, 30),
      values: [
        { name: "Gas used", value: 40 },
        { name: "TX count", value: 30 },
        { name: "AVG TX gas", value: 60 },
      ],
    },
    {
      date: new Date(2023, 5, 1, 14, 32),
      values: [
        { name: "Gas used", value: 50 },
        { name: "TX count", value: 40 },
        { name: "AVG TX gas", value: 10 },
      ],
    },
  ];
  return (
    <div className="bg-gray-800 min-h-screen">
      <Navbar />
      <div className="w-3/5 mx-auto my-6">
        <div className="container">
          <GroupedBarChart data={data} />
        </div>
      </div>
    </div>
  );
};

export default Blocks;
