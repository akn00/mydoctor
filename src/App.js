import Header from "./components/Header";
import LoginNav from "./components/loginNav";
import Specialities from "./components/Pages/Specialities";
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Home from "./components/Pages/Home";
import InfiniteBar from "./components/InfiniteBar";
import Footer from "./components/Footer";
import "./app.css"


function App() {
   (async function DataFecth(){
    const response = await fetch("http://my-doctors.net/api/doctors");
    var data = await response.json();
    console.log(data);
    })();
  return (
  <BrowserRouter>
    <div className="App">
      <Header/>
      <InfiniteBar/>
        <div className="content">
          <Routes>
            <Route  path="/" element={<Home />}/>
            <Route  path="/login" element={<LoginNav />}/>
            <Route  path="/Specialities" element={<Specialities />}/>
          </Routes>
          
        </div>
      <Footer/>
    </div> 
  </BrowserRouter>
  );
}

export default App;
