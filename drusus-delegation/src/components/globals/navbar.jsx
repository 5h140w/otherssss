import React from "react";
import logo from "../../logo.png";
import { useLocation } from "react-router-dom";

const Navbar = () => {
  const { pathname } = useLocation();
  return (
    <header className="App-header">
      <a href="/">
        <img src={logo} className="App-logo" alt="logo" />
      </a>
      <div className={`App-addresses ${pathname !== "/" && "flex_add"}`}>
        <p>SGB: 0xd06225a70d865C7A737a0beeC744b0C420E9bfdb</p>
        <p>FLR: 0xFB4Ca37173Bc786A84dE34509105575C83DEA898</p>
      </div>
      {pathname === "/" && (
        <nav className="App-nav">
          <a href="#services">Activity</a>
          <a href="#contact">Contact</a>
          <a href="/delegate">Delegate</a>
        </nav>
      )}
    </header>
  );
};

export default Navbar;
