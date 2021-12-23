import React from "react";
import Foods from "../Foods/Foods";
import Hero from "../Hero/Hero";
import Header from "./../Header/Header";

const Home = () => {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Foods />
      </main>
    </>
  );
};

export default Home;
