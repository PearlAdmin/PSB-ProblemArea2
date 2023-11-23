import styles from '@/components/create-record/styles.module.css';
import { Card } from 'react-bootstrap';
import PaginationControls from '../pagination';

/**
 * History component for displaying edit history logs.
 *
 * @function
 * @param {Object} props - The properties passed to the component.
 * @param {Array} props.logs - An array of edit history logs.
 * @returns {React.Element} - The History component JSX.
 */
const History = ({logs}) => {
    //Array representing month names in abbreviated form. 
    const monthString = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

    return (
        <div className={`${styles.popupModal}`} id="form-confirm-container">
            <div className={`${styles.popupModalBoxContainer}`}>
                <div className={`${styles.popupModalBoxShadow} pe-2 pb-2`}>
                    <div className={`${styles.popupModalBox}`}>
                        <div className={`${styles.popupModalBoxTop} text-start ps-4 pt-4`}>Edit History</div>
                        <div className={`histories-container text-start mt-3 pb-1 mx-4`}>
                            {logs.map((log, i) => {
                                const action = log.action.charAt(0).toUpperCase() + log.action.slice(1);
                                const date = new Date(log.timestamp);
                                const stringDate = monthString[date.getMonth()] + ' ' + date.getDate() + ', ' +  date.getFullYear();
                                const time = date.toLocaleTimeString('en-US', { hour: 'numeric', hour12: true, minute: 'numeric' });
                                return (
                                    <Card className={`${styles.historyContainer}`}>
                                        <div className={`${styles.historyOthersContainer}`}>
                                            <div>Timestamp: <b>{stringDate} {time}</b></div>
                                            <div>{action} by: <b>{log.editedBy}</b></div>
                                        </div>
                                    </Card>
                                )
                            })}
                            <PaginationControls count={1} perpage={3}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default History;