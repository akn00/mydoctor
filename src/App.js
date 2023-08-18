import Header from "./components/Header";
import LoginNav from "./components/loginNav/index";
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Home from "./components/Pages/Home";
import InfiniteBar from "./components/InfiniteBar";
import Footer from "./components/Footer";
import "./app.css"


function App() {
  return (
  <BrowserRouter>
    <div className="App">
      <Header/>
      <InfiniteBar/>
        <div className="content">
          <Routes>
            <Route  path="/" element={<Home />}/>
            <Route  path="/login" element={<LoginNav />}/>
          </Routes>
        </div>
      <Footer/>
    </div> 
  </BrowserRouter>
  );
}

export default App;
