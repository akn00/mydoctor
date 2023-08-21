import homeBanner from "../../../assets/mainPageBanner.svg"
import HomeSp from "../../Specialities/HomeSp";
import HomeDr from "../HomeDr/HomeDr";
import "./HomeContent.css"

const HomeContent = () => {
    return (
        <div className="homeContent">
            <img src={homeBanner} alt="Home page Banner" />
            <div>
                <HomeSp />
            </div>
            <div>
                <HomeDr />
            </div>
        </div>
    );
}

export default HomeContent;