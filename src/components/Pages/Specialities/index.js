import SideBar from "../../SideBar/Index"
import "./Specialities.css"
import HomeSp from "../../SpecialitiesHome/HomeSp"
const Index = () => {
    return ( 
    <div className="specialitiesMain">
        <SideBar/>
        <div className="spPage">
        <HomeSp/>
        </div>
    </div> 
    );
}
 
export default Index;