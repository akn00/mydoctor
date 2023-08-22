import React, { useState, useEffect } from 'react';
import CardSp from '../Cards/CardSp';
import './HomeSp.css';

const HomeSp = () => {
    const [specializations, setSpecializations] = useState([]);
    const [numberOfSpecialities, setNumberOfSpecialities] = useState(0);

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

    return (
        <>
            <div className="spHeading">{numberOfSpecialities}0+ Specialities</div>
            <div className="CardsOnHome">
                {specializations.map((specialization)=>(
                        <CardSp
                            key={specialization.id}
                            name={specialization.name}
                            imageUrl={specialization.imageUrl}
                        />
                    ))}

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
