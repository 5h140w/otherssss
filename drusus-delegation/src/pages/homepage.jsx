import React from "react";
import Navbar from "../components/globals/navbar";
import Hero from "../components/home/hero/hero";
import Main from "../components/home/main/main";
import Activity from "../components/home/activity/activity";
import Contact from "../components/home/contact/contact";
import Footer from "../components/globals/footer";

const Homepage = () => {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Main />
        <Activity />
        <Contact />
      </main>
      <Footer />
    </>
  );
};

export default Homepage;
