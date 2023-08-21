import React from "react"
import "./Home.css"

import HomeContent from "./HomeContent";
import SideBar from "../../SideBar/Index";

const Index = () => {
  return (<div className="home">
    <SideBar/>
    <HomeContent/>
  </div>);
}

export default Index;