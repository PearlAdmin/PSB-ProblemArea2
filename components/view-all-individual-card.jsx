"use client";
import { Card } from 'react-bootstrap';
import styles from '@/components/create-record/styles.module.css';
import './home.cards.css'
import Link from 'next/link';
import { useState } from 'react';
import Popup from './popup';
import { useCookies } from 'react-cookie';

/**
 * CardIndiv component representing an individual record card.
 *
 * @component
 * @param {Object} props - The properties of the CardIndiv component.
 * @param {string} props.id - The unique identifier for the record.
 * @param {string} props.lastName - The last name of the individual.
 * @param {string} props.firstname - The first name of the individual.
 * @param {string} props.scn - The SCN (Serial Control Number) of the individual.
 * @param {string} props.sn - The SN (Serial Number) of the individual.
 * @param {string} props.date - The assigned date for the record.
 * @param {string} props.route - The route or path associated with the record (optional).
 * @param {Function} props.func1 - The function to be executed on a specific action (optional).
 * @param {Function} props.func2 - The second function to be executed on a specific action (optional).
 * @returns {JSX.Element} JSX Element representing the CardIndiv component.
 */
//TODO: check if func1 and 2 are documented correct
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
            console.error('PATCH request failed');
        }
    } catch (error) {
        console.error('An error occurred:', error);
    };
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
        <div className="p-2 flex-grow-1 truncate">
          {!route ? (
            <div style={{ fontWeight: 'bold' }}>
              <Link href={`/record/${id}`} style={{ textDecoration: "none", color: "inherit"} }>
                <a>{lastName}</a><a>{", "}</a><a>{firstname}</a>
              </Link>
            </div>
          ) : (
            <div style={{ fontWeight: 'bold' }}>
                <a>{lastName}</a><a>{", "}</a><a>{firstname}</a>
            </div>
          )}

          <div style={{ display: 'flex' }}>
            <div style={{ fontSize: '10px'}}><a>SCN#</a>
              <div className='d-none d-md-inline'>{scn}</div>
              <div className='d-md-none d-inline'>{scn.length > 7 ? scn.substring(0,7)+'...' : scn}</div>
            </div>
            <div style={{ fontSize: '10px', marginLeft: '1rem' }}><a>SN#</a>
              <div className='d-none d-md-inline'>{sn}</div>
              <div className='d-md-none d-inline'>{sn.length > 7 ? sn.substring(0,7)+'...' : sn}</div>
            </div>
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
