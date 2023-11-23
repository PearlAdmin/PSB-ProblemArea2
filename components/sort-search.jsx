    "use client"
    import React, { useState } from 'react';
    import { Form } from '@/components/bootstrap';
    import CardIndiv from "@/components/view-all-individual-card";
    import styles from '@/app/homepage.module.css';
    import PaginationControls from "@/components/pagination";
    import useSWR from 'swr';
    import { useSearchParams, useRouter } from 'next/navigation';
    import Loading from './loading';

    /**
     * SWR function for fetching data from a given URL.
     *
     * @function
     * @param {string} url - The URL to fetch data from.
     * @returns {Promise} - A promise that resolves to the fetched data.
     */
    const fetcher = (url) => fetch(url).then((res) => res.json());

    /**
     * Renders a sorted list of records based on specified criteria.
     *
     * @param {Object} props - The component props.
     * @param {number} props.page - The current page number.
     * @param {string} props.searchText - The search text for filtering records.
     * @param {string} props.selectedValue - The selected sorting criteria.
     * @param {string} props.searchValue - The specific field to search within.
     * 
     * @returns {JSX.Element} JSX Element representing the sorted records.
     */
    function DisplaySorted({page, searchText, selectedValue, searchValue}){
        const router = useRouter();

        const {data, isLoading, error} = useSWR(`/api/all-records?page=${page}&searchText=${searchText}&searchValue=${searchValue}&selectedValue=${selectedValue}`, fetcher);

        if (isLoading) return (<Loading/>);
        
        if (error) {
            router.push('/not-found');
        };

        const items = data;

        return(
            <div>
                {items.records.length > 0 ? (items.records.map((item, i) => (
                    <CardIndiv
                        key={i}
                        id={item._id}
                        lastName={item['Last Name: '].value}
                        firstname={item['First Name: '].value}
                        scn={item['SCN: '].value}
                        sn={item['SN: '].value}
                        date={item['Assigned Date: '].value}
                    /> 
                ))) : (
                    <p>No Records to Display yet...</p>
                )}
                
                <PaginationControls count={items.limit} perpage={items.per_page} />
            </div>
        );
    }

    /**
     * SortBy component for displaying and sorting records based on different criteria.
     *
     * @component
     * @returns {JSX.Element} JSX Element representing the SortBy component.
     */
    function SortBy() {
        const [searchText, setSearchText] = useState('');
        const [selectedValue, setSelectedValue] = useState('SCN: ');
        const [searchValue, setsearchValue] = useState('SCN: ');
        const url = useSearchParams();
        const page = url.get('page') ?? '1';
        const router = useRouter();
        const basePath = process.env.NEXT_PUBLIC_VERCEL_URL;

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
                        style={{ width: '150px' }}
                        value={searchValue}
                        onChange={(e) => setsearchValue(e.target.value)} 
                    >
                        <option value="SCN: ">SCN</option>
                        <option value="SN: ">SN</option>
                        <option value="Last Name: ">Lastname</option>
                        <option value="First Name: ">Firstname</option>
                        <option value="Assigned Date: ">Assigned Date</option>
                    </Form.Select>

                    <Form.Control
                        type="text"
                        placeholder="Search..."
                        id="search"
                        name="search"
                        value={searchText}
                        onChange={handleSearchChange}
                        style={{ maxWidth: '800px' }}
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
                        <option value="Assigned Date: ">Assigned Date</option>
                    </Form.Select>
                </div>

                {/* Display the sorted data */}
                <DisplaySorted page={page} searchText={searchText} selectedValue={selectedValue} searchValue={searchValue}/>            
            </div>
        );
    }

    export default SortBy;

