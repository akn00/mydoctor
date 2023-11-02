import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import Header from './index';
import { MemoryRouter } from 'react-router-dom'; // Import MemoryRouter

describe('Header component', () => {
  
  it('renders Header component correctly', () => {
    

    // Check that there is exactly one element with the alt text 'logo'
    const logoImages = queryAllByAltText('logo');
    expect(logoImages).toHaveLength(2);

    // Check other necessary assertions
    const elements = queryAllByPlaceholderText('Search Doctors');
    expect(elements).toHaveLength(2);
    // Assert the length of elements, iterate through them, or select a specific index.
    
    // Add further assertions based on your UI and requirements
  });
  

  // Your other tests for the Header component
});
