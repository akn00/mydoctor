import React, { useState, useEffect } from 'react';
import CardSp from '../Cards/CardSp';
import './HomeSp.css';

const HomeSp = ({setSelectedValue}) => {
    const [specializations, setSpecializations] = useState([]);
    const [numberOfSpecialities, setNumberOfSpecialities] = useState(0);
    const [sliceValue, setSliceValue] = useState(0);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch('http://my-doctors.net:8090/specializations?skip={10}');
                const data = await response.json();
                // console.log('Fetched data:', data); 
                setSpecializations(data.data);
                const calculatedNumberOfSpecialities = (data.total / 10) | 0;
                setNumberOfSpecialities(calculatedNumberOfSpecialities);
            } catch (error) {
                console.error('Error fetching specializations:', error);
            }
        }
        fetchData();
    }, []);


    useEffect(() => {
    const handleResize = () => {
        const w = window.innerWidth;
        if (w >= 1919) {
            setSliceValue(8);
        } else {
            setSliceValue(6);
        }
    };

    // Initial call
    handleResize();

    // Add an event listener to handle resize
    window.addEventListener("resize", handleResize);

    // Clean up the event listener when the component unmounts
    return () => {
        window.removeEventListener("resize", handleResize);
    };
}, []);


     const newSpecializations=specializations.slice(0,(sliceValue))

    return (
        <>
            <div className="spHeading">{numberOfSpecialities}0+ Specialities</div>
            <div className="CardsOnHome">
                {newSpecializations.map((specialization)=>(
                        <CardSp
                            key={specialization.id}
                            setSelectedValue={setSelectedValue}
                            name={specialization.name}
                            imageUrl={specialization.imageUrl}
                        />
                    ))}

            </div>
            <div className="allSpecialities">
                <a href="/specialities">
                    View all Specialities...
                </a>
            </div>
        </>
    );
}

export default HomeSp;
