import { Card } from 'react-bootstrap';
import styles from '@/components/create-record/styles.module.css';
import './home.cards.css'
import Link from 'next/link';

const CardIndiv = ({ lastName, firstname, scn, sn, date, route, func1, func2 }) => {
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
          <div className="p-2 d-flex flex-row">
            <Link href={`/record/${scn}`} style={{ textDecoration: "none", color: "inherit" }}>
              <i className="bi bi-pencil-fill p-3" onClick={func1}></i>
              <i className="bi bi-trash p-3" onClick={func2}></i>
            </Link>
          </div>
        ) : (
          <div className="p-2 d-flex flex-row">
              <i className={`${styles.button} bi bi-bootstrap-reboot p-3`} onClick={func1}></i>
              <i className={`${styles.button} bi bi-trash p-3`} onClick={func2}></i>
          </div>
        )}
      </Card>
    </div>
    );
  };
export default CardIndiv;
