"use client"
import React, { useState } from 'react';
import { Form } from '@/components/bootstrap';
import CardIndiv from "@/components/view-all-individual-card";
import styles from '@/app/homepage.module.css';

function SortBy({ items }) {
    const [selectedValue, setSelectedValue] = useState('SCN');
    const [searchValue, setsearchValue] = useState('SCN');
    const [searchText, setSearchText] = useState(''); 

    const sortData = (data, sortBy) => {
        if (!Array.isArray(data.records)) {
            return [];
        }

        return data.records.slice().sort((a, b) => {
            if (sortBy === 'SCN') {
                const scnA = parseInt(a['SCN: ']);
                const scnB = parseInt(b['SCN: ']);
                return scnA - scnB;
            } else if (sortBy === 'SN') {
                const snA = parseInt(a['SN: ']);
                const snB = parseInt(b['SN: ']);
                return snA - snB;
            } else if (sortBy === 'Lastname') {
                return a['Last Name: '].localeCompare(b['Last Name: ']);
            } else if (sortBy === 'Firstname') {
                return a['First Name: '].localeCompare(b['First Name: ']);
            }
            return 0;
        });
    };

    const handleSearchChange = (e) => {
        setSearchText(e.target.value);
    };

    // Filter the data based on the selected sorting value
    const filteredData = items.records.filter((item) => {
        if (searchValue === 'SCN') {
            return item['SCN: '].includes(searchText);
        } else if (searchValue === 'SN') {
            return item['SN: '].includes(searchText);
        } else if (searchValue === 'Lastname') {
            return item['Last Name: '].toLowerCase().includes(searchText.toLowerCase());
        } else if (searchValue === 'Firstname') {
            return item['First Name: '].toLowerCase().includes(searchText.toLowerCase());
        }
        return false;
    });

    const sortedData = sortData({ records: filteredData }, selectedValue);

    return (
        <div>
            <div className={`${styles.header} mb-3`}>
                <Form.Select
                    id="searchChild"
                    name="searchChild"
                    className={`custom-select ${styles.customHeight31}`}
                    style={{ width: '90px' }}
                    value={searchValue}
                    onChange={(e) => setsearchValue(e.target.value)} 
                >
                    <option value="SCN">SCN</option>
                    <option value="SN">SN</option>
                    <option value="Lastname">Lastname</option>
                    <option value="Firstname">Firstname</option>
                </Form.Select>

                <Form.Control
                    type="text"
                    placeholder="Search..."
                    id="search"
                    name="search"
                    value={searchText}
                    onChange={handleSearchChange}
                    style={{ maxWidth: '900px' }}
                />

                <div className={`${styles.customHeight31} align-items-center p-2`} style={{ width: '90px' }}>Sort By:</div>

                <Form.Select
                    id="sortBy"
                    name="sortBy"
                    className={`custom-select ${styles.customHeight31}`}
                    style={{ width: '200px' }}
                    value={selectedValue}
                    onChange={(e) => setSelectedValue(e.target.value)}
                >
                    <option value="SCN">SCN</option>
                    <option value="SN">SN</option>
                    <option value="Lastname">Lastname</option>
                    <option value="Firstname">Firstname</option>
                </Form.Select>
            </div>

            {/* Display the sorted data */}
            {sortedData.map((item, index) => (
                <CardIndiv
                    key={index}
                    lastName={item['Last Name: ']}
                    firstname={item['First Name: ']}
                    scn={item['SCN: ']}
                    sn={item['SN: ']}
                    date={item['Assigned Date: ']}
                />
            ))}
        </div>
    );
}

export default SortBy;
