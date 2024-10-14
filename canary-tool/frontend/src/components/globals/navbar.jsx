import React, { useContext } from "react";
import { Networkcontext } from "../../App";

const Navbar = () => {
  const { network, setnetwork } = useContext(Networkcontext);

  const change = () => {
    if (network === "FLR") {
      setnetwork("SGB");
      localStorage.setItem("network", "SGB");
    } else {
      setnetwork("FLR");
      localStorage.setItem("network", "FLR");
    }
  };
  return (
    <nav>
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <button
              type="button"
              className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="absolute -inset-0.5"></span>
              <span className="sr-only">Open main menu</span>

              <svg
                className="block h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>

              <svg
                className="hidden h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex flex-shrink-0 items-center">
              <p className="text-white text-2xl">Canary tool</p>
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                <a
                  href="/"
                  className="bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium"
                  aria-current="page"
                >
                  Data providers
                </a>
                <a
                  href="/price/canary"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                >
                  Prices
                </a>
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <button
              type="button"
              className="relative rounded bg-[#6366f1] px-3 py-2 text-white hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
              onClick={change}
            >
              change network
            </button>
            <span className="ms-3 text-white">{network}</span>
          </div>
        </div>
      </div>

      <div className="sm:hidden" id="mobile-menu">
        <div className="space-y-1 px-2 pb-3 pt-2">
          <a
            href="/"
            className="bg-gray-900 text-white block rounded-md px-3 py-2 text-base font-medium"
            aria-current="page"
          >
            Data providers
          </a>
          <a
            href="/price/canary"
            className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
          >
            Prices
          </a>
          <a
            href="/blocks"
            className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
          >
            Blocks
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
