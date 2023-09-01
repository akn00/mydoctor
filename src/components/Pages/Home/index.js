import React from "react"
import "./Home.css"

import HomeContent from "./HomeContent";
import SideBar from "../../SideBar/Index";

const Index = ({setSelectedValue}) => {
  return (<div className="home">
    <SideBar/>
    <HomeContent setSelectedValue={setSelectedValue}/>
  </div>);
}

export default Index;