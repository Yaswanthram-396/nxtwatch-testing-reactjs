import Navbar from "./Navbar";
import React from "react";
import Sidebar from "./Sidebar";
import "./index.css";

function Home({ Num }) {
  return (
    <div className="home">
      <Navbar />
      <Sidebar Num={Num} />
    </div>
  );
}

export default Home;
