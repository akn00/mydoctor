import React, { useState, useEffect } from 'react';
import Pagination from '@mui/material/Pagination';
import DrCard from "./DrCard";
import "./HomeDr.css";

const HomeDoctor = () => {
    const [doctors, setDoctors] = useState([]);
    const [numberOfDoctors, setNumberOfDoctors] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const doctorsPerPage = 12;

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(`http://my-doctors.net:8090/doctors?$limit=${doctorsPerPage}&$skip=${(currentPage - 1) * doctorsPerPage}`);
                const data = await response.json();
                setDoctors(data.data);
                setNumberOfDoctors(data.total);
            } catch (error) {
                console.error('Error fetching doctors:', error);
            }
        }
        fetchData();
    }, [currentPage]);

    const totalPages = Math.ceil(numberOfDoctors / doctorsPerPage);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    return (
        <>
            <div className="DrHeading">{numberOfDoctors}+ Doctors</div>
            <div className="DrCardsOnHome">
                {doctors.length === 0 ? (
                    <p>No doctors found.</p>
                ) : (
                    doctors.map((doctor) => (
                        <DrCard
                            key={doctor.id} // Use a unique identifier if available
                            doctor={doctor}
                        />
                    ))
                )}
            </div>
            <div className="PaginationDr">
                <Pagination
                    count={totalPages}
                    page={currentPage}
                    onChange={(event, newPage) => handlePageChange(newPage)}
                    color="primary"
                    variant="outlined"
                />
            </div>
        </>
    );
}

export default HomeDoctor;
