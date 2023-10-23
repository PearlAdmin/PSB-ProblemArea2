import { FC } from 'react';
import Head from 'next/head'
import { Card } from 'react-bootstrap';

interface CardIndivProps {
  lastName: string;
  firstname: string;
  scn: string;
  sc: string;
  date: string;  
}

const CardIndiv: FC<CardIndivProps> = ({ lastName, firstname, scn, sc, date }) => {
  return (
      <div>
        <Head>
        <style dangerouslySetInnerHTML={{ __html: `        
        #todoContainer {
          display: flex;
          flex-direction: column;
          width: 80rem;
          background-color: #c5e2ea;
          border-radius: 5px;
          padding: 1rem;  
          margin: 2rem;
        }
        .header{
          display: flex;
          flex-direction: row;
        }
        .custom-height-31 {
          height: 38px;
          display: flex;
          alignItems: center;
          justifyContent: center;
        }
        `}} />
      </Head>
      <Card className="info d-flex flex-row align-items-center">
        <div className="p-2">
          {/* based on last updated */}
          <i className="bi bi-check-circle-fill"></i>
        </div>
        <div className="p-2 flex-grow-1">
          <div style={{ fontWeight: 'bold' }}>
            <a>{lastName}</a><a>{", "}</a><a>{firstname}</a>
          </div>
          <div style={{ display: 'flex' }}>
            <div style={{ fontSize: '10px' }}><a>SCN#</a>{scn}</div>
            <div style={{ fontSize: '10px', marginLeft: '20px' }}><a>SC#</a>{sc}</div>
          </div>
          <div style={{ fontSize: '10px' }}><a>Last Updated: </a>{date}</div>
        </div>
        <div className="p-2">
          <i className="bi bi-pencil-fill p-3"></i>
          <i className="bi bi-trash p-3"></i>
        </div>
      </Card>
    </div>
    );
  };
export default CardIndiv;