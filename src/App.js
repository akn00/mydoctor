import Header from "./components/Header";
import LoginNav from "./components/loginNav";
import InfiniteBar from "./components/InfiniteBar";
import Footer from "./components/Footer";
import "./app.css"


function App() {
  return (
    <div className="App">
      <Header/>
      <InfiniteBar/>
      <div className="content">
      <LoginNav/>
      </div>
      <Footer/>
    </div>
  );
}

export default App;
