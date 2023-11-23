"use client"
import React, { useState } from 'react';
import { Form } from '@/components/bootstrap';
import CardUser from './view-authorized-user-card';
import PaginationControls from "@/components/pagination";
import useSWR from 'swr';
import { useSearchParams, useRouter } from 'next/navigation';
import Loading from '@/components/loading';
import Error from '@/app/not-found';


/**
 * SWR function for fetching data from a given URL.
 *
 * @function
 * @param {string} url - The URL to fetch data from.
 * @returns {Promise} - A promise that resolves to the fetched data.
 */
const fetcher = (url) => fetch(url).then((res) => res.json());

/**
 * React component responsible for displaying a sorted list of users and pagination controls.
 *
 * @function
 * @param {Object} props - The properties passed to the component.
 * @param {string} props.page - The current page number.
 * @param {string} props.searchText - The search text for filtering users.
 * @returns {React.Element} - The DisplaySorted component JSX.
 */
function DisplaySorted({page, searchText}){
    const [currSearch, setcurrSearch] = useState(searchText);
    const {data, isLoading, error} = useSWR(`/api/manage-user?page=${page}&searchText=${searchText}`, fetcher);
    const router = useRouter();
    const basePath = process.env.NEXT_PUBLIC_VERCEL_URL;

    if (isLoading) return (<Loading/>);

    if (error) return (<Error/>);

    // const users = data.users;
    if (currSearch != searchText){
        setcurrSearch(searchText);
        router.push(basePath + `/manage-user/?page=1`);
    }

    const items = data;

    return(
        <div>
            {items.users.map((user, index) => (
                <CardUser
                    key={index}
                    username={user.username}
                    password={user.password}
                    pageNum={page}
                    searchText={searchText}
                />
            ))}
            
            <PaginationControls count={data.limit} perpage={data.per_page} route={'/manage-user'} />
        </div>
    );
}

/**
 * React component for displaying a list of users with search and pagination functionality.
 *
 * @function
 * @returns {React.Element} - The UserList component JSX.
 */
function UserList() {
    const [searchText, setSearchText] = useState('');
    
    const url = useSearchParams();
    const page = url.get('page') ?? '1';
    const router = useRouter();
    const basePath = process.env.NEXT_PUBLIC_VERCEL_URL;

    const handleSearchChange = (e) => {
        const searchText = e.target.value;
        setSearchText(searchText);
        router.push(basePath + `/manage-user/?page=1`);
    };

    return (
        <div>
            <h1 className='flex-grow-1' style={{ fontWeight: 'bolder', paddingTop: '10px', paddingBottom: '10px' }}>User List</h1>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ marginRight: '5px', marginBottom: '5px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Form.Control
                        type="text"
                        placeholder="Search Username..."
                        id="search"
                        name="search"
                        value={searchText}
                        onChange={handleSearchChange}
                        style={{ height: '31px' }}
                    />
                </div>
            </div>
            <DisplaySorted page={page} searchText={searchText} />
        </div>
    );
}

export default UserList;


