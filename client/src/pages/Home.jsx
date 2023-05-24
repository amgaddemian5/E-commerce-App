import React, { useState } from "react";
import Announcement from "../components/Announcement";
import Categories from "../components/Categories";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Products from "../components/Products";
import Slider from "../components/Slider";

const Home = () => {
  const [query, setQuery] = useState("");
  return (
    <div>
      <Announcement />
      <Navbar setQuery={setQuery} search={true} />
      <Slider />
      <Categories query={query} />
      <Products />
      <Footer />
    </div>
  );
};

export default Home;
