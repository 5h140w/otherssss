import React from "react";
import Navbar from "../components/globals/navbar";
import ProviderTable from "../components/providerTable/providerTable";

const ProviderPage = () => {
  return (
    <div className="bg-gray-800 min-h-screen">
      <Navbar />
      <div className="container mx-auto py-6">
        <ProviderTable />
      </div>
    </div>
  );
};

export default ProviderPage;
