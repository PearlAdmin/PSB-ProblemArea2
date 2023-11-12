"use client"
import React, { useState, useEffect } from 'react';
import { Form } from '@/components/bootstrap';
import CardIndiv from "@/components/view-all-individual-card";
import styles from '@/app/homepage.module.css';
import PaginationControls from "@/components/pagination";
import useSWR from 'swr';
import { useSearchParams, useRouter } from 'next/navigation';

const fetcher = (url) => fetch(url).then((res) => res.json());

function DisplaySorted({page, searchText, selectedValue, searchValue}){

    const {data, isLoading, error} = useSWR(`/api/all-records?page=${page}&searchText=${searchText}&searchValue=${searchValue}&selectedValue=${selectedValue}`, fetcher);

    if (isLoading) return (<div>Loading...</div>);
    
    if (error) return (<div>{error.message}</div>);

    const items = data;

    return(
        <div>
            {items.records.map((item, index) => (
            <CardIndiv
                key={index}
                lastName={item['Last Name: '].value}
                firstname={item['First Name: '].value}
                scn={item['SCN: '].value}
                sn={item['SN: '].value}
                date={item['Assigned Date: '].value}
            />))}
            <PaginationControls count={items.limit} perpage={items.per_page} />
        </div>
    );
}

function SortBy() {
    const [searchText, setSearchText] = useState('');
    const [selectedValue, setSelectedValue] = useState('SCN: ');
    const [searchValue, setsearchValue] = useState('SCN: ');
    const url = useSearchParams();
    const page = url.get('page') ?? '1';
    const router = useRouter();
    const basePath = process.env.NEXT_PUBLIC_API_BASE_URL;

    const handleSearchChange = (e) => {
        const searchText = e.target.value;
        setSearchText(searchText);
        router.push(basePath + `/?page=1`);
    };

    const handleSortChange = (e) => {
        const selectedValue = e.target.value;
        setSelectedValue(selectedValue);
        router.push(basePath + `/?page=1`);
    };


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
                    <option value="SCN: ">SCN</option>
                    <option value="SN: ">SN</option>
                    <option value="Last Name: ">Lastname</option>
                    <option value="First Name: ">Firstname</option>
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
                    onChange={handleSortChange}
                >
                    <option value="SCN: ">SCN</option>
                    <option value="SN: ">SN</option>
                    <option value="Last Name: ">Lastname</option>
                    <option value="First Name: ">Firstname</option>
                </Form.Select>
            </div>

            {/* Display the sorted data */}
            <DisplaySorted page={page} searchText={searchText} selectedValue={selectedValue} searchValue={searchValue}/>            
        </div>
    );
}

export default SortBy;

