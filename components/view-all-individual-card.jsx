import { Card } from 'react-bootstrap';
import styles from '@/components/create-record/styles.module.css';
import './home.cards.css'
import Link from 'next/link';
import { useState } from 'react';
import Popup from './popup';

const CardIndiv = ({ lastName, firstname, scn, sn, date, route, func1, func2 }) => {

  const [isDeleteOpen, setDeleteOpen] = useState(false);

  const openDelete = () => {
    setDeleteOpen(true);
  }

  const closeDelete = () => {
    setDeleteOpen(false);
  }

  const deleteRecord = () => {
    closeDelete();
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
          <div style={{ fontSize: '10px' }}><a>Last Updated: </a>{date}</div>
        </div>
        {!route ? (
          <div className="p-2 d-flex flex-row align-items-center">
            <Link href={`/record/${scn}`} style={{ textDecoration: "none", color: "inherit"} }>
              <i className="bi bi-pencil-fill p-3 my-auto" onClick={func1}></i>
            </Link>
            <i className="bi bi-trash p-3" onClick={openDelete}></i>
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
