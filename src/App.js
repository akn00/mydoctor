import Header from "./components/Header";
import LoginNav from "./components/loginNav";
import Specialities from "./components/Pages/Specialities";
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Home from "./components/Pages/Home";
import InfiniteBar from "./components/InfiniteBar";
import Footer from "./components/Footer";
import "./app.css"
import React from "react";
import SpecialitiesSearchResult from "./components/Pages/SpecialitiesSearchResult";


function App() {
  const [selectedValue, setSelectedValue] = React.useState('');

  return (
  <BrowserRouter>
    <div className="App">
      <Header selectedValue={selectedValue} setSelectedValue={setSelectedValue}/>
      <InfiniteBar/>
        <div className="content">
          <Routes>
            <Route  path="/" element={<Home setSelectedValue={setSelectedValue}/>}/>
            <Route  path="/login" element={<LoginNav />}/>
            <Route  path="/Specialities" element={<Specialities setSelectedValue={setSelectedValue}/>}/>
            <Route  path="/search" element={<SpecialitiesSearchResult />}/>
          </Routes>
          
        </div>
      <Footer/>
    </div> 
  </BrowserRouter>
  );
}

export default App;
