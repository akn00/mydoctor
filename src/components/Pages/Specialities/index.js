import React, { useState, useEffect } from "react";
import SideBar from "../../SideBar/Index";
import "./Specialities.css";
import CardSp from "../../Cards/CardSp";
import { Button, InputBase, IconButton } from '@material-ui/core';
import { Search as SearchIcon } from '@material-ui/icons';

const Index = () => {
    const [itemsPerPage, setItemsPerPage] = useState(8);
    const [specializations, setSpecializations] = useState([]);
    const [dataToFilter, setDataToFilter] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState(false);
    const [noSpecialities, setNoSpecialities] = useState(false);
    const [numberOfSpecialities, setNumberOfSpecialities] = useState(0);


    const fetchSpecializations = async () => {
        try {
            const response = await fetch(
                `http://my-doctors.net:8090/specializations?$limit=500`
            );
            const data = await response.json();
            setSpecializations(data.data);
            setNumberOfSpecialities(data.total);
            setDataToFilter(data.data);
        } catch (error) {
            console.error("Error fetching specializations:", error);
        }
    };
    function specialitiesSearchHandle(e) {
        setSearch(true);
        const searchTerm = e.target.value;
        const filteredSpecializations = dataToFilter.filter((data) => {
            return data.name.toLowerCase().includes(searchTerm.toLowerCase());
        });
        setSpecializations(filteredSpecializations);

        // if (e.target.value === "") {
        //     setSearch(false);
        // }
    }


    useEffect(() => {
        fetchSpecializations();
    }, [currentPage, itemsPerPage]);

    useEffect(() => {
        if (specializations.length === 0) {
            setNoSpecialities(true);
        }
        else {
            setNoSpecialities(false);
        }
    });

    useEffect(() => {
        setCurrentPage(1); // Reset current page when itemsPerPage changes
        fetchSpecializations();
    }, [itemsPerPage]);

    const calculatedNumberOfSpecialities = Math.floor(numberOfSpecialities / 10) | 0;
    const totalPages = Math.ceil(numberOfSpecialities / itemsPerPage);
    const searchPages = Math.ceil(specializations.length / itemsPerPage);
    const searchNumber = specializations.length;

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
        // If a search is active, keep the current search results
        if (search) {
            const startIndex = (newPage - 1) * itemsPerPage;
            const visibleSpecializations = specializations.slice(startIndex, startIndex + itemsPerPage);
            setSpecializations(visibleSpecializations);
        } else {
          // Otherwise, fetch the new search results from the API
          const startIndex = (newPage - 1) * itemsPerPage;
          const visibleSpecializations = dataToFilter.slice(startIndex, startIndex + itemsPerPage);
          setSpecializations(visibleSpecializations);
        }
      };


    const handleItemsPerPageChange = (event) => {
        const newItemsPerPage = parseInt(event.target.value, 10);
        setItemsPerPage(newItemsPerPage);
    };

    const startIndex = (currentPage - 1) * itemsPerPage;
    const visibleSpecializations = specializations.slice(startIndex, startIndex + itemsPerPage);

    return (
        <div className="specialitiesMain">
            <SideBar />
            <div className="spPage">
                <div className="spHeading">{search ? `${searchNumber}+ Specialities` : `${calculatedNumberOfSpecialities}0+ Specialities`}

                    <div className="numOfPages">
                        <div className="searchSp">
                            <InputBase
                                placeholder="Search a Speciality"
                                inputProps={{ 'aria-label': 'search' }}
                                onKeyPress={(e) => {
                                    if (e.key === 'Enter') {
                                        specialitiesSearchHandle(e);
                                    }
                                }}
                            />
                            <IconButton aria-label="search">
                                <SearchIcon />
                            </IconButton>
                        </div>
                        <select
                            value={itemsPerPage}
                            onChange={handleItemsPerPageChange}
                            style={{
                                height: "35px",
                                paddingLeft: "10px",
                                paddingRight: "10px",
                                backgroundColor: "transparent",
                                border: "1px solid lightGrey",
                                borderRadius: "4px",
                                cursor: "pointer",
                                outline: "none", // Remove the default focus outline
                            }}
                            className="custom-select" // Add a class for custom styling
                        >
                            <option value={8}>8</option>
                            <option value={12}>12</option>
                            <option value={16}>16</option>
                            <option value={20}>20</option>
                            <option value={40}>40</option>
                        </select>
                    </div>
                </div>
                <div className="CardsOnHome">

                    {noSpecialities ? <p>No Specialities</p> :

                        visibleSpecializations.map((specialization) => (
                            <CardSp
                                key={specialization.id}
                                name={specialization.name}
                                imageUrl={specialization.imageUrl}
                            />
                        ))}
                </div>
                <div className="pagination">
                    {Array.from({ length: search ? searchPages : totalPages }, (_, index) => (
                        <button
                            key={index}
                            onClick={() => handlePageChange(index + 1)}
                            className={currentPage === index + 1 ? "active" : ""}
                        >
                            {index + 1}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Index;
