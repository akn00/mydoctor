import CardSp from "../Cards/CardSp";
import "./HomeSp.css"
import React from "react";

const HomeSp = () => {
   
    return ( 
    <>
        <div className="spHeading">20+ Specialities</div>
        <div className="CardsOnHome">
            <CardSp/>
            <CardSp/>
            <CardSp/>
            <CardSp/>
            <CardSp/>
            <CardSp/>
        </div>
        <div className="allSpecialities">
        <a href="/specialisation">
        View all Specialities...        
        </a>
        </div>
    </> 
    );
}
 
export default HomeSp;