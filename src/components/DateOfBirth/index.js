import React, { useEffect } from 'react';
import "./DateOfBirth.css"; 

const Index = ({day, setDay,month, setMonth,year, setYear}) => {


  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 100 }, (_, index) => currentYear - index);

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  useEffect(() => {
    const currentDate = new Date();
    setDay(currentDate.getDate());
    setMonth(currentDate.getMonth() + 1);
    setYear(currentDate.getFullYear());
  }, []);

  const handleDayChange = (event) => {
    setDay(event.target.value);
  };

  const handleMonthChange = (event) => {
    setMonth(event.target.value);
  };

  const handleYearChange = (event) => {
    setYear(event.target.value);
  };

  const daysInMonth = new Date(year, month, 0).getDate();
  const currentMonth = new Date().getMonth() + 1;
  const currentDay = new Date().getDate();
  const availableMonths = parseInt(year) === currentYear ? months.slice(0, new Date().getMonth() + 1) : months;
  const availableDays = parseInt(year) === currentYear && parseInt(month) === currentMonth ? currentDay : daysInMonth;

  return (
    <div className='dobDropdown'>
      <select value={day} onChange={handleDayChange}>
        {Array.from({ length: availableDays }, (_, index) => index + 1).map((dayValue) => (
          <option key={dayValue} value={dayValue}>
            {dayValue}
          </option>
        ))}
      </select>
      <select value={month} onChange={handleMonthChange}>
        {availableMonths.map((monthName, index) => (
          <option key={monthName} value={index + 1}>
            {monthName}
          </option>
        ))}
      </select>
      <select value={year} onChange={handleYearChange}>
        {years.map((yearValue) => (
          <option key={yearValue} value={yearValue}>
            {yearValue}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Index;








