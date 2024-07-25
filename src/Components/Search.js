import React, { useState } from 'react';
import Downshift from 'downshift';
import { GEO_API_URL, GeoApiOptions } from '../Api';

const Search = ({ onSearchChange }) => {
    const [items, setItems] = useState([]);
    const [inputValue, setInputValue] = useState('');

    const loadOptions = async (inputValue) => {
        try {
            const response = await fetch(`${GEO_API_URL}/cities?minPopulation=1000000&namePrefix=${inputValue}`, GeoApiOptions);
            const data = await response.json();
            const cities = data.data.map((city) => ({
                label: `${city.name}, ${city.country}`,
                value: `${city.latitude},${city.longitude}`
            }));
            setItems(cities);
        } catch (error) {
            console.error('Error fetching items:', error);
        }
    };

    const handleInputValueChange = (value) => {
        setInputValue(value);
        loadOptions(value);
    };

    const handleChange = (selectedItem) => {
        onSearchChange(selectedItem);
    };

    return (
        <Downshift
            onChange={handleChange}
            onInputValueChange={handleInputValueChange}
            itemToString={(item) => (item ? item.label : '')}
        >
            {({
                getInputProps,
                getItemProps,
                getMenuProps,
                isOpen,
                inputValue,
                highlightedIndex,
                selectedItem,
            }) => (
                <div className="form-floating">
                    <input className="form-control" {...getInputProps({ placeholder: 'Search for City' })} />
                    <label htmlFor="floatingInputValue">Search for City</label>
                    <ul {...getMenuProps()}>
                        {isOpen &&
                            items
                                .filter((item) => !inputValue || item.label.toLowerCase().includes(inputValue.toLowerCase()))
                                .map((item, index) => (
                                    <li
                                        {...getItemProps({
                                            key: item.value,
                                            index,
                                            item,
                                            style: {
                                                backgroundColor: highlightedIndex === index ? 'lightgray' : 'white',
                                                fontWeight: selectedItem === item ? 'bold' : 'normal',
                                            },
                                        })}
                                    >
                                        {item.label}
                                    </li>
                                ))}
                    </ul>
                </div>
            )}
        </Downshift>
    );
};

export default Search;
