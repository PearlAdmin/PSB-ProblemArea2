"use client";
import { Card } from 'react-bootstrap';
import styles from '@/components/create-record/styles.module.css';
import './home.cards.css'
import Link from 'next/link';
import { useState } from 'react';
import Popup from './popup';
import { useCookies } from 'react-cookie';
import useSWR from 'swr';

const CardIndiv = ({ id, lastName, firstname, scn, sn, date, route, func1, func2 }) => {
  const [cookies] = useCookies(['user']);
  const user = cookies.user;

  const [isDeleteOpen, setDeleteOpen] = useState(false);

  const openDelete = () => {
    setDeleteOpen(true);
  }

  const closeDelete = () => {
    setDeleteOpen(false);
  }

  const deleteRecord = async () => {
    try {
        const response = await fetch(process.env.NEXT_PUBLIC_VERCEL_URL+`/api/records?id=${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({isdeleted: true, expirationDate: new Date(Date.now() + 5 * 365 * 24 * 60 * 60 * 1000)}),
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
    // const {data, isLoading, error} = useSWR(`/api/records?id=${id}`, fetcher, {isdeleted: true});
    closeDelete();
    window.location.reload();
  }


  return (
      <div>
        <Card className="info d-flex flex-row align-items-center">
        <div className="p-2">
          {/* based on last updated */}
          {!route ? (
            <i className="bi bi-check-circle-fill text-success"></i>
          ) : (
            <i className='bi bi-x-circle-fill text-danger'></i>
          )}
        </div>
        <div className="p-2 flex-grow-1">
          <div style={{ fontWeight: 'bold' }}>
            <a>{lastName}</a><a>{", "}</a><a>{firstname}</a>
          </div>
          <div style={{ display: 'flex' }}>
            <div style={{ fontSize: '10px' }}><a>SCN#</a>{scn}</div>
            <div style={{ fontSize: '10px', marginLeft: '20px' }}><a>SN#</a>{sn}</div>
          </div>
          <div style={{ fontSize: '10px' }}><a>Assigned Date: </a>{date}</div>
        </div>
        {!route ? (
          <div className="p-2 d-flex flex-row align-items-center">
            <Link href={`/view/${id}`} style={{ textDecoration: "none", color: "inherit"} }>
              <i className="bi bi-download p-3"></i>
            </Link>
            <Link href={`/record/${id}`} style={{ textDecoration: "none", color: "inherit"} }>
              <i className="bi bi-pencil-fill p-3 my-auto" onClick={func1}></i>
            </Link>
            { user && user.role === "admin" && (
              <i className="bi bi-trash p-3" onClick={openDelete}></i>
            )}
          </div>
        ) : (
            <div className="p-2 d-flex flex-row">
                <i className={`${styles.button} bi bi-bootstrap-reboot p-3`} onClick={func1}></i>
                 <i className={`${styles.button} bi bi-trash p-3`} onClick={func2}></i>
            </div>
        )}
      </Card>
      {isDeleteOpen && <Popup question={"Are you sure you want to delete this record?"} firstBtnLabel={"Yes"} secondBtnLabel={"No"} firstBtnFunc={deleteRecord} secondBtnFunc={closeDelete} isYesNoQuestion={true}/>}
    </div>
    );
  };
export default CardIndiv;
