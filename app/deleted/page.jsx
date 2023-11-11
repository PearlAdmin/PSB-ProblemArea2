"use client";
import Navbar from "@/components/navigation";
import CardIndiv from "@/components/view-all-individual-card";
import { Button/*, Form, InputGroup*/ } from '@/components/bootstrap';
import styles from '@/app/homepage.module.css';
import PaginationControls from "@/components/pagination";
import { handleCookie } from "@/app/login/page";
import Popup from "@/components/popup";
import { useState, useEffect } from 'react';

const getRecords = async ({searchParams}) => {
    try {
      const page = searchParams['page'] ?? '1';
  
      const response = await fetch(process.env.NEXT_PUBLIC_API_BASE_URL+`/api/records?page=${page}`,{
        cache: 'no-store',
        method: 'GET'
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch records...');
      }
  
      return new Promise((resolve) => 
        setTimeout(() => {
          resolve(response.json())
        }, 1000));
    } catch (error) {
      console.log("Error loading topics: ", error);
    }
  }

const Deleted = ({searchParams}) => {
    // const data = await getRecords({searchParams});
    // const cookieResult = await handleCookie(); 

    // Popup Visbility Variables
    const [data, setData] = useState(null);
    const [cookieResult, setCookie] = useState(null);
    const [isRecoverAllOpen, setRecoverAllOpen] = useState(false);
    const [isPermaDeleteAllOpen, setPermaDeleteAllOpen] = useState(false);
    const [isRecoverOpen, setRecoverOpen] = useState(false);
    const [isPermaDeleteOpen, setPermaDeleteOpen] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const records = await getRecords({ searchParams });
            setData(records);
          } catch (error) {
            console.error('Error fetching records:', error);
            // Handle error as needed
          }
        };
    
        const fetchCookie = async () => {
          try {
            const cookieResult = await handleCookie();
            setCookie(cookieResult);
            // Do something with the cookie result if needed
          } catch (error) {
            console.error('Error handling cookie:', error);
            // Handle error as needed
          }
        };

        fetchData();
        fetchCookie();
    }, [searchParams]);

    // Popup Functions
    const openRecoverAll = (e) => {
        e.preventDefault();
        setRecoverAllOpen(true);
    }

    const openDeleteAll = (e) => {
        e.preventDefault();
        setPermaDeleteAllOpen(true);
    }

    const recoverAll = (e) => {
        e.preventDefault();
        closeModal(e);
        // backend stuff
    }

    const deleteAll = (e) => {
        e.preventDefault();
        closeModal(e);
        // backend stuff
    }

    const openRecover = (e) => {
        e.preventDefault();
        setRecoverOpen(true);
    }

    const openPermaDelete = (e) => {
        e.preventDefault();
        setPermaDeleteOpen(true);
    }

    const recoverRecord = (e) => {
        e.preventDefault();
        closeModal(e);
        // backend stuff
    }

    const permaDeleteRecord = (e) => {
        e.preventDefault();
        closeModal(e);
        // backend stuff
    }

    const closeModal = (e) => {
        e.preventDefault();
        setRecoverAllOpen(false);
        setPermaDeleteAllOpen(false);
        setRecoverOpen(false);
        setPermaDeleteOpen(false);
    }
     
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
            {/* <SortBy items={data} /> */}
  
            {/* {data.records.map((sample, i) => {
              return (
                <CardIndiv
                  key={i}
                  lastName={sample['Last Name: ']}
                  firstname={sample['First Name: ']}
                  scn={sample['SCN: ']}
                  sc={sample['SN: ']}
                  date={sample['Assigned Date: ']}
                  route={"deleted"}
                />
              )
            })} */}

            {/* Sample Post */}
            <CardIndiv
                  lastName={"Yu"}
                  firstname={"Marco"}
                  scn={"121"}
                  sc={"122"}
                  date={"12/03/2002"}
                  route={"deleted"}
                  func1={openRecover}
                  func2={openPermaDelete}
            />
  
            {/* Pagination */}
            <PaginationControls count={data?.limit} perpage={data?.per_page} route={"deleted"}/>
          </div>
        </div>
        {isRecoverAllOpen && <Popup question={"Are you sure you want to recover all records?"} yesLabel={"Yes"} noLabel={"No"} yesFunc={recoverAll} noFunc={closeModal}/>}
        {isPermaDeleteAllOpen && <Popup question={"Are you sure you want to delete all records?"} yesLabel={"Yes"} noLabel={"No"} yesFunc={deleteAll} noFunc={closeModal}/>}
        {isRecoverOpen && <Popup question={"Are you sure you want to recover this record?"} yesLabel={"Yes"} noLabel={"No"} yesFunc={recoverRecord} noFunc={closeModal}/>}
        {isPermaDeleteOpen && <Popup question={"Are you sure you want to permanently delete this record?"} yesLabel={"Yes"} noLabel={"No"} yesFunc={permaDeleteRecord} noFunc={closeModal}/>}
      </div>
    );
  }

 export default Deleted;