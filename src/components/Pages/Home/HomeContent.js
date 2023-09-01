import homeBanner from "../../../assets/mainPageBanner.svg"
import HomeSp from "../../SpecialitiesHome/HomeSp";
import HomeDr from "../HomeDr/HomeDr";
import "./HomeContent.css"

const HomeContent = ({setSelectedValue}) => {
    return (
        <div className="homeContent">
            <img src={homeBanner} alt="Home page Banner" />
            <div>
                <HomeSp setSelectedValue={setSelectedValue}/>
            </div>
            <div>
                <HomeDr /> 
            </div>
        </div>
    );
}

export default HomeContent;