"use client";
import Navbar from "@/components/navigation";
import CardIndiv from "@/components/view-all-individual-card";
import { Button } from '@/components/bootstrap';
import styles from '@/app/homepage.module.css';
import PaginationControls from "@/components/pagination";
import Popup from "@/components/popup";
import { useState } from 'react';
import useSWR from 'swr';
import {  useSearchParams, useRouter } from 'next/navigation';

const fetcher = (url) => fetch(url).then((res) => res.json());

const Deleted = ({searchParams}) => {
    // const data = await getRecords({searchParams});
    // const cookieResult = await handleCookie(); 

    // Popup Visbility Variables
    // const [records, setRecords] = useState(null);
    const [cookieResult, setCookie] = useState(null);
    const [isRecoverAllOpen, setRecoverAllOpen] = useState(false);
    const [isPermaDeleteAllOpen, setPermaDeleteAllOpen] = useState(false);
    const [isRecoverOpen, setRecoverOpen] = useState(false);
    const [isPermaDeleteOpen, setPermaDeleteOpen] = useState(false);

    const [searchText, setSearchText] = useState('');
    const [selectedValue, setSelectedValue] = useState('SCN: ');
    const [searchValue, setsearchValue] = useState('SCN: ');
    const url = useSearchParams();
    const page = url.get('page') ?? '1';
    const router = useRouter();
    const basePath = process.env.NEXT_PUBLIC_VERCEL_URL;

    const[id, setId] = useState('')

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

    // Popup Functions
    const openRecoverAll = (e) => {
        e.preventDefault();
        setRecoverAllOpen(true);
    }

    const openDeleteAll = (e) => {
        e.preventDefault();
        setPermaDeleteAllOpen(true);
    }

    const recoverAll = async(e) => {
        e.preventDefault();
        // backend stuff
        try {
          const response = await fetch(basePath+`/api/records?recover=true`, {
          method: 'PATCH',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({isdeleted: false}),
          });
  
          if (response.ok) {
            // Handle the successful response here
            console.log('PATCH request was successful');
          } else {
          // Handle errors or non-2xx responses
              const data = await response.json()
              console.error('PATCH request failed');
          }
          alert("All records have been recovered!");
          window.location.reload();
      } catch (error) {
          console.error('An error occurred:', error);
      };
      closeModal(e);
    }

    const deleteAll = async(e) => {
        e.preventDefault();
        try {
          const response = await fetch(basePath+`/api/records`, {
          method: 'DELETE',
          headers: {
              'Content-Type': 'application/json',
          },
          });
  
          if (response.ok) {
            // Handle the successful response here
            console.log('PATCH request was successful');
          } else {
          // Handle errors or non-2xx responses
              const data = await response.json()
              console.error('PATCH request failed');
          }
      } catch (error) {
          console.error('An error occurred:', error);
      };
        closeModal(e);
        // backend stuff
    }

    const openRecover = (e, id) => {
        e.preventDefault();
        setId(id)
        setRecoverOpen(true);
    }

    const openPermaDelete = (e, id) => {
        e.preventDefault();
        setId(id)
        setPermaDeleteOpen(true);
    }

    const recoverRecord = async(e, id) => {
        e.preventDefault();
        closeModal(e);
        // backend stuff
        try {
            const response = await fetch(basePath+`/api/records?id=${id}&recover=true`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({isdeleted: false}),
            });
    
            if (response.ok) {
              // Handle the successful response here
              console.log('PATCH request was successful');
            } else {
            // Handle errors or non-2xx responses
                const data = await response.json()
                console.error('PATCH request failed');
            }
        } catch (error) {
            console.error('An error occurred:', error);
        };
    }

    //TODO: FIGURE THIS OUT
    const permaDeleteRecord = async(e, id) => {
        e.preventDefault();
        console.log("ID IN REQ", id);
        try {
          const response = await fetch(basePath+`/api/records`, {
          method: 'DELETE',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({id: id})
          });

          if(response.ok){
            window.location.reload();
            alert("Record has been permanently deleted!");
          }else{
            alert("Could not delete record!");
          }
      } catch (error) {
          console.error('An error occurred:', error);
      };
        closeModal(e);
        // backend stuff
    }

    const closeModal = (e) => {
        e.preventDefault();
        setId('')
        setRecoverAllOpen(false);
        setPermaDeleteAllOpen(false);
        setRecoverOpen(false);
        setPermaDeleteOpen(false);
    }
    
    const {data, isLoading, error} = useSWR(`/api/all-records?page=${page}&searchText=${searchText}&searchValue=${searchValue}&selectedValue=${selectedValue}&deleted=true`, fetcher);

    if (isLoading) return (<div>Loading...</div>);
    
    if (error) {
        router.push('/');
    };
     
    const items = data;

    return (
      <div>
        <Navbar cookie = {cookieResult} />
        <div className="d-flex justify-content-center align-items-center">
          <div id="todoContainer" className={styles.todoContainer}>
            <div className={styles.header}>
              <h3 style={{ fontWeight: "bolder" }} className="p-2 flex-grow-1">
                Deleted Records
              </h3>
              <Button
                variant="outline-dark"
                className={`p-2 ${styles.customHeight31} d-flex align-items-center`}
                style={{ marginRight: "5px" }}
                onClick={openRecoverAll}
              >
                Recover All
              </Button>
              <Button
                variant="outline-dark"
                className={`p-2 ${styles.customHeight31} d-flex align-items-center`}
                style={{ marginRight: "5px" }}
                onClick={openDeleteAll}
              >
                Permanently Delete All
              </Button>
            </div>

            {/* Sample Post */}
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
              <p>No Deleted Records...</p>
            )}
  
            {/* Pagination */}
            <PaginationControls count={data?.limit} perpage={data?.per_page} route={"deleted"}/>
          </div>
        </div>
        {isRecoverAllOpen && items.record && <Popup question={"Are you sure you want to recover all records?"} firstBtnLabel={"Yes"} secondBtnLabel={"No"} firstBtnFunc={recoverAll} secondBtnFunc={closeModal} isYesNoQuestion={true}/>}
        {isPermaDeleteAllOpen && items.record && <Popup question={"Are you sure you want to delete all records?"} firstBtnLabel={"Yes"} secondBtnLabel={"No"} firstBtnFunc={deleteAll} secondBtnFunc={closeModal} isYesNoQuestion={true}/>}
        {isRecoverOpen && items.record && <Popup question={"Are you sure you want to recover this record?"} firstBtnLabel={"Yes"} secondBtnLabel={"No"} firstBtnFunc={(e)=>recoverRecord(e, id)} secondBtnFunc={closeModal} isYesNoQuestion={true}/>}
        {isPermaDeleteOpen && items.record && <Popup question={"Are you sure you want to permanently delete this record?"} firstBtnLabel={"Yes"} secondBtnLabel={"No"} firstBtnFunc={(e)=>permaDeleteRecord(e, id)} secondBtnFunc={closeModal} isYesNoQuestion={true}/>}
      </div>
    );
  }

 export default Deleted;