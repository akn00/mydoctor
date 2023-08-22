import DrCard from "./DrCard";
import React, { useState, useEffect } from 'react';
import "./HomeDr.css";

const HomeDr = () => {

    const [doctors, setDoctors] = useState([]);
    const [numberOfDoctors, setNumberOfDoctors] = useState(0);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch('http://my-doctors.net:8090/doctors');
                const data = await response.json();
                // console.log('Fetched data:', data); 
                setDoctors(data.data);
                const calculatedNumberOfDoctors = (data.total / 10) | 0;
                setNumberOfDoctors(calculatedNumberOfDoctors);
            } catch (error) {
                console.error('Error fetching doctors:', error);
            }
        }
        fetchData();
    }, []);

    return (
        <>
            <div className="DrHeading">{numberOfDoctors}0+ Doctors</div>
            <div className="DrCardsOnHome">
                {doctors.map((doctor) => (
                        <DrCard
                            doctor={doctor}
                        />
                    ))}

            </div>
        </>
    );
}
 

export default HomeDr;