import { Card } from 'react-bootstrap';
import './home.cards.css'

const CardIndiv = ({ lastName, firstname, scn, sc, date }) => {
  return (
      <div>
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
        <div className="p-2 d-flex flex-row">
          <i className="bi bi-pencil-fill p-3"></i>
          <i className="bi bi-trash p-3"></i>
        </div>
      </Card>
    </div>
    );
  };
export default CardIndiv;