import React from "react";
import mainBg from "../../../bg.jpg";

const Main = () => {
  return (
    <section
      id="main-text"
      className="section main-text-section"
      style={{ backgroundImage: `url(${mainBg})` }}
    >
      <h2>About Us</h2>
      <p>
        Welcome to Drusus, where modern technology meets the spirit of ancient
        Rome! Our legionaries are a team of experts who work tirelessly day and
        night, gathering and analyzing data to provide you with the best earning
        opportunities.
      </p>
      <p>
        You can entrust us with your tokens, and our legionaries will handle the
        rest. Your assets will remain under your control and completely secure.
        Delegate to us and enjoy passive income like a true Roman patrician,
        watching the triumphs of your legionaries!
      </p>
    </section>
  );
};

export default Main;
