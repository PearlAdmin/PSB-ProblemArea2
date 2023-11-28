import styles from '@/components/create-record/styles.module.css';
import { Card } from 'react-bootstrap';

/**
 * History component for displaying edit history logs.
 *
 * @function
 * @param {Object} props - The properties passed to the component.
 * @param {Array} props.logs - An array of edit history logs.
 * @returns {React.Element} - The History component JSX.
 */
const History = (params) => {
    const { logs, showLogs } = params;
    //Array representing month names in abbreviated form. 
    const monthString = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

    return (
        <div className={`${styles.popupModal}`} id="form-confirm-container">
            <div className={`${styles.popupModalBoxContainer}`}>
                <div className={`${styles.popupModalBoxShadow} col-10 col-md-5 pe-2 pb-2`}>
                    <div className={`${styles.popupModalBox} px-3 pt-3 pb-4`}>
                        <div className={`${styles.popupModalBoxTop} d-flex text-start`}>
                            Edit History
                            <i className={`${styles.button} ms-auto bi bi-x`} onClick={showLogs}></i>
                        </div>
                        <div className={`${styles.historyContainer} text-start my-2 border-0`}>
                            {logs.map((log, i) => {
                                const action = log.action.charAt(0).toUpperCase() + log.action.slice(1);
                                const date = new Date(log.timestamp);
                                const stringDate = monthString[date.getMonth()] + ' ' + date.getDate() + ', ' +  date.getFullYear();
                                const time = date.toLocaleTimeString('en-US', { hour: 'numeric', hour12: true, minute: 'numeric' });
                                return (
                                    <Card className={`${styles.historyContainer} p-2`}>
                                        <div className={`${styles.historyOthersContainer}`}>
                                            <div>Timestamp: <b>{stringDate} {time}</b></div>
                                            <div>{action} by: <b>{log.editedBy}</b></div>
                                        </div>
                                    </Card>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default History;