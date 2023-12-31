"use client";
import Navbar from "@/components/navigation";
import { Button } from '@/components/bootstrap';
import styles from '@/app/homepage.module.css';
import Popup from "@/components/popup";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import SortBy from "@/components/sort-search";

/**
 * Deleted page. Displays the deleted records page.
 * 
 * @page
 * @return {JSX.Element} The Deleted page.
 */

const Deleted = () => {
    // State variables
    const [cookieResult] = useState(null);
    const [isRecoverAllOpen, setRecoverAllOpen] = useState(false);
    const [isPermaDeleteAllOpen, setPermaDeleteAllOpen] = useState(false);
    const [isRecoverOpen, setRecoverOpen] = useState(false);
    const [isPermaDeleteOpen, setPermaDeleteOpen] = useState(false);
    const router = useRouter();
    const basePath = process.env.NEXT_PUBLIC_VERCEL_URL;

    // id of record to be recovered or permanently deleted
    const[id, setId] = useState('');

    // open recover all popup
    const openRecoverAll = (e) => {
        e.preventDefault();
        setRecoverAllOpen(true);
    }

    // open permanently delete all popup
    const openDeleteAll = (e) => {
        e.preventDefault();
        setPermaDeleteAllOpen(true);
    }

    // recover all records
    const recoverAll = async(e) => {
        e.preventDefault();
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
            alert("All records have been recovered!");
            if (window.location.href == basePath + '/deleted') {
              window.location.reload();
            } else {
              router.push('/deleted');
            }
          } else {
          // Handle errors or non-2xx responses
              const data = await response.json()
              console.error('PATCH request failed');
              alert("Could not recover all records!");
          }
      } catch (error) {
          console.error('An error occurred:', error);
      };
      closeModal(e);
    }

    // permanently delete all records
    const deleteAll = async(e) => {
        e.preventDefault();
        try {
          const response = await fetch(basePath+`/api/records`, {
          method: 'DELETE',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({id: "ALL"})
          });
  
          if (response.ok) {
            // Handle the successful response here
            alert("All records have been permanently deleted!");
            if (window.location.href == basePath + '/deleted') {
              window.location.reload();
            } else {
              router.push('/deleted');
            }
          } else {
          // Handle errors or non-2xx responses
              const data = await response.json()
              console.error('DELETE request failed');
              console.log(data);
              alert("Could not delete all records!");
          }
      } catch (error) {
          console.error('An error occurred:', error);
          alert(error);
      };
        closeModal(e);
    }

    // open recover popup
    const openRecover = (e, id) => {
        e.preventDefault();
        setId(id)
        setRecoverOpen(true);
    }

    // open permanently delete popup
    const openPermaDelete = (e, id) => {
        e.preventDefault();
        setId(id)
        setPermaDeleteOpen(true);
    }

    // recover record
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
              alert("Record has been recovered!");
              if (window.location.href == basePath + '/deleted') {
                window.location.reload();
              } else {
                router.push('/deleted');
              }
            } else {
            // Handle errors or non-2xx responses
                const data = await response.json()
                console.error('PATCH request failed');
                alert("Could not recover record!");
            }
        } catch (error) {
            console.error('An error occurred:', error);
        };
    }

    // permanently delete record
    const permaDeleteRecord = async(e, id) => {
        e.preventDefault();
        try {
          const response = await fetch(basePath+`/api/records`, {
          method: 'DELETE',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({id: id})
          });

          if(response.ok){
            alert("Record has been permanently deleted!");
            if (window.location.href == basePath + '/deleted') {
              window.location.reload();
            } else {
              router.push('/deleted');
            }
          }else{
            alert("Could not delete record!");
          }
      } catch (error) {
          console.error('An error occurred:', error);
      };
        closeModal(e);
    }

    // close popup
    const closeModal = (e) => {
        e.preventDefault();
        setId('')
        setRecoverAllOpen(false);
        setPermaDeleteAllOpen(false);
        setRecoverOpen(false);
        setPermaDeleteOpen(false);
    }

    
    
    return (
      <div>
        <Navbar cookie = {cookieResult} />
        <div className="d-flex justify-content-center align-items-center">
          <div id="todoContainer" className={`${styles.todoContainer} d-flex justify-content-center m-2 m-md-4`}>
            <div className={`${styles.header} p-2 pe-0 align-items-center d-flex justify-content-between flex-row`}>
              <div>
                <h3 style={{ fontWeight: "bolder" }}>
                  Deleted Records
                </h3>
              </div>
              <div className="d-flex ms-auto">
                <Button
                  variant="outline-dark"
                  className={`me-2`}
                  onClick={openRecoverAll}
                >
                  Recover All
                </Button>
                <Button
                  variant="outline-dark"
                  className={`me-0`}
                  onClick={openDeleteAll}
                >
                  Permanently Delete All
                </Button>
              </div>
            </div>
            <SortBy isdeleted={true} openRecover={openRecover} openPermaDelete={openPermaDelete} isRecoverAllOpen={isRecoverAllOpen} isPermaDeleteAllOpen={isPermaDeleteAllOpen} recoverAll={recoverAll} deleteAll={deleteAll} closeModal={closeModal}/>
          </div>
        </div>
        {isRecoverOpen && <Popup question={"Are you sure you want to recover this record?"} firstBtnLabel={"Yes"} secondBtnLabel={"No"} firstBtnFunc={(e)=>recoverRecord(e, id)} secondBtnFunc={closeModal} isYesNoQuestion={true}/>}
        {isPermaDeleteOpen && <Popup question={"Are you sure you want to permanently delete this record?"} firstBtnLabel={"Yes"} secondBtnLabel={"No"} firstBtnFunc={(e)=>permaDeleteRecord(e, id)} secondBtnFunc={closeModal} isYesNoQuestion={true}/>}
      </div>
    );
  }

 export default Deleted;