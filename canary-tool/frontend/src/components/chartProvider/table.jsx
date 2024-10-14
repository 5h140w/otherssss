import React from "react";

const PriceTable = ({ coins }) => {
  return (
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 overflow-auto">
      <thead className="text-xs text-white-700 uppercase dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th scope="col" className="px-6 py-3"></th>
          <th scope="col" className="px-6 py-3">
            Coin
          </th>
          <th scope="col" className="px-6 py-3">
            No. of cases
          </th>
          <th scope="col" className="px-6 py-3">
            High(%)
          </th>
          <th scope="col" className="px-6 py-3">
            Low(%)
          </th>
          <th scope="col" className="px-6 py-3">
            Out(%)
          </th>
          <th scope="col" className="px-6 py-3">
            Border(%)
          </th>
          <th scope="col" className="px-6 py-3">
            Inner(%)
          </th>
          <th scope="col" className="px-6 py-3">
            Excepted(%)
          </th>
        </tr>
      </thead>
      <tbody>
        {coins.map((el, key) => (
          <tr
            className="text-white border-b dark:bg-gray-800 dark:border-gray-700"
            key={key}
          >
            <td className="px-6 py-4">{el}</td>
            <td className="px-6 py-4">10</td>
            <td className="px-6 py-4">0</td>
            <td className="px-6 py-4">0</td>
            <td className="px-6 py-4">0</td>
            <td className="px-6 py-4">0</td>
            <td className="px-6 py-4">0</td>
            <td className="px-6 py-4">0</td>
            <td className="px-6 py-4">0</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default PriceTable;
