import { useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import DrCard from "../HomeDr/DrCard";
import "../HomeDr/HomeDr.css";
import SideBar from "../../SideBar/Index"


const Index = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const speciality = searchParams.get("sp");
    const[data,setData]=useState([]);
    

    async function getDoctorsBySpeciality(speciality, name = "") {
        const baseUrl = "http://my-doctors.net:8090";
        const endpoint = "/doctors";

        // Create an object to hold the query parameters  
        const queryParamsObj = 
        {
            $limit: -1,
            $skip: 0,
            speciality: speciality,
        };

        // Add the name parameter only if it's provided  
        if (name) {
            queryParamsObj.name = name;
        }

        const queryParams = new URLSearchParams(queryParamsObj);
        const url = `${baseUrl}${endpoint}?${queryParams}`;
        let data = await fetch(url);
        data = await data.json();
        return data;
    }

    useEffect(() => {
        getDoctorsBySpeciality(speciality).then(
            (data)=>{
                console.log(data);
                setData(data)
            }
        )
    },[])


    return (<div className="spResultPage">
        <SideBar/>
        <div className="DrCardsOnDr">
            
            {data.length === 0 ? (
                `No results found for '${speciality}'`
            ) : (
                data.map((doctor) => (
                    <DrCard
                        key={doctor._id} // Use a unique identifier if available
                        doctor={doctor}
                    />
                ))
            )}
                
            </div>
    </div>);
}

export default Index;