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
    function DisplaySorted({page, searchText, selectedValue, searchValue, isdeleted, openRecover, openPermaDelete}){
        const router = useRouter();
        // console.log("DELETED:",isdeleted);

        const {data, isLoading, error} = useSWR(`/api/all-records?page=${page}&searchText=${searchText}&searchValue=${searchValue}&selectedValue=${selectedValue}${isdeleted ? '&deleted=true' : ''}`, fetcher);

        if (isLoading) return (<Loading/>);
        
        if (error) {
            router.push('/not-found');
        };

        const items = data;

        return(
            <>
            { !isdeleted ? (
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
                        <p>No records to display.</p>
                    )}
                    
                    <PaginationControls count={items.limit} perpage={items.per_page} />
                </div>
            ) : (
                <div>
                    {items.records.length > 0 ? (items.records.map((item, index) => (
                        <CardIndiv
                            key={index}
                            id={item._id}
                            lastName={item['Last Name: '].value}
                            firstname={item['First Name: '].value}
                            scn={item['SCN: '].value}
                            sn={item['SN: '].value}
                            date={item['Assigned Date: '].value}
                            route={"deleted"}
                            func1={(e)=>openRecover(e, item._id)}
                            func2={(e)=>openPermaDelete(e, item._id)}
                        />))) : (
                        <p>No deleted records.</p>
                    )}
                    
                    <PaginationControls count={data?.limit} perpage={data?.per_page} route={"deleted"}/>
                </div>
            )}
            </>
        );
    }

    /**
     * SortBy component for displaying and sorting records based on different criteria.
     *
     * @component
     * @returns {JSX.Element} JSX Element representing the SortBy component.
     */
    function SortBy({isdeleted, openRecover, openPermaDelete}) {
        const [searchText, setSearchText] = useState('');
        const [selectedValue, setSelectedValue] = useState('SCN: ');
        const [searchValue, setsearchValue] = useState('SCN: ');
        isdeleted = isdeleted ?? false;
        const url = useSearchParams();
        const page = url.get('page') ?? '1';
        const router = useRouter();
        const basePath = process.env.NEXT_PUBLIC_VERCEL_URL;
        const path = isdeleted ? "deleted" : "";

        const handleSearchChange = (e) => {
            const searchText = e.target.value;
            if(!searchText.includes('\\')){
                setSearchText(searchText);
                router.push(basePath + `/${path}?page=1`);
            }
        };

        const handleSortChange = (e) => {
            const selectedValue = e.target.value;
            setSelectedValue(selectedValue);
            router.push(basePath + `/${path}?page=1`);
        };

        return (
            <div>
                <div className={`${styles.header} mb-3`}>
                    <Form.Select
                        id="searchChild"
                        name="searchChild"
                        className={`custom-select ${styles.customHeight31}`}
                        style={{ maxWidth: '150px' }}
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
                        style={{ maxWidth: '200px' }}
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
                <DisplaySorted page={page} searchText={searchText} selectedValue={selectedValue} searchValue={searchValue} isdeleted={isdeleted} openRecover={openRecover} openPermaDelete={openPermaDelete}/>            
            </div>
        );
    }

    export default SortBy;

