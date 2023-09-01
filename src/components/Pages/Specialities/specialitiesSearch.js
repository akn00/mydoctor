import "./Specialities.css";
import CardSp from "../../Cards/CardSp";
import React, { useState, useEffect } from "react";

const SpecialitiesSearch = ({ searchValue, itemsPerPage, setSearchedNumberOfSpecialities}) => {
    const [specializations, setSpecializations] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    const fetchSpecializations = async () => {
        try {
            const response = await fetch(
                `http://my-doctors.net:8090/specializations?$limit=500`
            );
            const data = await response.json();
            setSpecializations(data.data);
        } catch (error) {
            console.error("Error fetching specializations:", error);
        }
    };

    useEffect(() => {
        fetchSpecializations();
    }, []);

    useEffect(() => {
        // Reset currentPage to 1 when searchValue changes
        setCurrentPage(1);
    }, [searchValue]);

    const filterSpecializations = (searchValue) => {
        return specializations.filter((specialization) => {
            return specialization.name.toLowerCase().includes(searchValue.toLowerCase());
        });
    };

    const totalFilteredSpecializations = filterSpecializations(searchValue);
    setSearchedNumberOfSpecialities(totalFilteredSpecializations.length);
    const totalFilteredPages = Math.ceil(totalFilteredSpecializations.length / itemsPerPage);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const visibleSpecializations = totalFilteredSpecializations.slice(
        startIndex,
        startIndex + itemsPerPage
    );

    return (
        <>
            {   totalFilteredSpecializations.length===0?
                    
                    <div className="nospec">No Specilities found</div>
                :

                    <><div className="CardsOnHome">
                        {visibleSpecializations.map((specialization) => (
                            <CardSp
                                key={specialization.id}
                                name={specialization.name}
                                imageUrl={specialization.imageUrl}
                            />
                        ))}
                    </div>

                    <div className="pagination">
                        {totalFilteredPages>1 && Array.from({ length: totalFilteredPages }, (_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentPage(index + 1)}
                                className={currentPage === index + 1 ? "active" : ""}
                            >
                                {index + 1}
                            </button>
                        ))}
                    </div></>
            }
        </>
    );
};

export default SpecialitiesSearch;
