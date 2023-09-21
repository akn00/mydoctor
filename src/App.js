import Header from "./components/Header";
import LoginNav from "./components/loginNav";
import Profile from "./components/Pages/Profile"
import Specialities from "./components/Pages/Specialities";
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Home from "./components/Pages/Home";
import InfiniteBar from "./components/InfiniteBar";
import Footer from "./components/Footer";
import "./app.css"
import React from "react";
import SpecialitiesSearchResult from "./components/Pages/SpecialitiesSearchResult";
import DoctorLandingPage from "./components/Pages/DoctorLandingPage";
import ChangePassword from "./components/Pages/ChangePassword"
import Dashboard from "./components/Pages/Dashboard"
import DrProfile from "./components/Pages/DoctorProfile"
import DrQualification from "./components/Pages/DrQualification"
import DrExperience from "./components/Pages/DrExperience"
import DrAppointment from "./components/Pages/DrAppointment"


function App() {
  // const [selectedValue, setSelectedValue] = React.useState('');
  

  return (
  <BrowserRouter>
    <div className="App">
      <Header />
      <InfiniteBar/>
        <div className="content">
          <Routes>
            <Route  path="/" element={<Home />}/>
            <Route  path="/login" element={<LoginNav />}/>
            <Route  path="/Specialities" element={<Specialities />}/>
            <Route  path="/search" element={<SpecialitiesSearchResult />}/>
            <Route  path="/doctor/:id" element={<DoctorLandingPage />}/>
            <Route  path="/myprofile" element={<Profile/>}/>
            <Route  path="/changepassword" element={<ChangePassword/>}/>
            <Route  path="/doctor-dashboard" element={<Dashboard/>}/>
            <Route  path="/doctor-profile" element={<DrProfile/>}/>
            <Route  path="/doctor-profile/qualification" element={<DrQualification/>}/>
            <Route  path="/doctor-profile/experience" element={<DrExperience/>}/>
            <Route  path="/doctor-appointments" element={<DrAppointment/>}/>
          </Routes>
          
        </div>
      <Footer/>
    </div> 
  </BrowserRouter>
  );
}

export default App;
